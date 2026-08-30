# Carbon Ledger

An interactive reference for country-level CO<sub>2</sub> emissions and each country's
share of observed warming, built from the Global Carbon Project via
[Our World in Data](https://github.com/owid/co2-data).

Plain static site — no build step, no bundler. D3 is the only runtime dependency
and is loaded from a CDN.

## Running it

The datasets are fetched at startup, so the folder has to be served over HTTP;
opening `index.html` directly from disk hits the browser's `file://` fetch
restriction and the page shows a red load-error banner.

```bash
npm start                  # http://localhost:5173
```

Or without npm:

```bash
python -m http.server 5173 # http://localhost:5173
```

## Layout

```
.
├── index.html          # document shell + page markup
├── src/
│   ├── css/styles.css  # all styles, light/dark via CSS custom properties
│   └── js/app.js       # data loading + all rendering (D3)
├── data/               # six JSON datasets, fetched at startup
│   ├── geo.json        # country boundaries (GeoJSON FeatureCollection)
│   ├── countries.json  # latest per-country metrics, keyed by ISO-3
│   ├── world.json      # world totals by year, 1900-present
│   ├── history.json    # per-country annual series, keyed by ISO-3
│   ├── income.json     # World Bank income-group aggregates
│   └── netzero.json    # net-zero target year + status, major emitters
└── design/             # design canvas working files (.dc.html artboards)
```

The page is one 12-column bento grid: the metric picker sits above it and drives
the map, the ranking and the table alike. Grid cells are named `.cell-map`,
`.cell-rail`, `.cell-resp`, `.cell-trend`, `.cell-area`, `.cell-targets`,
`.cell-scenario` and `.cell-table` in `src/css/styles.css`.

`src/js/app.js` fetches all six files in parallel and then calls `boot(DATA)`,
which holds the rendering logic. To add a dataset, add an entry to the
`DATASETS` map at the top of the file — it is picked up automatically and
arrives on the `DATA` object under the same key.

## Deploying

Any static host works. Upload the repository root as-is — GitHub Pages,
Netlify, Cloudflare Pages, S3. There is nothing to compile.

## Data sources

- [Global Carbon Project / Our World in Data](https://github.com/owid/co2-data)
- [Net Zero Tracker](https://eciu.net/netzerotracker) — target years and status
