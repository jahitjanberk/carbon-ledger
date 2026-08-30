#!/usr/bin/env python3
"""Regenerate the /data JSON snapshots from upstream sources.

The dashboard is a plain static site: what it shows is whatever sits in /data.
This script rebuilds every *derivable* file from the upstream datasets and
refuses to write anything if the fresh data looks wrong, so a bad fetch can
never clobber a good snapshot. Standard library only -- no pip installs.

  regenerated        source
  countries.json     owid/co2-data (Global Carbon Project via Our World in Data)
  world.json         owid/co2-data, "World" entity, 1900..latest
  history.json       owid/co2-data, per-country annual series, 1950..latest
  income.json        owid/co2-data, World Bank income-group entities
  sectors.json       Climate Watch via the OWID grapher (all gases, CO2e)
  meta.json          generated-at date + latest data years (shown in the footer)

  left alone         why
  geo.json           country boundaries don't change
  netzero.json       hand-curated from the ECIU Net Zero Tracker -- review it
                     by hand when targets move; this script only validates it

Usage:
  python3 scripts/refresh_data.py            # fetch, validate, write
  python3 scripts/refresh_data.py --dry-run  # fetch, validate, report, write nothing
"""

import csv
import io
import json
import os
import sys
import urllib.request
from datetime import date, datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'data')

CO2_CSV_URL = 'https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv'
SECTORS_CSV_URL = 'https://ourworldindata.org/grapher/ghg-emissions-by-sector.csv?useColumnShortNames=true'

COUNTRY_FIELDS = [
    'population', 'gdp', 'co2', 'co2_per_capita', 'cumulative_co2',
    'share_global_co2', 'share_global_cumulative_co2',
    'share_of_temperature_change_from_ghg', 'temperature_change_from_co2',
    'temperature_change_from_ghg', 'coal_co2', 'oil_co2', 'gas_co2',
    'cement_co2', 'primary_energy_consumption', 'energy_per_capita',
    'co2_growth_prct', 'methane', 'nitrous_oxide',
]
WORLD_FIELDS = [
    'co2', 'coal_co2', 'oil_co2', 'gas_co2', 'cement_co2', 'flaring_co2',
    'cumulative_co2', 'temperature_change_from_co2', 'temperature_change_from_ghg',
    'temperature_change_from_ch4', 'temperature_change_from_n2o',
    'co2_per_capita', 'population', 'methane', 'nitrous_oxide',
]
INCOME_ENTITIES = [
    ('high',      'High-income',         'High-income countries'),
    ('upper_mid', 'Upper-middle-income', 'Upper-middle-income countries'),
    ('lower_mid', 'Lower-middle-income', 'Lower-middle-income countries'),
    ('low',       'Low-income',          'Low-income countries'),
]
HISTORY_START = 1950
WORLD_START = 1900

# Eleven Climate Watch sub-sectors grouped into the five the dashboard shows.
# "Energy" is all fuel combustion, so "industry" means non-energy process
# emissions (cement chemistry etc.); land use & forestry can be negative.
SECTOR_ENERGY_COLS = [
    'electricity_and_heat_ghg_emissions', 'transport_ghg_emissions',
    'manufacturing_and_construction_ghg_emissions', 'buildings_ghg_emissions',
    'fugitive_ghg_emissions', 'other_fuel_combustion_ghg_emissions',
    'aviation_and_shipping_ghg_emissions',
]


def fetch(url, timeout=180):
    req = urllib.request.Request(url, headers={'User-Agent': 'carbon-ledger-refresh/1.0'})
    with urllib.request.urlopen(req, timeout=timeout) as res:
        return res.read().decode('utf-8')


def num(v, digits=3):
    if v in ('', None):
        return None
    return round(float(v), digits)


def build_from_co2_csv(text):
    rows = list(csv.DictReader(io.StringIO(text)))

    world_rows = {int(r['year']): r for r in rows if r['country'] == 'World'}
    latest = max(y for y, r in world_rows.items() if r.get('co2') not in ('', None))

    # -- world.json: fixed key set, every year 1900..latest, nulls where missing
    world = []
    for y in range(WORLD_START, latest + 1):
        r = world_rows.get(y, {})
        out = {'year': y}
        for k in WORLD_FIELDS:
            out[k] = num(r.get(k))
        world.append(out)

    # -- countries.json: every ISO3 entity with a row in the latest year
    countries = []
    latest_by_iso = {}
    for r in rows:
        iso = r.get('iso_code', '')
        if len(iso) == 3 and not iso.startswith('OWID') and int(r['year']) == latest:
            latest_by_iso[iso] = r
    for iso in sorted(latest_by_iso, key=lambda i: latest_by_iso[i]['country']):
        r = latest_by_iso[iso]
        c = {'country': r['country'], 'iso_code': iso}
        for k in COUNTRY_FIELDS:
            c[k] = num(r.get(k))
        countries.append(c)
    isos = set(latest_by_iso)

    # -- history.json: uniform 1950..latest year axis, null-padded
    years = list(range(HISTORY_START, latest + 1))
    hist = {iso: {'country': latest_by_iso[iso]['country'], 'years': years,
                  'co2': [None] * len(years), 'co2_per_capita': [None] * len(years)}
            for iso in isos}
    for r in rows:
        iso = r.get('iso_code', '')
        if iso not in hist:
            continue
        y = int(r['year'])
        if y < HISTORY_START or y > latest:
            continue
        i = y - HISTORY_START
        hist[iso]['co2'][i] = num(r.get('co2'), 2)
        hist[iso]['co2_per_capita'][i] = num(r.get('co2_per_capita'), 3)

    # -- income.json: World Bank income-group entities at the latest year
    world_pop = float(world_rows[latest]['population'])
    by_entity = {r['country']: r for r in rows if int(r['year']) == latest}
    income = []
    for key, label, entity in INCOME_ENTITIES:
        r = by_entity.get(entity)
        if r is None:
            raise SystemExit('income entity missing from upstream: ' + entity)
        income.append({
            'key': key, 'label': label,
            'population': int(float(r['population'])),
            'co2': num(r['co2']),
            'cumulative_co2': num(r['cumulative_co2']),
            'share_global_co2': num(r['share_global_co2']),
            'share_global_cumulative_co2': num(r['share_global_cumulative_co2']),
            'co2_per_capita': num(r['co2_per_capita']),
            'pop_share': round(float(r['population']) / world_pop * 100, 1),
        })

    return latest, countries, world, hist, income


