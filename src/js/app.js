/* Carbon Ledger -- application entry point.

   The six datasets live as JSON under /data and are fetched at startup, so this
   file must be served over HTTP (see README.md); opening index.html straight
   from disk will trip the browser's file:// fetch restriction. Everything in
   boot() is the original render logic and runs once all six have resolved. */
(function(){
"use strict";

var DATASETS = {
  geo:       'data/geo.json',
  countries: 'data/countries.json',
  world:     'data/world.json',
  history:   'data/history.json',
  income:    'data/income.json',
  netzero:   'data/netzero.json'
};

var keys = Object.keys(DATASETS);

Promise.all(keys.map(function(k){
  return fetch(DATASETS[k]).then(function(res){
    if(!res.ok) throw new Error(DATASETS[k] + ' -> HTTP ' + res.status);
    return res.json();
  });
})).then(function(loaded){
  var DATA = {};
  keys.forEach(function(k, i){ DATA[k] = loaded[i]; });
  boot(DATA);
}).catch(function(err){
  console.error('Carbon Ledger: failed to load data.', err);
  var el = document.getElementById('load-error');
  if(el){
    el.hidden = false;
    el.textContent = 'Could not load the data files (' + err.message + '). '
      + 'This page needs to be served over HTTP -- see README.md.';
  }
});

function boot(DATA){

/* ---------------- data ---------------- */
var GEO = DATA.geo;
var COUNTRIES = DATA.countries;
var WORLD = DATA.world;
var HISTORY = DATA.history;

var byIso = {};
COUNTRIES.forEach(function(c){ byIso[c.iso_code] = c; });
WORLD.sort(function(a,b){ return a.year-b.year; });
var worldByYear = {};
WORLD.forEach(function(r){ worldByYear[r.year] = r; });
var worldLatest = WORLD[WORLD.length-1];
var worldPrev = WORLD[WORLD.length-2];

var TOP_TREND_ISOS = ['CHN','USA','IND','RUS','JPN','IDN'];
var CAT_HEX = ['--cat-1','--cat-2','--cat-3','--cat-4','--cat-5','--cat-6','--cat-7','--cat-8'];

var INCOME_GROUPS = DATA.income;
var NET_ZERO = DATA.netzero;
var MAJOR_EMITTER_ISOS = Object.keys(NET_ZERO);
var ARTIFACT_URL = 'https://claude.ai/code/artifact/757cf589-d1a9-4b05-bb64-d91bc5786c87';

// Each country's share of cumulative (since-1750) CO2 divided by its share of
// world population -- 1.0x means "emitted exactly its population-proportional
// share of industrial-era CO2"; >1x means more, <1x means less.
(function computeFairShare(){
  var pop = worldLatest.population;
  COUNTRIES.forEach(function(c){
    if(c.population && pop && c.share_global_cumulative_co2!=null){
      var popShare = c.population/pop*100;
      c.fair_share_ratio = popShare>0 ? c.share_global_cumulative_co2/popShare : null;
    } else { c.fair_share_ratio = null; }
  });
})();

/* ---------------- formatting ---------------- */
function fmtNum(v, d){
  if(v===null || v===undefined || isNaN(v)) return '—';
  if(d===undefined){
    if(v===0) return '0';
    var a = Math.abs(v);
    d = a>=100 ? 0 : a>=10 ? 1 : a>=1 ? 2 : 3;
  }
  return v.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
}
function fmtMt(v){
  if(v===null||v===undefined||isNaN(v)) return '—';
  if(Math.abs(v)>=1000) return fmtNum(v/1000,2)+' Gt';
  return fmtNum(v)+' Mt';
}
function fmtPct(v){ if(v===null||v===undefined||isNaN(v)) return '—'; return fmtNum(v,2)+'%'; }
function fmtC(v){ if(v===null||v===undefined||isNaN(v)) return '—'; return (v>=0?'+':'')+fmtNum(v,2)+'°C'; }

/* ---------------- theme ---------------- */
var root = document.documentElement;
function getStoredTheme(){ try{ return localStorage.getItem('carbon-ledger-theme')
    || localStorage.getItem('carbon-atlas-theme'); /* pre-rename key */ }catch(e){ return null; } }
function setStoredTheme(v){ try{ localStorage.setItem('carbon-ledger-theme', v); }catch(e){} }
function applyThemeButtons(mode){
  document.querySelectorAll('[data-theme-btn]').forEach(function(b){
    b.classList.toggle('active', b.getAttribute('data-theme-btn')===mode);
  });
}
function applyThemeAttr(mode){
  if(mode==='light'||mode==='dark'){ root.setAttribute('data-theme', mode); }
  else { root.removeAttribute('data-theme'); }
  applyThemeButtons(mode);
  setStoredTheme(mode);
}
function setTheme(mode){
  applyThemeAttr(mode);
  renderAll();
}
function effectiveTheme(){
  var attr = root.getAttribute('data-theme');
  if(attr==='light'||attr==='dark') return attr;
  return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark':'light';
}
(function initTheme(){
  // Only set the attribute/button state here — renderAll() runs once, at the
  // bottom of this file, after every render function and data structure below
  // is defined. Calling it from this early IIFE would run against undefined values.
  var stored = getStoredTheme() || 'system';
  applyThemeAttr(stored);
  if(window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(){
      if(!root.getAttribute('data-theme')) renderAll();
    });
  }
})();
document.querySelectorAll('[data-theme-btn]').forEach(function(b){
  b.addEventListener('click', function(){ setTheme(b.getAttribute('data-theme-btn')); });
});

/* ---------------- metrics ---------------- */
var METRICS = [
  { key:'co2', label:'Total CO₂', fmt: fmtMt, mapLabel:'CO₂ emissions', legendUnit:'Mt CO₂ / yr' },
  { key:'co2_per_capita', label:'Per person', fmt: function(v){ return fmtNum(v,2)+' t'; }, mapLabel:'CO₂ per person', legendUnit:'t CO₂ / yr' },
  { key:'cumulative_co2', label:'Cumulative', fmt: fmtMt, mapLabel:'Cumulative CO₂ since 1750', legendUnit:'Mt CO₂' },
  { key:'share_of_temperature_change_from_ghg', label:'Warming share', fmt: fmtPct, mapLabel:'Share of global warming', legendUnit:'% of observed warming' },
  { key:'fair_share_ratio', label:'Fair share', type:'diverging',
    fmt: function(v){ return v==null?'—':fmtNum(v,2)+'×'; },
    mapLabel:'Cumulative CO₂ share ÷ population share', legendUnit:'× a proportional share (1.0× = exactly proportional)' }
];
var state = { metric:'co2', selectedIso:null };

/* ================= KPI row ================= */
function renderKPIs(){
  var el = document.getElementById('kpi-row');
  var yoy = (worldLatest.co2 - worldPrev.co2)/worldPrev.co2*100;
  var top = COUNTRIES.slice().filter(function(c){return c.co2!=null;}).sort(function(a,b){return b.co2-a.co2;})[0];

  var tiles = [
    {
      label: 'Global CO₂ emissions, 2024', value: fmtMt(worldLatest.co2),
      delta: (yoy>=0?'+':'')+fmtNum(yoy,1)+'%', deltaBad: yoy>0,
      sub: 'vs. ' + fmtMt(worldPrev.co2) + ' in 2023'
    },
    {
      label: 'Average per person', value: fmtNum(worldLatest.co2_per_capita,2), unit:'t / yr',
      sub: 'world population ' + fmtNum(worldLatest.population/1e9,2) + 'B'
    },
    {
      label: 'Cumulative since 1750', value: fmtMt(worldLatest.cumulative_co2),
      sub: 'total industrial-era CO₂'
    },
    {
      label: 'Warming from CO₂ so far', value: fmtC(worldLatest.temperature_change_from_co2),
      sub: fmtC(worldLatest.temperature_change_from_ghg) + ' from all greenhouse gases'
    },
    {
      label: 'Largest emitter, 2024', value: top.country,
      sub: fmtMt(top.co2) + ' · ' + fmtPct(top.share_global_co2) + ' of the world total'
    }
  ];

  el.innerHTML = '';
  tiles.forEach(function(t){
    var d = document.createElement('div');
    d.className = 'kpi';
    var deltaHtml = '';
    if(t.delta){
      deltaHtml = '<div class="delta '+(t.deltaBad?'up-bad':'up-good')+'">'+t.delta+' <span class="ctx">year over year</span></div>';
    }
    d.innerHTML =
      '<div class="label"></div>'+
      '<div class="value num"></div>'+
      deltaHtml+
      '<div class="sub"></div>';
    d.querySelector('.label').textContent = t.label;
    var valEl = d.querySelector('.value');
    valEl.textContent = t.value;
    if(t.unit){ var u=document.createElement('span'); u.className='unit'; u.textContent=t.unit; valEl.appendChild(u); }
    d.querySelector('.sub').textContent = t.sub;
    el.appendChild(d);
  });
}

/* ================= metric picker ================= */
function renderMetricPicker(){
  var el = document.getElementById('metric-picker');
  el.innerHTML = '';
  METRICS.forEach(function(m){
    var b = document.createElement('button');
    b.type='button'; b.className='metric-btn'+(state.metric===m.key?' active':'');
    b.textContent = m.label;
    b.addEventListener('click', function(){
      state.metric = m.key;
      renderMetricPicker();
      renderMap();
      renderLegend();
      renderBarChart();
      renderPanel();
      syncUrl();
    });
    el.appendChild(b);
  });
}

/* ================= color scale ================= */
var LIGHT_STEPS = ['#cde2fb','#b7d3f6','#9ec5f4','#86b6ef','#6da7ec','#5598e7','#3987e5','#2a78d6','#256abf','#1c5cab','#184f95','#104281','#0d366b'];
function stepsForTheme(theme){ return theme==='dark' ? LIGHT_STEPS.slice().reverse() : LIGHT_STEPS; }
function rampColor(t, theme){
  t = Math.max(0, Math.min(1, t));
  var steps = stepsForTheme(theme);
  var interp = d3.interpolateRgbBasis(steps);
  return interp(t);
}
function currentMetric(){ return METRICS.filter(function(m){return m.key===state.metric;})[0]; }
function metricDomain(key){
  var vals = COUNTRIES.map(function(c){return c[key];}).filter(function(v){return v!=null && v>=0;});
  return [d3.min(vals), d3.max(vals)];
}
function metricScale(key, theme){
  var dom = metricDomain(key);
  var pow = d3.scalePow().exponent(0.45).domain(dom).range([0,1]).clamp(true);
  return function(v){ return rampColor(pow(v), theme); };
}

// Diverging: neutral gray at ratio == 1 ("exactly its proportional share"),
// blue toward under-share, red toward over-share, capped at DIVERGING_CAP so
// a handful of extreme outliers don't wash out the rest of the map.
var DIVERGING_CAP = 5;
function divergingColorFor(v, theme){
  if(v==null) return null;
  var neutral = theme==='dark' ? '#383835' : '#f0efec';
  var bluePole = theme==='dark' ? '#3987e5' : '#2a78d6';
  var redPole = theme==='dark' ? '#e66767' : '#d03b3b';
  if(v<=1){ return d3.interpolateRgb(neutral, bluePole)(Math.min(1, 1-v)); }
  return d3.interpolateRgb(neutral, redPole)(Math.min(1, (v-1)/(DIVERGING_CAP-1)));
}
function colorForMetric(m, v, theme){
  if(v==null) return null;
  if(m.type==='diverging') return divergingColorFor(v, theme);
  return metricScale(m.key, theme)(v);
}

/* ================= map ================= */
var svg = d3.select('#map-svg');
var projection = d3.geoNaturalEarth1();
var pathGen = d3.geoPath(projection);
var mapReady = false;

function initMapGeometry(){
  projection.fitExtent([[8,8],[952,502]], GEO);
  var g = svg.append('g').attr('id','countries-g');
  g.selectAll('path.country-path')
    .data(GEO.features, function(d){ return d.id; })
    .enter().append('path')
    .attr('class','country-path')
    .attr('d', pathGen)
    .attr('data-iso', function(d){ return d.id; })
    .on('mousemove', onCountryHover)
    .on('mouseleave', hideMapTooltip)
    .on('click', function(ev,d){
      var c = byIso[d.id];
      if(c && c.co2!=null) selectCountry(d.id);
    });
  mapReady = true;
}

function renderMap(){
  if(!mapReady) initMapGeometry();
  var theme = effectiveTheme();
  var m = currentMetric();
  svg.selectAll('path.country-path')
    .classed('no-data', function(d){ var c=byIso[d.id]; return !c || c[m.key]==null; })
    .classed('selected', function(d){ return d.id===state.selectedIso; })
    .style('fill', function(d){
      var c = byIso[d.id];
      if(!c || c[m.key]==null) return null;
      return colorForMetric(m, c[m.key], theme);
    });
}

function onCountryHover(ev, d){
  var c = byIso[d.id];
  var tip = document.getElementById('map-tooltip');
  if(!c){ hideMapTooltip(); return; }
  var m = currentMetric();
  var name = document.createElement('div'); name.className='t-name'; name.textContent = c.country;
  tip.innerHTML = '';
  tip.appendChild(name);
  var val = document.createElement('div'); val.className='t-val';
  if(c[m.key]==null){ val.textContent = 'No data'; }
  else {
    val.textContent = m.mapLabel + ': ' + m.fmt(c[m.key]);
    var ranked = COUNTRIES.filter(function(x){return x[m.key]!=null;}).sort(function(a,b){return b[m.key]-a[m.key];});
    var rank = ranked.indexOf(c)+1;
    var rk = document.createElement('div'); rk.className='t-rank';
    rk.textContent = 'Rank '+rank+' of '+ranked.length;
    tip.appendChild(val); tip.appendChild(rk);
  }
  if(c[m.key]==null) tip.appendChild(val);
  tip.style.left = ev.clientX+'px';
  tip.style.top = (ev.clientY-10)+'px';
  tip.style.opacity = '1';
}
function hideMapTooltip(){ document.getElementById('map-tooltip').style.opacity='0'; }

function renderLegend(){
  var el = document.getElementById('legend-row');
  var theme = effectiveTheme();
  var m = currentMetric();
  el.innerHTML = '';
  var wrap = document.createElement('div'); wrap.className='legend-scale';

  if(m.type==='diverging'){
    var neutral = theme==='dark' ? '#383835' : '#f0efec';
    var bluePole = theme==='dark' ? '#3987e5' : '#2a78d6';
    var redPole = theme==='dark' ? '#e66767' : '#d03b3b';
    var lo = document.createElement('span'); lo.className='lo'; lo.textContent='Under';
    var grad = document.createElement('div'); grad.className='legend-grad';
    grad.style.background = 'linear-gradient(90deg,'+bluePole+','+neutral+' 50%,'+redPole+')';
    var hi = document.createElement('span'); hi.className='hi'; hi.textContent='Over ('+DIVERGING_CAP+'×+)';
    wrap.appendChild(lo); wrap.appendChild(grad); wrap.appendChild(hi);
  } else {
    var dom = metricDomain(m.key);
    var steps = stepsForTheme(theme);
    var lo2 = document.createElement('span'); lo2.className='lo'; lo2.textContent = m.fmt(dom[0]);
    var grad2 = document.createElement('div'); grad2.className='legend-grad';
    grad2.style.background = 'linear-gradient(90deg,'+steps.join(',')+')';
    var hi2 = document.createElement('span'); hi2.className='hi'; hi2.textContent = m.fmt(dom[1]);
    wrap.appendChild(lo2); wrap.appendChild(grad2); wrap.appendChild(hi2);
  }
  el.appendChild(wrap);
  var unit = document.createElement('span'); unit.className='legend-note'; unit.style.marginLeft='4px';
  unit.textContent = m.legendUnit;
  el.appendChild(unit);
  var note = document.createElement('span'); note.className='legend-note';
  note.innerHTML = '<span class="no-data-swatch"></span> ';
  note.appendChild(document.createTextNode(' no data'));
  el.appendChild(note);
}

/* ================= detail panel ================= */
function rankOf(iso, key){
  var ranked = COUNTRIES.filter(function(x){return x[key]!=null;}).sort(function(a,b){return b[key]-a[key];});
  var idx = ranked.findIndex(function(x){return x.iso_code===iso;});
  return idx<0 ? null : {rank: idx+1, total: ranked.length};
}
function selectCountry(iso){
  state.selectedIso = iso;
  renderMap();
  renderPanel();
  renderBarChart();
  highlightTableRow(iso);
  syncUrl();
}
function resetCountry(){
  state.selectedIso = null;
  renderMap();
  renderPanel();
  renderBarChart();
  highlightTableRow(null);
  syncUrl();
}

function renderPanel(){
  var title = document.getElementById('panel-title');
  var body = document.getElementById('panel-body');
  body.innerHTML = '';
  if(!state.selectedIso){
    title.textContent = 'Global summary';
    var p = document.createElement('div'); p.className='panel-empty';
    p.textContent = 'Click any country on the map, in the ranking, or in the table to see its detail here.';
    body.appendChild(p);

    var statGrid = document.createElement('div'); statGrid.className='panel-stats';
    statGrid.appendChild(statBlock('2024 total', fmtMt(worldLatest.co2)));
    statGrid.appendChild(statBlock('Per person', fmtNum(worldLatest.co2_per_capita,2)+' t'));
    body.appendChild(statGrid);

    var sl = document.createElement('div'); sl.className='panel-spark-label'; sl.textContent='World CO₂, 1900–2024 (Mt/yr)';
    body.appendChild(sl);
    var svgSpark = drawMiniLine(WORLD.map(function(r){return {x:r.year,y:r.co2};}), 'var(--cat-1)');
    body.appendChild(svgSpark);
    return;
  }
  var c = byIso[state.selectedIso];
  title.textContent = c.country;

  var resetBtn = document.createElement('button');
  resetBtn.className='panel-reset'; resetBtn.type='button'; resetBtn.textContent='← Back to global summary';
  resetBtn.addEventListener('click', resetCountry);
  body.appendChild(resetBtn);

  var iso = document.createElement('div'); iso.className='panel-iso'; iso.textContent = c.iso_code;
  body.appendChild(iso);

  var grid = document.createElement('div'); grid.className='panel-stats';
  grid.appendChild(statBlock('CO₂, 2024', fmtMt(c.co2)));
  grid.appendChild(statBlock('Per person', c.co2_per_capita!=null?fmtNum(c.co2_per_capita,2)+' t':'—'));
  grid.appendChild(statBlock('Cumulative since 1750', fmtMt(c.cumulative_co2)));
  grid.appendChild(statBlock('Share of global CO₂', fmtPct(c.share_global_co2)));
  grid.appendChild(statBlock('Share of warming', fmtPct(c.share_of_temperature_change_from_ghg)));
  grid.appendChild(statBlock('Warming from its CO₂', fmtC(c.temperature_change_from_co2)));
  body.appendChild(grid);

  var rk = rankOf(c.iso_code, state.metric);
  if(rk){
    var m = currentMetric();
    var rankEl = document.createElement('div'); rankEl.className='panel-rank';
    rankEl.innerHTML = 'Ranked <b>#'+rk.rank+'</b> of '+rk.total+' countries by '+m.label.toLowerCase();
    body.appendChild(rankEl);
  }

  var h = HISTORY[c.iso_code];
  if(h && h.co2 && h.co2.some(function(v){return v!=null;})){
    var sl2 = document.createElement('div'); sl2.className='panel-spark-label'; sl2.textContent=c.country+' CO₂, 1950–2024 (Mt/yr)';
    body.appendChild(sl2);
    var pts = h.years.map(function(y,i){return {x:y,y:h.co2[i]};}).filter(function(p){return p.y!=null;});
    body.appendChild(drawMiniLine(pts, 'var(--cat-2)'));
  }
}
function statBlock(label, val){
  var d = document.createElement('div'); d.className='panel-stat';
  var l = document.createElement('div'); l.className='l'; l.textContent = label;
  var v = document.createElement('div'); v.className='v'; v.textContent = val;
  d.appendChild(l); d.appendChild(v);
  return d;
}
function drawMiniLine(points, colorVar){
  var w=270, h=64, pad=4;
  var svgEl = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svgEl.setAttribute('viewBox','0 0 '+w+' '+h);
  svgEl.setAttribute('width','100%'); svgEl.setAttribute('height',h);
  if(!points.length) return svgEl;
  var x = d3.scaleLinear().domain(d3.extent(points, function(p){return p.x;})).range([pad, w-pad]);
  var y = d3.scaleLinear().domain([0, d3.max(points, function(p){return p.y;})*1.08]).range([h-pad, pad]);
  var line = d3.line().x(function(p){return x(p.x);}).y(function(p){return y(p.y);}).curve(d3.curveMonotoneX);
  var path = document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d', line(points));
  path.setAttribute('fill','none');
  path.setAttribute('stroke', colorVar);
  path.setAttribute('stroke-width','2');
  path.setAttribute('stroke-linecap','round');
  path.setAttribute('stroke-linejoin','round');
  svgEl.appendChild(path);
  var last = points[points.length-1];
  var dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
  dot.setAttribute('cx', x(last.x)); dot.setAttribute('cy', y(last.y)); dot.setAttribute('r','3.5');
  dot.setAttribute('fill', colorVar); dot.setAttribute('class','trend-dot');
  svgEl.appendChild(dot);
  return svgEl;
}

/* ================= top-15 bar chart ================= */
function renderBarChart(){
  var body = document.getElementById('bar-body');
  var m = currentMetric();
  document.getElementById('bar-title').textContent = 'Top 15 by ' + m.label.toLowerCase();
  document.getElementById('bar-desc').textContent = m.mapLabel + ', 2024 (' + m.legendUnit + ')';
  var ranked = COUNTRIES.filter(function(c){return c[m.key]!=null;}).sort(function(a,b){return b[m.key]-a[m.key];}).slice(0,15);
  var max = ranked[0][m.key];
  body.innerHTML = '';
  ranked.forEach(function(c, i){
    var row = document.createElement('div');
    row.className='bar-row'+(c.iso_code===state.selectedIso?' is-selected':'');
    row.setAttribute('data-iso', c.iso_code);
    row.addEventListener('click', function(){ selectCountry(c.iso_code); });
    var rank=document.createElement('div'); rank.className='b-rank'; rank.textContent=(i+1);
    var name=document.createElement('div'); name.className='b-name'; name.textContent=c.country; name.title=c.country;
    var track=document.createElement('div'); track.className='b-track';
    var fill=document.createElement('div'); fill.className='b-fill'; fill.style.width=(c[m.key]/max*100)+'%';
    track.appendChild(fill);
    var val=document.createElement('div'); val.className='b-val'; val.textContent=m.fmt(c[m.key]);
    row.appendChild(rank); row.appendChild(name); row.appendChild(track); row.appendChild(val);
    body.appendChild(row);
  });
}
function highlightTableRow(iso){
  document.querySelectorAll('#country-table-body tr').forEach(function(tr){
    tr.style.background = (iso && tr.getAttribute('data-iso')===iso) ? 'var(--surface-2)' : '';
  });
  document.querySelectorAll('.bar-row').forEach(function(r){
    r.classList.toggle('is-selected', iso && r.getAttribute('data-iso')===iso);
  });
}

/* ================= trend line chart (top emitters) ================= */
function renderTrendLegend(){
  var el = document.getElementById('trend-legend');
  el.innerHTML = '';
  TOP_TREND_ISOS.forEach(function(iso, i){
    var c = byIso[iso];
    var chip = document.createElement('div'); chip.className='legend-chip';
    var sw = document.createElement('span'); sw.className='sw'; sw.style.background='var('+CAT_HEX[i]+')';
    chip.appendChild(sw); chip.appendChild(document.createTextNode(c?c.country:iso));
    el.appendChild(chip);
  });
}
function renderTrendChart(){
  var container = document.getElementById('trend-body');
  container.innerHTML = '';
  var w=560,h=380,ml=60,mr=86,mt=14,mb=28;
  var svgEl = d3.select(document.createElementNS('http://www.w3.org/2000/svg','svg'));
  svgEl.attr('viewBox','0 0 '+w+' '+h).attr('width','100%').style('height','auto').style('display','block');
  container.appendChild(svgEl.node());

  var series = TOP_TREND_ISOS.map(function(iso,i){
    var h2 = HISTORY[iso];
    var pts = h2.years.map(function(y,idx){return {x:y,y:h2.co2[idx]};}).filter(function(p){return p.y!=null && p.x>=1950;});
    return {iso:iso, name:h2.country, color:'var('+CAT_HEX[i]+')', points:pts};
  });
  var allYears = series[0].points.map(function(p){return p.x;});
  var x = d3.scaleLinear().domain(d3.extent(allYears)).range([ml, w-mr]);
  var ymax = d3.max(series, function(s){ return d3.max(s.points, function(p){return p.y;}); });
  var y = d3.scaleLinear().domain([0, ymax*1.06]).range([h-mb, mt]);

  var g = svgEl.append('g');
  var ticks = y.ticks(5);
  ticks.forEach(function(t){
    g.append('line').attr('class','gridline').attr('x1',ml).attr('x2',w-mr).attr('y1',y(t)).attr('y2',y(t));
    g.append('text').attr('class','axis-label').attr('x',ml-6).attr('y',y(t)+3).attr('text-anchor','end').text(fmtMt(t));
  });
  [1950,1975,2000,2024].forEach(function(yr){
    g.append('text').attr('class','axis-label').attr('x',x(yr)).attr('y',h-mb+16).attr('text-anchor','middle').text(yr);
  });
  g.append('line').attr('class','baseline').attr('x1',ml).attr('x2',w-mr).attr('y1',h-mb).attr('y2',h-mb);

  var line = d3.line().x(function(p){return x(p.x);}).y(function(p){return y(p.y);}).curve(d3.curveMonotoneX);
  series.forEach(function(s){
    g.append('path').datum(s.points).attr('class','trend-line').attr('d',line).style('stroke', s.color);
    var last = s.points[s.points.length-1];
    s.endY = y(last.y);
    g.append('circle').attr('cx',x(last.x)).attr('cy',s.endY).attr('r',3.5).attr('class','trend-dot').style('fill', s.color);
  });
  // Direct end-labels, skipped where they'd collide (converging lines) -- the
  // legend above already carries identity for every series, so a suppressed
  // label loses nothing; see marks-and-anatomy.md on converging end-labels.
  var byEndY = series.slice().sort(function(a,b){ return a.endY-b.endY; });
  var lastLabelY = -Infinity;
  var minGap = 13;
  byEndY.forEach(function(s){
    if(s.endY - lastLabelY < minGap){ s.labelSuppressed = true; return; }
    lastLabelY = s.endY;
  });
  var lastPtX = x(series[0].points[series[0].points.length-1].x);
  series.forEach(function(s){
    if(s.labelSuppressed) return;
    g.append('text').attr('class','trend-end-label').attr('x', lastPtX+8).attr('y', s.endY+4)
      .style('fill', s.color).text(s.name);
  });

  // crosshair + tooltip
  var tooltip = document.createElement('div'); tooltip.className='chart-tooltip';
  container.style.position='relative';
  container.appendChild(tooltip);
  var crosshair = g.append('line').attr('class','crosshair-line').attr('y1',mt).attr('y2',h-mb).style('opacity',0);
  var overlay = svgEl.append('rect').attr('x',ml).attr('y',mt).attr('width',w-ml-mr).attr('height',h-mt-mb)
    .attr('fill','transparent');
  overlay.on('mousemove', function(ev){
    var bbox = svgEl.node().getBoundingClientRect();
    var scaleX = w / bbox.width;
    var mx = (ev.clientX - bbox.left) * scaleX;
    var yr = Math.round(x.invert(mx));
    yr = Math.max(1950, Math.min(2024, yr));
    crosshair.attr('x1',x(yr)).attr('x2',x(yr)).style('opacity',1);
    var rows = series.map(function(s){
      var pt = s.points.filter(function(p){return p.x===yr;})[0];
      return {name:s.name, color:s.color, val: pt?pt.y:null};
    }).sort(function(a,b){ return (b.val||0)-(a.val||0); });
    var html = '<div class="ct-x">'+yr+'</div>';
    rows.forEach(function(r){
      html += '<div class="ct-row"><span class="k"><span class="sw" style="background:'+r.color+'"></span>'+escapeHtml(r.name)+'</span><span class="v">'+fmtMt(r.val)+'</span></div>';
    });
    tooltip.innerHTML = html;
    tooltip.style.left = Math.min(ev.clientX - bbox.left + 14, bbox.width-160)+'px';
    tooltip.style.top = (ev.clientY - bbox.top - 20)+'px';
    tooltip.style.opacity = '1';
  }).on('mouseleave', function(){ tooltip.style.opacity='0'; crosshair.style.opacity=0; });
}
function renderTrendTable(){
  var el = document.getElementById('trend-table');
  var years = HISTORY[TOP_TREND_ISOS[0]].years.filter(function(y){return y>=1950;});
  var html = '<div class="table-scroll"><div class="table-wrap"><table class="data-table"><thead><tr><th>Year</th>';
  TOP_TREND_ISOS.forEach(function(iso){ html += '<th>'+escapeHtml(byIso[iso].country)+'</th>'; });
  html += '</tr></thead><tbody>';
  years.slice().reverse().forEach(function(yr){
    html += '<tr><td>'+yr+'</td>';
    TOP_TREND_ISOS.forEach(function(iso){
      var h2 = HISTORY[iso];
      var idx = h2.years.indexOf(yr);
      var v = idx>=0 ? h2.co2[idx] : null;
      html += '<td>'+fmtMt(v)+'</td>';
    });
    html += '</tr>';
  });
  html += '</tbody></table></div></div>';
  el.innerHTML = html;
}

/* ================= stacked area chart (global fuel mix) ================= */
var AREA_KEYS = ['coal_co2','oil_co2','gas_co2','cement_co2','flaring_co2'];
var AREA_LABELS = {coal_co2:'Coal', oil_co2:'Oil', gas_co2:'Gas', cement_co2:'Cement', flaring_co2:'Flaring & other'};
function renderAreaLegend(){
  var el = document.getElementById('area-legend');
  el.innerHTML='';
  AREA_KEYS.forEach(function(k,i){
    var chip=document.createElement('div'); chip.className='legend-chip area';
    var sw=document.createElement('span'); sw.className='sw'; sw.style.background='var('+CAT_HEX[i]+')';
    chip.appendChild(sw); chip.appendChild(document.createTextNode(AREA_LABELS[k]));
    el.appendChild(chip);
  });
}
function renderAreaChart(){
  var container = document.getElementById('area-body');
  container.innerHTML='';
  var w=860,h=300,ml=62,mr=16,mt=14,mb=28;
  var svgEl = d3.select(document.createElementNS('http://www.w3.org/2000/svg','svg'));
  svgEl.attr('viewBox','0 0 '+w+' '+h).attr('width','100%').style('height','auto').style('display','block');
  container.appendChild(svgEl.node());

  var rows = WORLD.filter(function(r){return r.year>=1900;});
  var stack = d3.stack().keys(AREA_KEYS).value(function(d,k){ return d[k]||0; });
  var layers = stack(rows);
  var x = d3.scaleLinear().domain(d3.extent(rows,function(r){return r.year;})).range([ml,w-mr]);
  var ymax = d3.max(layers[layers.length-1], function(d){return d[1];});
  var y = d3.scaleLinear().domain([0, ymax*1.05]).range([h-mb, mt]);

  var g = svgEl.append('g');
  y.ticks(5).forEach(function(t){
    g.append('line').attr('class','gridline').attr('x1',ml).attr('x2',w-mr).attr('y1',y(t)).attr('y2',y(t));
    g.append('text').attr('class','axis-label').attr('x',ml-6).attr('y',y(t)+3).attr('text-anchor','end').text(fmtMt(t));
  });
  var yrTicks = [1900,1925,1950,1975,2000,2024];
  yrTicks.forEach(function(yr){
    g.append('text').attr('class','axis-label').attr('x',x(yr)).attr('y',h-mb+16).attr('text-anchor','middle').text(yr);
  });
  g.append('line').attr('class','baseline').attr('x1',ml).attr('x2',w-mr).attr('y1',h-mb).attr('y2',h-mb);

  var area = d3.area().x(function(d){return x(d.data.year);}).y0(function(d){return y(d[0]);}).y1(function(d){return y(d[1]);}).curve(d3.curveMonotoneX);
  layers.forEach(function(layer,i){
    g.append('path').datum(layer).attr('d',area).style('fill','var('+CAT_HEX[i]+')').style('opacity',0.92)
      .style('stroke','var(--chart-surface)').style('stroke-width',1);
  });

  var tooltip = document.createElement('div'); tooltip.className='chart-tooltip';
  container.style.position='relative';
  container.appendChild(tooltip);
  var crosshair = g.append('line').attr('class','crosshair-line').attr('y1',mt).attr('y2',h-mb).style('opacity',0);
  var overlay = svgEl.append('rect').attr('x',ml).attr('y',mt).attr('width',w-ml-mr).attr('height',h-mt-mb).attr('fill','transparent');
  overlay.on('mousemove', function(ev){
    var bbox = svgEl.node().getBoundingClientRect();
    var scaleX = w / bbox.width;
    var mx = (ev.clientX - bbox.left) * scaleX;
    var yr = Math.round(x.invert(mx));
    var row = worldByYear[yr];
    if(!row) return;
    crosshair.attr('x1',x(yr)).attr('x2',x(yr)).style('opacity',1);
    var html = '<div class="ct-x">'+yr+'</div>';
    AREA_KEYS.slice().reverse().forEach(function(k,ri){
      var i = AREA_KEYS.length-1-ri;
      html += '<div class="ct-row"><span class="k"><span class="sw" style="background:var('+CAT_HEX[i]+')"></span>'+AREA_LABELS[k]+'</span><span class="v">'+fmtMt(row[k])+'</span></div>';
    });
    html += '<div class="ct-row" style="margin-top:4px;border-top:1px solid rgba(255,255,255,.2);padding-top:4px;"><span class="k">Total</span><span class="v">'+fmtMt(row.co2)+'</span></div>';
    tooltip.innerHTML = html;
    var left = ev.clientX - bbox.left + 14;
    tooltip.style.left = Math.min(left, bbox.width-170)+'px';
    tooltip.style.top = Math.max(0, ev.clientY - bbox.top - 90)+'px';
    tooltip.style.opacity='1';
  }).on('mouseleave', function(){ tooltip.style.opacity='0'; crosshair.style.opacity=0; });
}
function renderAreaTable(){
  var el = document.getElementById('area-table');
  var rows = WORLD.filter(function(r){return r.year>=1900;}).slice().reverse();
  var html = '<div class="table-scroll"><div class="table-wrap"><table class="data-table"><thead><tr><th>Year</th><th>Coal</th><th>Oil</th><th>Gas</th><th>Cement</th><th>Flaring &amp; other</th><th>Total</th></tr></thead><tbody>';
  rows.forEach(function(r){
    html += '<tr><td>'+r.year+'</td><td>'+fmtMt(r.coal_co2)+'</td><td>'+fmtMt(r.oil_co2)+'</td><td>'+fmtMt(r.gas_co2)+'</td><td>'+fmtMt(r.cement_co2)+'</td><td>'+fmtMt(r.flaring_co2)+'</td><td>'+fmtMt(r.co2)+'</td></tr>';
  });
  html += '</tbody></table></div></div>';
  el.innerHTML = html;
}

/* ================= table toggles ================= */
document.querySelectorAll('[data-table-toggle]').forEach(function(btn){
  btn.addEventListener('click', function(){
    var id = btn.getAttribute('data-table-toggle');
    var tableEl = document.getElementById(id);
    var chartId = id==='trend-table' ? 'trend-body' : 'area-body';
    var chartEl = document.getElementById(chartId);
    var showing = !tableEl.hidden;
    tableEl.hidden = showing;
    chartEl.hidden = !showing;
    btn.textContent = showing ? 'View as table' : 'View as chart';
  });
});

/* ================= country data table ================= */
var tableSort = {key:'co2', dir:-1};
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function renderCountryTable(){
  var q = (document.getElementById('table-search').value||'').toLowerCase().trim();
  var rows = COUNTRIES.filter(function(c){ return !q || c.country.toLowerCase().indexOf(q)>-1; });
  rows.sort(function(a,b){
    var av=a[tableSort.key], bv=b[tableSort.key];
    if(av==null) return 1; if(bv==null) return -1;
    if(typeof av==='string') return av.localeCompare(bv)*tableSort.dir*-1;
    return (av-bv)*tableSort.dir;
  });
  var body = document.getElementById('country-table-body');
  var html = '';
  rows.forEach(function(c){
    html += '<tr data-iso="'+c.iso_code+'"><td>'+escapeHtml(c.country)+'</td><td>'+fmtNum(c.co2)+'</td><td>'+(c.co2_per_capita!=null?fmtNum(c.co2_per_capita,2):'—')+'</td><td>'+fmtNum(c.cumulative_co2)+'</td><td>'+(c.share_global_co2!=null?fmtNum(c.share_global_co2,2):'—')+'</td><td>'+(c.share_of_temperature_change_from_ghg!=null?fmtNum(c.share_of_temperature_change_from_ghg,2):'—')+'</td></tr>';
  });
  body.innerHTML = html;
  document.getElementById('table-count').textContent = rows.length+' countries';
  Array.prototype.forEach.call(body.children, function(tr){
    tr.style.cursor='pointer';
    tr.addEventListener('click', function(){ selectCountry(tr.getAttribute('data-iso')); });
  });
  highlightTableRow(state.selectedIso);
}
document.querySelectorAll('#country-table th[data-sort]').forEach(function(th){
  th.addEventListener('click', function(){
    var key = th.getAttribute('data-sort');
    if(tableSort.key===key) tableSort.dir *= -1; else { tableSort.key=key; tableSort.dir=-1; }
    renderCountryTable();
  });
});
document.getElementById('table-search').addEventListener('input', renderCountryTable);

/* ================= who bears responsibility (income groups) ================= */
function renderIncomeChart(){
  var maxVal = 0;
  INCOME_GROUPS.forEach(function(g){ maxVal = Math.max(maxVal, g.pop_share, g.share_global_cumulative_co2); });
  var el = document.getElementById('income-chart');
  el.innerHTML = '';
  INCOME_GROUPS.forEach(function(g){
    var row = document.createElement('div'); row.className='income-row';
    var label = document.createElement('div'); label.className='i-label'; label.textContent = g.label;
    var bars = document.createElement('div'); bars.className='i-bars';

    var t1 = document.createElement('div'); t1.className='income-bar-track';
    var f1 = document.createElement('div'); f1.className='income-bar-fill pop'; f1.style.width=(g.pop_share/maxVal*100)+'%';
    t1.appendChild(f1);
    var v1 = document.createElement('div'); v1.className='i-val'; v1.textContent = fmtNum(g.pop_share,1)+'% of population';

    var t2 = document.createElement('div'); t2.className='income-bar-track';
    var f2 = document.createElement('div'); f2.className='income-bar-fill emit'; f2.style.width=(g.share_global_cumulative_co2/maxVal*100)+'%';
    t2.appendChild(f2);
    var v2 = document.createElement('div'); v2.className='i-val'; v2.textContent = fmtNum(g.share_global_cumulative_co2,1)+'% of cumulative CO₂';

    bars.appendChild(t1); bars.appendChild(v1); bars.appendChild(t2); bars.appendChild(v2);
    row.appendChild(label); row.appendChild(bars);
    el.appendChild(row);
  });

  var callouts = document.getElementById('income-callouts');
  callouts.innerHTML = '';
  INCOME_GROUPS.forEach(function(g){
    var ratio = g.share_global_cumulative_co2 / g.pop_share;
    var div = document.createElement('div'); div.className='callout';
    div.innerHTML = '<b>'+escapeHtml(g.label)+'</b> countries hold ' + fmtNum(g.pop_share,1) +
      '% of global population and are responsible for ' + fmtNum(g.share_global_cumulative_co2,1) +
      '% of cumulative CO₂ since 1750 &mdash; <b>' + fmtNum(ratio,1) + '×</b> their population share.';
    callouts.appendChild(div);
  });
}

/* ================= targets vs. trajectory ================= */
function trendCAGR(iso){
  var h = HISTORY[iso];
  if(!h) return null;
  var y1 = 2024, y0 = 2014;
  var i1 = h.years.indexOf(y1), i0 = h.years.indexOf(y0);
  if(i1<0 || i0<0) return null;
  var v1 = h.co2[i1], v0 = h.co2[i0];
  if(v0==null || v1==null || v0<=0) return null;
  return Math.pow(v1/v0, 1/(y1-y0)) - 1;
}
function renderTargetsTable(){
  var body = document.getElementById('targets-table-body');
  var rows = MAJOR_EMITTER_ISOS.map(function(iso){
    return { iso: iso, c: byIso[iso], cagr: trendCAGR(iso), nz: NET_ZERO[iso] };
  }).filter(function(r){ return r.c; });
  rows.sort(function(a,b){ return (b.c.co2||0) - (a.c.co2||0); });
  body.innerHTML = '';
  rows.forEach(function(r){
    var tr = document.createElement('tr');
    tr.setAttribute('data-iso', r.iso);
    tr.style.cursor = 'pointer';
    tr.addEventListener('click', function(){
      selectCountry(r.iso);
      document.querySelector('.map-card').scrollIntoView({behavior:'smooth', block:'start'});
    });
    var tdName = document.createElement('td'); tdName.textContent = r.c.country;
    var tdCo2 = document.createElement('td'); tdCo2.textContent = fmtMt(r.c.co2);
    var tdTrend = document.createElement('td');
    if(r.cagr==null){ tdTrend.textContent = '—'; }
    else {
      var pill = document.createElement('span');
      pill.className = 'status-pill ' + (r.cagr<0 ? 'falling' : 'rising');
      pill.textContent = (r.cagr<0 ? '↓ ' : '↑ ') + fmtNum(Math.abs(r.cagr*100),1) + '%/yr';
      tdTrend.appendChild(pill);
    }
    var tdTarget = document.createElement('td');
    var badge = document.createElement('span');
    if(!r.nz || r.nz.year==null){
      badge.className = 'target-badge none';
      badge.textContent = r.nz ? r.nz.statusLabel : 'No data';
    } else {
      badge.className = 'target-badge' + (r.nz.status==='law' ? ' law' : '');
      badge.textContent = r.nz.year + ' · ' + r.nz.statusLabel;
    }
    tdTarget.appendChild(badge);
    tr.appendChild(tdName); tr.appendChild(tdCo2); tr.appendChild(tdTrend); tr.appendChild(tdTarget);
    body.appendChild(tr);
  });
}

/* ================= what-if scenario ================= */
var SCENARIO_GROUPS = {
  top6: { label:'Top 6 emitters', isos: TOP_TREND_ISOS },
  global: { label:'All countries (global)', isos: null }
};
var scenarioState = { group:'top6', reduction:30, year:2035 };
var TCRE_LOW=0.27, TCRE_MID=0.45, TCRE_HIGH=0.63;
function fmtWarm(v){ if(v==null) return '—'; var a=Math.abs(v); var d = a<0.01?4:a<0.1?3:2; return a.toFixed(d)+'°C'; }
function groupSeriesAtYears(years){
  if(scenarioState.group==='global'){
    return years.map(function(y){ var r=worldByYear[y]; return r ? r.co2 : null; });
  }
  var isos = SCENARIO_GROUPS[scenarioState.group].isos;
  return years.map(function(y){
    var sum=0, any=false;
    isos.forEach(function(iso){
      var h = HISTORY[iso];
      if(!h) return;
      var idx = h.years.indexOf(y);
      if(idx>=0 && h.co2[idx]!=null){ sum += h.co2[idx]; any=true; }
    });
    return any ? sum : null;
  });
}
function renderScenarioControls(){
  var el = document.getElementById('scenario-group-picker');
  el.innerHTML = '';
  Object.keys(SCENARIO_GROUPS).forEach(function(key){
    var b = document.createElement('button');
    b.type='button'; b.className='metric-btn'+(scenarioState.group===key?' active':'');
    b.textContent = SCENARIO_GROUPS[key].label;
    b.addEventListener('click', function(){ scenarioState.group=key; renderScenarioControls(); renderScenario(); });
    el.appendChild(b);
  });
  document.getElementById('scenario-reduction').value = scenarioState.reduction;
  document.getElementById('scenario-reduction-readout').textContent = scenarioState.reduction+'%';
  document.getElementById('scenario-year').value = scenarioState.year;
}
document.getElementById('scenario-reduction').addEventListener('input', function(e){
  scenarioState.reduction = +e.target.value;
  document.getElementById('scenario-reduction-readout').textContent = scenarioState.reduction+'%';
  renderScenario();
});
document.getElementById('scenario-year').addEventListener('change', function(e){
  scenarioState.year = +e.target.value;
  renderScenario();
});
function renderScenario(){
  var y0 = 2024, y1 = scenarioState.year;
  var histYears = []; for(var hy=2010; hy<=2024; hy++) histYears.push(hy);
  var histVals = groupSeriesAtYears(histYears);
  var base = histVals[histVals.length-1];

  var projYears = []; for(var py=y0; py<=y1; py++) projYears.push(py);
  var reduced = base * (1 - scenarioState.reduction/100);
  var bau = projYears.map(function(){ return base; });
  var scenario = projYears.map(function(yy){ var t = (yy-y0)/((y1-y0)||1); return base + (reduced-base)*t; });

  var avoidedMt = 0;
  for(var i=0;i<projYears.length;i++){ avoidedMt += (bau[i]-scenario[i]); }
  var avoidedGt = avoidedMt/1000;
  var warmMid = (avoidedGt/1000)*TCRE_MID, warmLo = (avoidedGt/1000)*TCRE_LOW, warmHi = (avoidedGt/1000)*TCRE_HIGH;

  var groupLabel = SCENARIO_GROUPS[scenarioState.group].label;
  var results = document.getElementById('scenario-results');
  results.innerHTML = '';
  [
    { l: 'Emissions in '+y1+' — '+groupLabel, v: fmtMt(reduced)+' /yr', sub: 'vs. '+fmtMt(base)+' /yr held flat from 2024' },
    { l: 'Cumulative CO₂ avoided by '+y1, v: fmtNum(avoidedGt,1)+' Gt', sub: 'vs. holding at 2024 levels the whole way' },
    { l: 'Illustrative avoided warming', v: fmtWarm(warmMid), sub: 'likely range '+fmtWarm(warmLo)+'–'+fmtWarm(warmHi) }
  ].forEach(function(t){
    var d = document.createElement('div'); d.className='scenario-tile';
    var l = document.createElement('div'); l.className='l'; l.textContent=t.l;
    var v = document.createElement('div'); v.className='v num'; v.textContent=t.v;
    var s = document.createElement('div'); s.className='sub'; s.textContent=t.sub;
    d.appendChild(l); d.appendChild(v); d.appendChild(s);
    results.appendChild(d);
  });

  var legend = document.getElementById('scenario-legend');
  legend.innerHTML =
    '<div class="legend-chip"><span class="sw" style="background:var(--text-secondary)"></span>Actual, 2010–2024</div>'+
    '<div class="legend-chip"><span class="sw" style="background:var(--text-muted);opacity:.6"></span>If unchanged</div>'+
    '<div class="legend-chip"><span class="sw" style="background:var(--accent)"></span>With this cut</div>';

  renderScenarioChart(histYears, histVals, projYears, bau, scenario);
}
function renderScenarioChart(histYears, histVals, projYears, bau, scenario){
  var container = document.getElementById('scenario-body');
  container.innerHTML = '';
  var w=1140,h=280,ml=62,mr=20,mt=14,mb=28;
  var svgEl = d3.select(document.createElementNS('http://www.w3.org/2000/svg','svg'));
  svgEl.attr('viewBox','0 0 '+w+' '+h).attr('width','100%').style('height','auto').style('display','block');
  container.appendChild(svgEl.node());

  var allYears = histYears.concat(projYears.slice(1));
  var allVals = histVals.concat(bau.slice(1), scenario.slice(1));
  var x = d3.scaleLinear().domain(d3.extent(allYears)).range([ml, w-mr]);
  var y = d3.scaleLinear().domain([0, d3.max(allVals.filter(function(v){return v!=null;}))*1.1]).range([h-mb, mt]);

  var g = svgEl.append('g');
  y.ticks(5).forEach(function(t){
    g.append('line').attr('class','gridline').attr('x1',ml).attr('x2',w-mr).attr('y1',y(t)).attr('y2',y(t));
    g.append('text').attr('class','axis-label').attr('x',ml-6).attr('y',y(t)+3).attr('text-anchor','end').text(fmtMt(t));
  });
  [histYears[0], 2024, projYears[projYears.length-1]].forEach(function(yr){
    g.append('text').attr('class','axis-label').attr('x',x(yr)).attr('y',h-mb+16).attr('text-anchor','middle').text(yr);
  });
  g.append('line').attr('class','baseline').attr('x1',ml).attr('x2',w-mr).attr('y1',h-mb).attr('y2',h-mb);

  var line = d3.line().x(function(d){return x(d.x);}).y(function(d){return y(d.y);}).curve(d3.curveMonotoneX).defined(function(d){return d.y!=null;});

  var histPts = histYears.map(function(yr,i){ return {x:yr, y:histVals[i]}; });
  g.append('path').datum(histPts).attr('d',line).attr('fill','none').style('stroke','var(--text-secondary)').style('stroke-width',2);

  var bauPts = projYears.map(function(yr,i){ return {x:yr, y:bau[i]}; });
  g.append('path').datum(bauPts).attr('d',line).attr('fill','none')
    .style('stroke','var(--text-muted)').style('stroke-width',2).style('stroke-dasharray','5,4').style('opacity',.85);

  var scenPts = projYears.map(function(yr,i){ return {x:yr, y:scenario[i]}; });
  g.append('path').datum(scenPts).attr('d',line).attr('fill','none').style('stroke','var(--accent)').style('stroke-width',2.5);

  [histPts[histPts.length-1], bauPts[bauPts.length-1], scenPts[scenPts.length-1]].forEach(function(pt, i){
    var color = i===0 ? 'var(--text-secondary)' : i===1 ? 'var(--text-muted)' : 'var(--accent)';
    g.append('circle').attr('cx',x(pt.x)).attr('cy',y(pt.y)).attr('r',3.5).attr('class','trend-dot').style('fill',color);
  });
}

/* ================= guided tour (story mode) ================= */
var storyIdx = 0;
function STORY_STEPS(){
  var top3 = COUNTRIES.slice().filter(function(c){return c.co2!=null;}).sort(function(a,b){return b.co2-a.co2;}).slice(0,3);
  var top3Share = top3.reduce(function(s,c){return s+c.share_global_co2;},0);
  var high = INCOME_GROUPS.filter(function(g){return g.key==='high';})[0];
  var low = INCOME_GROUPS.filter(function(g){return g.key==='low';})[0];
  var lawCount = MAJOR_EMITTER_ISOS.filter(function(i){return NET_ZERO[i].status==='law';}).length;
  var noneCount = MAJOR_EMITTER_ISOS.filter(function(i){return NET_ZERO[i].status==='none';}).length;
  return [
    {
      title: 'One number, one gap',
      onEnter: function(){ state.metric='co2'; resetCountry(); renderMetricPicker(); renderMap(); renderLegend(); renderBarChart(); scrollToSection('.kpis'); },
      html: 'In 2024 the world emitted <b>'+fmtMt(worldLatest.co2)+'</b> of CO₂ &mdash; about <b>'+fmtNum(worldLatest.co2_per_capita,1)+' t</b> per person on average. '+
        'That average hides an enormous gap in who actually caused it. This tour walks through the map below in five stops.'
    },
    {
      title: 'Today’s three biggest emitters',
      onEnter: function(){ state.metric='co2'; selectCountry(top3[0].iso_code); renderMetricPicker(); renderMap(); renderLegend(); renderBarChart(); scrollToSection('.map-card'); },
      html: '<b>'+top3.map(function(c){return c.country;}).join(', ')+'</b> alone account for <b>'+fmtNum(top3Share,1)+'%</b> of this year’s emissions. '+
        'The map is set to total CO₂ &mdash; darker means more.'
    },
    {
      title: 'The atmosphere remembers',
      onEnter: function(){ state.metric='cumulative_co2'; renderMetricPicker(); renderMap(); renderLegend(); renderBarChart(); scrollToSection('.map-card'); },
      html: 'Switch to <b>cumulative</b> emissions since 1750 and the map redraws. Countries that industrialized first carry more than two centuries of accumulated CO₂ &mdash; '+
        'a weight today’s fast-growing emitters haven’t caught up to yet.'
    },
    {
      title: 'A fairer lens',
      onEnter: function(){ state.metric='fair_share_ratio'; renderMetricPicker(); renderMap(); renderLegend(); renderBarChart(); scrollToSection('.map-card'); },
      html: 'This map divides each country’s share of historical CO₂ by its share of world population. Blue countries emitted less than their population share; red countries emitted more. '+
        '<b>High-income</b> countries hold <b>'+fmtNum(high.pop_share,1)+'%</b> of people but <b>'+fmtNum(high.share_global_cumulative_co2,1)+'%</b> of cumulative CO₂. '+
        '<b>Low-income</b> countries hold <b>'+fmtNum(low.pop_share,1)+'%</b> of people and just <b>'+fmtNum(low.share_global_cumulative_co2,1)+'%</b>.'
    },
    {
      title: 'Where the pledges stand',
      onEnter: function(){ scrollToSection('#targets-table'); },
      html: 'Of the '+MAJOR_EMITTER_ISOS.length+' largest emitters tracked here, <b>'+lawCount+'</b> have a net-zero target written into law and <b>'+noneCount+'</b> &mdash; including the United States, since its 2025 withdrawal from the Paris Agreement &mdash; currently have no active national target at all. A target is not a trajectory: check the trend column next to it.'
    },
    {
      title: 'Try bending the curve',
      onEnter: function(){ scrollToSection('#scenario-group-picker'); },
      html: 'The panel below turns the picture into a tool: pick a group of emitters and a reduction target, and see roughly how much warming that choice would avoid, using the IPCC’s standard climate-response estimate.'
    }
  ];
}
function scrollToSection(sel){
  var el = document.querySelector(sel);
  if(el) el.scrollIntoView({behavior:'smooth', block:'center'});
}
function renderStory(){
  var steps = STORY_STEPS();
  var i = Math.max(0, Math.min(storyIdx, steps.length-1));
  storyIdx = i;
  var step = steps[i];
  document.getElementById('story-eyebrow').textContent = 'Guided tour · '+(i+1)+' of '+steps.length;
  document.getElementById('story-title').textContent = step.title;
  document.getElementById('story-body').innerHTML = '<p>'+step.html+'</p>';
  var dots = document.getElementById('story-dots');
  dots.innerHTML = '';
  steps.forEach(function(_,idx){
    var d = document.createElement('span'); if(idx===i) d.className='on'; dots.appendChild(d);
  });
  document.getElementById('story-prev-btn').style.visibility = i===0 ? 'hidden' : 'visible';
  document.getElementById('story-next-btn').textContent = i===steps.length-1 ? 'Done' : 'Next';
  step.onEnter();
}
function openStory(){ storyIdx=0; document.getElementById('story-overlay').hidden=false; renderStory(); }
function closeStory(){ document.getElementById('story-overlay').hidden=true; }
document.getElementById('story-open-btn').addEventListener('click', openStory);
document.getElementById('story-overlay').addEventListener('click', function(e){ if(e.target.id==='story-overlay') closeStory(); });
document.getElementById('story-prev-btn').addEventListener('click', function(){ storyIdx--; renderStory(); });
document.getElementById('story-next-btn').addEventListener('click', function(){
  var steps = STORY_STEPS();
  if(storyIdx>=steps.length-1){ closeStory(); return; }
  storyIdx++; renderStory();
});

/* ================= share, embed, data export ================= */
function currentViewParams(){
  var p = new URLSearchParams();
  p.set('metric', state.metric);
  if(state.selectedIso) p.set('country', state.selectedIso);
  var theme = root.getAttribute('data-theme');
  if(theme) p.set('theme', theme);
  return p;
}
function syncUrl(){
  try{
    var p = currentViewParams();
    var url = location.pathname + '?' + p.toString() + location.hash;
    history.replaceState(null, '', url);
  }catch(e){}
}
function applyUrlState(){
  try{
    var p = new URLSearchParams(location.search);
    var metric = p.get('metric');
    if(metric && METRICS.some(function(m){return m.key===metric;})) state.metric = metric;
    var country = p.get('country');
    if(country && byIso[country]) state.selectedIso = country;
    var theme = p.get('theme');
    if(theme==='light' || theme==='dark') applyThemeAttr(theme);
  }catch(e){}
}
function shareUrl(){
  var base = (location.protocol==='http:'||location.protocol==='https:') ? (location.origin+location.pathname) : ARTIFACT_URL;
  return base + '?' + currentViewParams().toString();
}
function updateSharePopover(){
  document.getElementById('share-link-input').value = shareUrl();
  var embedSrc = ARTIFACT_URL + '?' + currentViewParams().toString();
  document.getElementById('share-embed-input').value =
    '<iframe src="'+embedSrc+'" width="100%" height="900" style="border:0;border-radius:12px;" loading="lazy"></iframe>';
}
var sharePop = document.getElementById('share-popover');
document.getElementById('share-open-btn').addEventListener('click', function(){
  var willShow = sharePop.hidden;
  sharePop.hidden = !willShow;
  this.setAttribute('aria-expanded', String(willShow));
  if(willShow) updateSharePopover();
});
document.getElementById('share-close-btn').addEventListener('click', function(){ sharePop.hidden=true; });
document.addEventListener('click', function(e){
  if(e.target && e.target.hasAttribute && e.target.hasAttribute('download')) return; // synthetic export-download anchor, not an outside click
  if(!sharePop.hidden && !sharePop.contains(e.target) && e.target.id!=='share-open-btn'){ sharePop.hidden=true; }
});
function copyText(text, btn){
  var done = function(){ var old=btn.textContent; btn.textContent='Copied'; setTimeout(function(){btn.textContent=old;},1200); };
  if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(done, done); }
  else { done(); }
}
document.getElementById('share-copy-link-btn').addEventListener('click', function(){ copyText(document.getElementById('share-link-input').value, this); });
document.getElementById('share-copy-embed-btn').addEventListener('click', function(){ copyText(document.getElementById('share-embed-input').value, this); });
/* Blob + <a download> works in a normal browser (the standalone downloaded
   file) but is inert inside the Artifact viewer sandbox — it's the fallback
   for contexts where window.claude / the downloads capability isn't there. */
function downloadBlob(content, filename, type){
  var blob = new Blob([content], {type:type});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
}
var downloadsCapability = (typeof window.claude !== 'undefined' && window.claude && typeof window.claude.use === 'function')
  ? window.claude.use('downloads').catch(function(){ return null; })
  : Promise.resolve(null);
function flashBtn(btn, label){
  if(!btn) return;
  var old = btn.textContent;
  btn.textContent = label;
  setTimeout(function(){ btn.textContent = old; }, 1400);
}
function saveFile(content, filename, type, btn){
  downloadsCapability.then(function(downloads){
    if(downloads){
      downloads.save({ filename: filename, data: content }).then(function(){
        flashBtn(btn, 'Saved');
      }).catch(function(err){
        if(err && err.code === 'declined') return; // viewer said no, don't retry
        try { downloadBlob(content, filename, type); flashBtn(btn, 'Downloaded'); }
        catch(e){ /* nothing more we can do in this context */ }
      });
    } else {
      downloadBlob(content, filename, type);
      flashBtn(btn, 'Downloaded');
    }
  });
}
document.getElementById('share-download-json-btn').addEventListener('click', function(){
  saveFile(JSON.stringify(COUNTRIES, null, 1), 'carbon-ledger-countries-2024.json', 'application/json', this);
});
document.getElementById('share-download-csv-btn').addEventListener('click', function(){
  var cols = ['country','iso_code','population','co2','co2_per_capita','cumulative_co2','share_global_co2','share_of_temperature_change_from_ghg','fair_share_ratio'];
  var lines = [cols.join(',')];
  COUNTRIES.forEach(function(c){
    lines.push(cols.map(function(k){ var v=c[k]; if(v==null) return ''; if(typeof v==='string' && v.indexOf(',')>-1) return '"'+v+'"'; return v; }).join(','));
  });
  saveFile(lines.join('\n'), 'carbon-ledger-countries-2024.csv', 'text/csv', this);
});

/* ================= orchestration ================= */
function renderAll(){
  renderKPIs();
  renderMetricPicker();
  renderMap();
  renderLegend();
  renderPanel();
  renderBarChart();
  renderTrendLegend();
  renderTrendChart();
  renderTrendTable();
  renderAreaLegend();
  renderAreaChart();
  renderAreaTable();
  renderIncomeChart();
  renderTargetsTable();
  renderScenarioControls();
  renderScenario();
  renderCountryTable();
  syncUrl();
}
applyUrlState();
renderAll();
if(new URLSearchParams(location.search).get('tour')==='1'){ openStory(); }
window.addEventListener('resize', function(){ /* svg uses viewBox, no rebuild needed */ });
}
})();