def build_sectors(text):
    rows = list(csv.DictReader(io.StringIO(text)))
    latest = max(int(r['year']) for r in rows)

    def val(r, k):
        v = r.get(k, '')
        return float(v) if v not in ('', None) else 0.0

    def group(r):
        return {
            'energy':      round(sum(val(r, k) for k in SECTOR_ENERGY_COLS) / 1e6, 2),
            'industry':    round(val(r, 'industry_ghg_emissions') / 1e6, 2),
            'agriculture': round(val(r, 'agriculture_ghg_emissions') / 1e6, 2),
            'waste':       round(val(r, 'waste_ghg_emissions') / 1e6, 2),
            'land_use':    round(val(r, 'land_use_change_and_forestry_ghg_emissions') / 1e6, 2),
        }

    out = {'year': latest, 'world': None, 'countries': {}}
    for r in rows:
        if int(r['year']) != latest:
            continue
        if r['code'] == 'OWID_WRL':
            out['world'] = group(r)
        elif len(r['code']) == 3:
            out['countries'][r['code']] = group(r)
    return out


def load_existing(name):
    path = os.path.join(DATA, name)
    if not os.path.exists(path):
        return None
    with open(path) as f:
        return json.load(f)


def validate(latest, countries, world, hist, income, sectors):
    """Every check here guards the live site: fail loudly, write nothing."""
    problems = []
    isos = {c['iso_code'] for c in countries}

    if not 180 <= len(countries) <= 260:
        problems.append('suspicious country count: %d' % len(countries))
    wl = world[-1]
    if wl['co2'] is None or not 20000 < wl['co2'] < 80000:
        problems.append('world CO2 for %s looks wrong: %r Mt' % (latest, wl['co2']))
    if [r['year'] for r in world] != list(range(WORLD_START, latest + 1)):
        problems.append('world.json year axis is not continuous')
    if len([c for c in countries if c['co2'] is not None]) < 150:
        problems.append('too few countries with CO2 values')
    if len(income) != 4 or any(g['pop_share'] is None for g in income):
        problems.append('income groups incomplete')
    if sectors['world'] is None or len(sectors['countries']) < 150:
        problems.append('sector data incomplete (%d countries)' % len(sectors['countries']))
    if not latest - 3 <= sectors['year'] <= latest:
        problems.append('sector year %s implausible vs CO2 year %s' % (sectors['year'], latest))

    old_world = load_existing('world.json')
    if old_world and latest < old_world[-1]['year']:
        problems.append('latest year regressed: %s -> %s' % (old_world[-1]['year'], latest))

    netzero = load_existing('netzero.json') or {}
    missing = [iso for iso in netzero if iso not in isos]
    if missing:
        problems.append('netzero.json ISOs missing from countries: %s' % ','.join(missing))

    return problems


def write_json(name, obj):
    path = os.path.join(DATA, name)
    tmp = path + '.tmp'
    with open(tmp, 'w') as f:
        json.dump(obj, f, separators=(',', ':'), allow_nan=False)
    os.replace(tmp, path)


def main():
    dry = '--dry-run' in sys.argv

    print('fetching %s ...' % CO2_CSV_URL)
    co2_text = fetch(CO2_CSV_URL)
    print('  %.1f MB' % (len(co2_text) / 1e6))
    print('fetching %s ...' % SECTORS_CSV_URL)
    sectors_text = fetch(SECTORS_CSV_URL)
    print('  %.1f MB' % (len(sectors_text) / 1e6))

    latest, countries, world, hist, income, = build_from_co2_csv(co2_text)
    sectors = build_sectors(sectors_text)

    problems = validate(latest, countries, world, hist, income, sectors)
    if problems:
        print('\nREFUSING TO WRITE — fresh data failed validation:')
        for p in problems:
            print('  - ' + p)
        sys.exit(1)

    old_world = load_existing('world.json')
    old_latest = old_world[-1]['year'] if old_world else None
    meta = {
        'generated': datetime.now(timezone.utc).strftime('%Y-%m-%d'),
        'co2_latest_year': latest,
        'sectors_year': sectors['year'],
        'sources': {
            'co2': CO2_CSV_URL,
            'sectors': 'Climate Watch via Our World in Data',
        },
    }

    print('\nlatest CO2 year: %s (was %s) | countries: %d | sector year: %s (%d countries)'
          % (latest, old_latest, len(countries), sectors['year'], len(sectors['countries'])))
    if dry:
        print('dry run — nothing written.')
        return

    write_json('countries.json', countries)
    write_json('world.json', world)
    write_json('history.json', hist)
    write_json('income.json', income)
    write_json('sectors.json', sectors)
    write_json('meta.json', meta)
    print('wrote countries/world/history/income/sectors/meta .json')
    print('reminder: data/netzero.json is curated by hand — review targets against '
          'https://eciu.net/netzerotracker when refreshing.')


if __name__ == '__main__':
    main()
