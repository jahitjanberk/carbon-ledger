/* Carbon Ledger — interface translations.
   Keys are the exact English strings used in the app (static HTML snapshots
   and dynamic template strings alike); a missing key simply falls back to
   English, so partial coverage degrades gracefully. Country names are NOT
   listed here — they come from Intl.DisplayNames via each country's ISO2
   code. {curly} tokens are placeholders filled after translation. */
window.CL_I18N = { dict: {

es: {
  'Methodology &amp; sources': 'Metodología y fuentes',
  'Download the data:': 'Descargar los datos:',
  'Shift-click to pin for comparison': 'Mayús+clic para fijarlo en la comparación',
  'High-income': 'Renta alta', 'Upper-middle-income': 'Renta media-alta',
  'Lower-middle-income': 'Renta media-baja', 'Low-income': 'Renta baja',
  '{p}% of population': '{p} % de la población',
  '{p}% of cumulative CO₂': '{p} % del CO₂ acumulado',
  '<b>High-income</b> countries hold {hp}% of global population but {hc}% of cumulative CO₂ since 1750 — <b>{hx}×</b> their population share. <b>Low-income</b> countries: {lp}% of people, {lc}% of the CO₂ — <b>{lx}×</b>.':
    'Los países de <b>renta alta</b> tienen el {hp} % de la población mundial pero el {hc} % del CO₂ acumulado desde 1750 — <b>{hx}×</b> su parte de población. Los de <b>renta baja</b>: {lp} % de la población, {lc} % del CO₂ — <b>{lx}×</b>.',
  'Weighted footprint of your country exposure, set against the world average.':
    'La huella ponderada de tu exposición por países, frente a la media mundial.',
  'The sector mix behind it — energy, industry, agriculture, waste, land use.':
    'La mezcla sectorial que hay detrás: energía, industria, agricultura, residuos, uso de la tierra.',
  'A weight-shaded world map and a country-by-country exposure list.':
    'Un mapa mundial sombreado por peso y una lista de exposición país por país.',

  /* ---- header & chrome ---- */
  'Country-level CO₂ emissions and their share of observed warming, built from the Global Carbon Project via Our World in Data.':
    'Emisiones de CO₂ por país y su parte del calentamiento observado, a partir del Global Carbon Project vía Our World in Data.',
  'Guided tour': 'Visita guiada',
  'Share &amp; reuse': 'Compartir y reutilizar',
  '☆ Saved views': '☆ Vistas guardadas',
  'Latest year: {y}': 'Último año: {y}',

  /* ---- share popover ---- */
  'Link to this view': 'Enlace a esta vista',
  'A short link carrying the metric, country set, and scenario.':
    'Un enlace corto con la métrica, los países y el escenario.',
  'Embed': 'Insertar',
  'Paste into a page or newsletter.': 'Pégalo en una página o boletín.',
  'Share card': 'Tarjeta para compartir',
  'A citation-ready PNG of the current view, sized for a deck or a social post.':
    'Un PNG citable de la vista actual, con tamaño para una presentación o una red social.',
  'Download the data': 'Descargar los datos',
  'The cleaned, joined dataset behind this dashboard.': 'El conjunto de datos limpio y unificado detrás de este panel.',
  'Copy link': 'Copiar enlace', 'Copy embed code': 'Copiar código',
  'Deck 16:9': 'Presentación 16:9', 'Social 1200×630': 'Social 1200×630',
  'Copied': 'Copiado', 'Copy blocked': 'Copia bloqueada', 'Downloaded': 'Descargado', 'Saved': 'Guardado',

  /* ---- saved views ---- */
  'Save this view': 'Guardar esta vista',
  'Your saved views': 'Tus vistas guardadas',
  'Country set, metric, and scenario — one click brings it all back.':
    'Países, métrica y escenario: un clic lo trae todo de vuelta.',
  '★ Save view': '★ Guardar vista',
  'Nothing saved yet. Set up a comparison, pick a metric or scenario, then save it here.':
    'Aún no hay nada guardado. Prepara una comparación, elige una métrica o un escenario y guárdalo aquí.',
  'Restore this view': 'Restaurar esta vista',
  'Link': 'Enlace', 'Copy short link': 'Copiar enlace corto',
  'Restored view: ': 'Vista restaurada: ',
  'World': 'Mundo',

  /* ---- metrics ---- */
  'Total CO₂': 'CO₂ total', 'Per person': 'Por persona', 'Cumulative': 'Acumulado',
  'Warming share': 'Parte del calentamiento', 'Fair share': 'Parte justa',
  'CO₂ emissions': 'Emisiones de CO₂', 'CO₂ per person': 'CO₂ por persona',
  'Cumulative CO₂ since 1750': 'CO₂ acumulado desde 1750',
  'Share of global warming': 'Parte del calentamiento global',
  'Cumulative CO₂ share ÷ population share': 'Parte del CO₂ acumulado ÷ parte de la población',
  'Mt CO₂ / yr': 'Mt CO₂ / año', 't CO₂ / yr': 't CO₂ / año', 'Mt CO₂': 'Mt CO₂',
  '% of observed warming': '% del calentamiento observado',
  '× a proportional share (1.0× = exactly proportional)': '× una parte proporcional (1,0× = exactamente proporcional)',

  /* ---- KPI row ---- */
  'Global CO₂ emissions, {y}': 'Emisiones globales de CO₂, {y}',
  'vs. {v} in {y}': 'frente a {v} en {y}',
  'Average per person': 'Media por persona',
  't / yr': 't / año',
  'world population {n}B': 'población mundial {n} mil M',
  'Cumulative since 1750': 'Acumulado desde 1750',
  'total industrial-era CO₂': 'CO₂ total de la era industrial',
  'Warming from CO₂ so far': 'Calentamiento por CO₂ hasta hoy',
  '{v} from all greenhouse gases': '{v} por todos los gases de efecto invernadero',
  'Largest emitter, {y}': 'Mayor emisor, {y}',
  'Largest emitter': 'Mayor emisor',
  '{p} of the world total': '{p} del total mundial',
  'year over year': 'interanual',

  /* ---- map & legend ---- */
  'Emissions by country, {y}': 'Emisiones por país, {y}',
  'Click a country for its detail and trend; shift-click pins it to the comparison. Choose a metric above — the ranking and top-15 chart update with it.':
    'Haz clic en un país para ver su detalle y tendencia; con Mayús lo fijas en la comparación. Elige una métrica arriba: el ranking y el top 15 se actualizan con ella.',
  'No data': 'Sin datos', 'no data': 'sin datos',
  'Rank {r} of {n}': 'Puesto {r} de {n}',
  'Click for state-level detail': 'Haz clic para ver el detalle por estado',
  'Under': 'Menos', 'Over ({n}×+)': 'Más ({n}×+)',

  /* ---- panel ---- */
  'Global summary': 'Resumen global',
  'Click any country on the map, in the ranking, or in the table to see its detail here.':
    'Haz clic en cualquier país del mapa, del ranking o de la tabla para ver aquí su detalle.',
  '{y} total': 'Total {y}',
  'World CO₂, 1900–{y} (Mt/yr)': 'CO₂ mundial, 1900–{y} (Mt/año)',
  'CO₂, 1950–{y} (Mt/yr)': 'CO₂, 1950–{y} (Mt/año)',
  'dashed: 1.5°C path': 'discontinua: senda de 1,5 °C',
  '← Back to global summary': '← Volver al resumen global',
  '★ Unpin from comparison': '★ Quitar de la comparación',
  '☆ Pin to compare': '☆ Fijar para comparar',
  '⎙ One-pager (PDF)': '⎙ Ficha país (PDF)',
  'A formatted A4 summary of this country — print or save as PDF':
    'Un resumen A4 de este país: imprímelo o guárdalo como PDF',
  'Share of global CO₂': 'Parte del CO₂ global',
  'Share of warming': 'Parte del calentamiento',
  'Warming from its CO₂': 'Calentamiento por su CO₂',
  'Ranked <b>#{r}</b> of {n} countries by {m}': 'Puesto <b>{r}</b> de {n} países por {m}',
  '▸ State-level detail': '▸ Detalle por estado',

  /* ---- bar chart & table ---- */
  'Top 15 by {m}': 'Top 15 por {m}',
  'All countries, {y}': 'Todos los países, {y}',
  'Full underlying dataset — the accessible, sortable twin of the map and rankings above.':
    'El conjunto de datos completo: el gemelo accesible y ordenable del mapa y los rankings.',
  '{n} countries': '{n} países',
  'Search countries…': 'Buscar países…',
  'Country': 'País', 'CO₂ (Mt)': 'CO₂ (Mt)', 'Per capita (t)': 'Per cápita (t)',
  'Cumulative (Mt)': 'Acumulado (Mt)', 'Share of global (%)': 'Parte global (%)',
  'Share of warming (%)': 'Parte del calentamiento (%)',

  /* ---- compare ---- */
  'Compare': 'Comparar',
  'Side by side': 'Lado a lado',
  'Pin 2–4 countries and every chart follows them.': 'Fija de 2 a 4 países y todos los gráficos los seguirán.',
  'Pin another to compare side by side.': 'Fija otro para comparar lado a lado.',
  'Up to {n} countries — unpin one first.': 'Máximo {n} países: quita uno primero.',
  'Remove from comparison': 'Quitar de la comparación',
  'Pin to compare': 'Fijar para comparar',
  'Unpin ': 'Quitar ', 'Pin ': 'Fijar ',
  'Limit of {n} — unpin one': 'Límite de {n}: quita uno',
  'Add a country…': 'Añadir un país…',
  'No matching country': 'Ningún país coincide',
  '{y} figures for your pinned country — pin up to 4 to compare.':
    'Cifras de {y} para tu país fijado; fija hasta 4 para comparar.',
  '{y} figures for your pinned countries — the map outline, ranking, trend chart, and tables follow the same pins.':
    'Cifras de {y} para tus países fijados: el contorno en el mapa, el ranking, la tendencia y las tablas siguen los mismos.',
  'One-pager (PDF) for ': 'Ficha país (PDF) de ',
  '10-yr trend': 'Tendencia 10 años',
  'Not tracked': 'No registrado', 'None': 'Ninguno',
  'Net-zero target': 'Meta de cero neto',
  ' pinned to comparison, ': ' fijado en la comparación, ',
  ' unpinned, ': ' quitado, ',
  'Selected ': 'Seleccionado: ',

  /* ---- trend chart ---- */
  'Your comparison, 1950–{y}': 'Tu comparación, 1950–{y}',
  'Who has driven the rise, 1950–{y}': 'Quién ha impulsado el aumento, 1950–{y}',
  'Annual territorial CO₂ emissions for your pinned countries.':
    'Emisiones territoriales anuales de CO₂ de tus países fijados.',
  'Annual territorial CO₂ emissions for the six largest current emitters.':
    'Emisiones territoriales anuales de CO₂ de los seis mayores emisores actuales.',
  'Dashed: a 1.5°C-consistent reference — straight-line decline to net zero by {y}, the global IPCC benchmark applied uniformly, not a national pledge.':
    'Discontinua: una referencia compatible con 1,5 °C — descenso lineal hasta cero neto en {y}, el punto de referencia global del IPCC aplicado uniformemente, no un compromiso nacional.',
  '1.5°C-aligned path → net zero {y}': 'Senda alineada con 1,5 °C → cero neto {y}',
  '1.5°C-aligned path': 'Senda alineada con 1,5 °C',
  'No emissions history available for the pinned countries.':
    'No hay historial de emisiones para los países fijados.',
  'View as table': 'Ver como tabla', 'View as chart': 'Ver como gráfico',
  'Year': 'Año',

  /* ---- milestones ---- */
  'Rio': 'Río', 'Kyoto': 'Kioto', 'Kyoto in force': 'Kioto en vigor', 'Paris': 'París', 'NDCs due': 'Primeras NDC',
  'UNFCCC adopted at the Rio Earth Summit': 'La CMNUCC se adopta en la Cumbre de Río',
  'Kyoto Protocol adopted': 'Se adopta el Protocolo de Kioto',
  'Kyoto Protocol enters into force': 'El Protocolo de Kioto entra en vigor',
  'Paris Agreement adopted': 'Se adopta el Acuerdo de París',
  'First round of Paris NDCs due': 'Vence la primera ronda de NDC de París',
  'NDC': 'NDC', '2060 pledge': 'Meta 2060', 'Exits Kyoto': 'Sale de Kioto',
  'Rejoins Paris': 'Vuelve a París', 'Exits Paris': 'Sale de París',
  '2070 pledge': 'Meta 2070', 'Joins Paris': 'Se une a París',
  '2050 pledge': 'Meta 2050', '2045 law': 'Ley 2045', 'Unratified': 'Sin ratificar',
  '2050 law': 'Ley 2050', 'Ratifies Paris': 'Ratifica París',
  'Climate law': 'Ley climática', 'Climate act': 'Ley climática',
  'Paris NDC: peak CO2 around 2030': 'NDC de París: pico de CO₂ hacia 2030',
  'Pledges carbon neutrality by 2060': 'Promete neutralidad de carbono para 2060',
  'Rejects Kyoto Protocol ratification': 'Rechaza ratificar el Protocolo de Kioto',
  'Rejoins the Paris Agreement': 'Vuelve al Acuerdo de París',
  'Withdraws from the Paris Agreement again': 'Se retira de nuevo del Acuerdo de París',
  'Pledges net zero by 2070 at COP26': 'Promete cero neto para 2070 en la COP26',
  'Formally accepts the Paris Agreement': 'Acepta formalmente el Acuerdo de París',
  'Announces 2060 net-zero goal': 'Anuncia una meta de cero neto en 2060',
  'Pledges net zero by 2050': 'Promete cero neto para 2050',
  'Climate law tightened: net zero by 2045': 'Endurece su ley climática: cero neto en 2045',
  'Signs but never ratifies the Paris Agreement': 'Firma pero nunca ratifica el Acuerdo de París',
  'Pledges net zero by 2060': 'Promete cero neto para 2060',
  'Carbon-neutrality act: net zero by 2050': 'Ley de neutralidad de carbono: cero neto en 2050',
  'Withdraws from the Kyoto Protocol': 'Se retira del Protocolo de Kioto',
  'Net-zero accountability act: 2050 in law': 'Ley de rendición de cuentas: 2050 en la ley',
  'Ratifies Paris; announces 2053 net-zero goal': 'Ratifica París y anuncia cero neto en 2053',
  'Ratifies the Paris Agreement': 'Ratifica el Acuerdo de París',
  'Brings neutrality pledge forward to 2050': 'Adelanta su meta de neutralidad a 2050',
  'General law on climate change enacted': 'Promulga la Ley General de Cambio Climático',
  'Climate Change Act signed into law': 'Se promulga la Ley de Cambio Climático',
  'Climate Change Act — first binding national carbon budget law': 'Climate Change Act: primera ley nacional vinculante de presupuestos de carbono',
  'Net zero by 2050 written into law': 'Cero neto en 2050 escrito en la ley',
  'Climate Change Act: 43% cut by 2030, net zero 2050': 'Ley climática: −43 % en 2030, cero neto en 2050',

  /* ---- responsibility card ---- */
  'Who bears responsibility': 'Quién carga con la responsabilidad',
  'Historical emissions, grouped by World Bank income classification — population share alongside share of all industrial-era CO₂.':
    'Emisiones históricas por grupos de renta del Banco Mundial: parte de la población junto a la parte de todo el CO₂ de la era industrial.',
  '<span class="sw" style="background:var(--cat-1)"></span>Share of world population':
    '<span class="sw" style="background:var(--cat-1)"></span>Parte de la población mundial',
  '<span class="sw" style="background:var(--cat-2)"></span>Share of cumulative CO₂ since 1750':
    '<span class="sw" style="background:var(--cat-2)"></span>Parte del CO₂ acumulado desde 1750',

  /* ---- sectors ---- */
  'Emissions by sector, {y}': 'Emisiones por sector, {y}',
  'All greenhouse gases in CO₂-equivalents — the lens that makes agriculture and waste visible. Globally: energy {e}%, agriculture {a}%, industrial processes {i}%, waste {w}%. Rows follow your pinned or selected countries.':
    'Todos los gases de efecto invernadero en CO₂ equivalente: la lente que hace visibles la agricultura y los residuos. A nivel mundial: energía {e} %, agricultura {a} %, procesos industriales {i} %, residuos {w} %. Las filas siguen tus países fijados o seleccionados.',
  'Source: Climate Watch via Our World in Data, {y}, all gases as CO₂e. “Energy” bundles all fuel combustion — power, transport, buildings, manufacturing, fugitive and bunker fuels — so “industrial processes” covers only non-energy emissions such as cement chemistry. Land use & forestry can be negative: a net sink, drawn left of the axis. Sector data lags the rest of the dashboard by a year and is unavailable for some small territories.':
    'Fuente: Climate Watch vía Our World in Data, {y}, todos los gases como CO₂e. «Energía» agrupa toda la combustión — electricidad, transporte, edificios, industria, emisiones fugitivas y búnkeres —, de modo que «procesos industriales» cubre solo las emisiones no energéticas, como la química del cemento. El uso de la tierra puede ser negativo: un sumidero neto, dibujado a la izquierda del eje. Estos datos van un año por detrás del resto del panel y faltan para algunos territorios pequeños.',
  'Energy': 'Energía', 'Industrial processes': 'Procesos industriales',
  'Agriculture': 'Agricultura', 'Waste': 'Residuos', 'Land use & forestry': 'Uso de la tierra y bosques',
  'No sector data for the current countries.': 'Sin datos sectoriales para los países actuales.',
  'No sector data': 'Sin datos sectoriales',
  'Net sink': 'Sumidero neto',
  '% of gross emissions': ' % de las emisiones brutas',
  'Net total, all sectors': 'Total neto, todos los sectores',
  'Net total': 'Total neto',

  /* ---- sub-national ---- */
  '{c}, state by state — {y}': '{c}, estado por estado — {y}',
  'Energy-related CO₂ from fossil-fuel combustion only; excludes industrial process emissions and land use.':
    'Solo CO₂ energético por combustión de fósiles; excluye procesos industriales y uso de la tierra.',
  'Bars are each state’s share of the state total; the pill is the 10-year change ({y0}–{y1}).':
    'Las barras son la parte de cada estado sobre el total estatal; la píldora es el cambio en 10 años ({y0}–{y1}).',
  'Source: {s} ({u}). The {n} states sum to {tot} in {y} on this scope; the national figure elsewhere on this page ({nat}) is all CO₂ in {ly}, so the two are not directly comparable.':
    'Fuente: {s} ({u}). Los {n} estados suman {tot} en {y} con este alcance; la cifra nacional del resto de la página ({nat}) es todo el CO₂ en {ly}, así que no son directamente comparables.',
  'Show top {n}': 'Ver top {n}', 'Show all {n}': 'Ver los {n}',
  'Share of the state total': 'Parte del total estatal',
  'Change vs {y}': 'Cambio frente a {y}',

  /* ---- targets ---- */
  'Targets vs. trajectory': 'Metas frente a trayectoria',
  'The largest current emitters: which way their emissions are actually moving, next to their stated net-zero commitment.':
    'Los mayores emisores actuales: hacia dónde van realmente sus emisiones, junto a su compromiso declarado de cero neto.',
  'CO₂, 2024': 'CO₂, 2024',
  'Trend is the compound annual growth rate of territorial CO₂ over <span id="targets-trend-range">2014–2024</span>. Net-zero targets: <a href="https://eciu.net/netzerotracker" target="_blank" rel="noopener">Energy &amp; Climate Intelligence Unit Net Zero Tracker</a>; the United States is shown as having no active national target following its 2025 withdrawal from the Paris Agreement.':
    'La tendencia es la tasa de crecimiento anual compuesta del CO₂ territorial en <span id="targets-trend-range">2014–2024</span>. Metas de cero neto: <a href="https://eciu.net/netzerotracker" target="_blank" rel="noopener">Net Zero Tracker de la Energy &amp; Climate Intelligence Unit</a>; Estados Unidos aparece sin meta nacional activa tras su retirada del Acuerdo de París en 2025.',
  'In law': 'En ley', 'In policy document': 'En documento político',
  'Declaration / pledge': 'Declaración / promesa', 'No target': 'Sin meta',
  'No active target (withdrew from Paris Agreement, 2025)': 'Sin meta activa (se retiró del Acuerdo de París, 2025)',

  /* ---- scenario ---- */
  'What if? — a reduction scenario': '¿Y si…? — un escenario de reducción',
  'Pick a group of emitters and a reduction target. See the cumulative CO₂ it would avoid, and roughly how much warming that represents.':
    'Elige un grupo de emisores y una meta de reducción. Mira el CO₂ acumulado que evitaría y, aproximadamente, cuánto calentamiento representa.',
  'Who cuts emissions': 'Quién recorta emisiones',
  'Reduction by target year': 'Reducción al año objetivo',
  'Target year': 'Año objetivo',
  'Top 6 emitters': 'Los 6 mayores emisores',
  'Pinned countries': 'Países fijados',
  'All countries (global)': 'Todos los países (global)',
  'No emissions history available for this group of countries.': 'No hay historial de emisiones para este grupo de países.',
  'Emissions in {y} — {g}': 'Emisiones en {y} — {g}',
  'vs. {v} /yr held flat from {y}': 'frente a {v}/año constantes desde {y}',
  'Cumulative CO₂ avoided by {y}': 'CO₂ acumulado evitado hasta {y}',
  'vs. holding at {y} levels the whole way': 'frente a mantener los niveles de {y} todo el tiempo',
  'Illustrative avoided warming': 'Calentamiento evitado (ilustrativo)',
  'likely range {a}–{b}': 'rango probable {a}–{b}',
  'Against the 1.5°C path in {y}': 'Frente a la senda de 1,5 °C en {y}',
  'On track': 'En la senda',
  'at or below the aligned level of {v} /yr': 'en o por debajo del nivel alineado de {v}/año',
  'above the aligned level of {v} /yr': 'por encima del nivel alineado de {v}/año',
  'Actual, {a}–{b}': 'Real, {a}–{b}',
  'If unchanged': 'Sin cambios',
  'With this cut': 'Con este recorte',
  '1.5°C-aligned → net zero {y}': 'Alineado con 1,5 °C → cero neto {y}',

  /* ---- portfolio ---- */
  'Portfolio overlay': 'Superposición de cartera',
  "Map a portfolio's country weights onto emissions, sector, and trajectory exposure — no separate spreadsheet. Holdings stay in this browser; nothing is uploaded.":
    'Proyecta los pesos por país de una cartera sobre su exposición a emisiones, sectores y trayectorias, sin hoja de cálculo aparte. Las posiciones se quedan en este navegador; no se sube nada.',
  'Apply': 'Aplicar', 'Load CSV…': 'Cargar CSV…', 'Load sample': 'Cargar ejemplo',
  'Clear': 'Borrar', 'Edit holdings': 'Editar posiciones',
  'One holding per line: country and weight.': 'Una posición por línea: país y peso.',
  'Weights can be % or amounts — they are normalized. Comments start with #.':
    'Los pesos pueden ser % o importes: se normalizan. Los comentarios empiezan con #.',
  'No holdings recognized — use one line per holding: country name or ISO code, then a weight.':
    'No se reconoció ninguna posición: usa una línea por posición, con el nombre del país o su código ISO y un peso.',
  '{n} countries matched': '{n} países reconocidos',
  'not recognized:': 'no reconocidos:',
  'Weighted CO₂ per person': 'CO₂ ponderado por persona',
  '{x}× the world average of {v} t': '{x}× la media mundial de {v} t',
  'Historical responsibility tilt': 'Sesgo de responsabilidad histórica',
  'exposure-weighted share of cumulative CO₂ ÷ population share':
    'parte del CO₂ acumulado ponderada por exposición ÷ parte de la población',
  'Weight where emissions rise': 'Peso donde las emisiones suben',
  'countries with a positive 10-yr CO₂ trend': 'países con tendencia de CO₂ positiva a 10 años',
  'Largest exposure': 'Mayor exposición',
  '{p}% of weight · {n} countries': '{p} % del peso · {n} países',
  'Sector exposure of underlying emissions': 'Exposición sectorial de las emisiones subyacentes',
  'based on {p}% of weight': 'sobre el {p} % del peso',
  'No sector data for these countries.': 'Sin datos sectoriales para estos países.',
  'Country exposure': 'Exposición por país',
  '+{n} more countries': '+{n} países más',
  'Pin top {n} to compare': 'Fijar el top {n} para comparar',
  'Where the weight sits': 'Dónde está el peso',
  '{p}% of weight': '{p} % del peso',
  "Country-level attribution: each holding is mapped to its country's territorial emissions profile — a screening view, not issuer-level carbon accounting. Sector mix weights each country's share of gross CO₂e emissions (Climate Watch); net land-use sinks are excluded from the mix. Trajectory is the 10-year CAGR of territorial CO₂.":
    'Atribución a nivel de país: cada posición se asigna al perfil de emisiones territoriales de su país — una vista de cribado, no contabilidad de carbono por emisor. La mezcla sectorial pondera la parte de cada país en las emisiones brutas de CO₂e (Climate Watch); los sumideros netos de uso de la tierra quedan fuera. La trayectoria es la TCAC a 10 años del CO₂ territorial.',

  /* ---- share card canvas ---- */
  'Data through {y}': 'Datos hasta {y}',
  'All countries': 'Todos los países',
  'rank #{r} of {n}': 'puesto {r} de {n}',
  'vs.': 'vs.',
  'Data: Global Carbon Project via Our World in Data, owid/co2-data (CC BY 4.0)':
    'Datos: Global Carbon Project vía Our World in Data, owid/co2-data (CC BY 4.0)',
  'refreshed': 'actualizado',
  'You can also right-click the preview to copy or save it.':
    'También puedes hacer clic derecho en la vista previa para copiarla o guardarla.',
  'Copy image': 'Copiar imagen', 'Download PNG': 'Descargar PNG', 'Close': 'Cerrar',

  /* ---- one-pager ---- */
  'Country one-pager': 'Ficha país',
  'Your browser’s print dialog opens — choose “Save as PDF”.':
    'Se abre el diálogo de impresión del navegador: elige «Guardar como PDF».',
  'Print / Save as PDF': 'Imprimir / Guardar como PDF',
  'Country climate profile': 'Perfil climático del país',
  'Generated': 'Generado',
  'No tracked national net-zero target': 'Sin meta nacional de cero neto registrada',
  'Net-zero target: ': 'Meta de cero neto: ',
  'CO₂ emissions, {y}': 'Emisiones de CO₂, {y}',
  'of {v} worldwide': 'de {v} en el mundo',
  'world average {v} t': 'media mundial {v} t',
  'rank #{r}': 'puesto {r}',
  'rank #{r} all-time': 'puesto {r} histórico',
  'Share of observed warming': 'Parte del calentamiento observado',
  'of warming from all greenhouse gases': 'del calentamiento por todos los gases',
  'Fair-share ratio': 'Índice de parte justa',
  'of a population-proportional share of historical CO₂': 'de una parte proporcional a su población del CO₂ histórico',
  'Territorial CO₂, 1950–{y}, with a 1.5°C-aligned reference to {z} (Mt/yr)':
    'CO₂ territorial, 1950–{y}, con referencia alineada con 1,5 °C hasta {z} (Mt/año)',
  'Territorial CO₂, 1950–{y} (Mt/yr)': 'CO₂ territorial, 1950–{y} (Mt/año)',
  'In {y}, {c} emitted <b>{v}</b> of CO₂ — <b>{p}</b> of the world total{rank}{pc}.':
    'En {y}, {c} emitió <b>{v}</b> de CO₂ — <b>{p}</b> del total mundial{rank}{pc}.',
  ', ranking <b>#{r}</b> of {n} countries': ', ocupando el puesto <b>{r}</b> de {n} países',
  ', at <b>{v} t</b> per person against a world average of {w} t': ', con <b>{v} t</b> por persona frente a una media mundial de {w} t',
  'Over {y0}–{y1}, emissions {verb} at <b>{g}%/yr</b>. Cumulatively since 1750 it accounts for <b>{cum}</b>{share}.':
    'Entre {y0} y {y1}, las emisiones {verb} un <b>{g} %/año</b>. Desde 1750 acumula <b>{cum}</b>{share}.',
  'fell': 'cayeron', 'rose': 'subieron',
  ' — <b>{p}%</b> of all industrial-era CO₂': ' — el <b>{p} %</b> de todo el CO₂ de la era industrial',
  'A 1.5°C-consistent path — the global IPCC benchmark applied uniformly, not a national pledge — implies cutting about <b>{r}%</b> of the {y} level each year, reaching net-zero CO₂ by <b>{z}</b>. {nz}.':
    'Una senda compatible con 1,5 °C — el punto de referencia global del IPCC aplicado uniformemente, no un compromiso nacional — implica recortar cada año en torno al <b>{r} %</b> del nivel de {y}, llegando a cero neto de CO₂ en <b>{z}</b>. {nz}.',
  'Emissions by sector, {y} — all greenhouse gases, share of gross CO₂e':
    'Emisiones por sector, {y} — todos los gases, parte del CO₂e bruto',
  'Land use & forestry is a net sink of {v} CO₂e, excluded from the shares above.':
    'El uso de la tierra y los bosques es un sumidero neto de {v} CO₂e, excluido de las partes anteriores.',
  'Sources: Global Carbon Project via Our World in Data, owid/co2-data (CC BY 4.0); sector data Climate Watch via OWID ({y}, CO₂e); net-zero status ECIU Net Zero Tracker. Territorial production emissions; the 1.5°C reference is the IPCC SR1.5 global benchmark applied uniformly.':
    'Fuentes: Global Carbon Project vía Our World in Data, owid/co2-data (CC BY 4.0); datos sectoriales de Climate Watch vía OWID ({y}, CO₂e); estado de cero neto del Net Zero Tracker de la ECIU. Emisiones territoriales de producción; la referencia de 1,5 °C es el punto de referencia global del IPCC SR1.5 aplicado uniformemente.',
  'Interactive version:': 'Versión interactiva:',
  'One-pager ready for ': 'Ficha país lista: ',

  /* ---- tour ---- */
  'One number, one gap': 'Una cifra, una brecha',
  'In {y} the world emitted <b>{v}</b> of CO₂ — about <b>{pc} t</b> per person on average. That average hides an enormous gap in who actually caused it. This tour walks through the dashboard below.':
    'En {y} el mundo emitió <b>{v}</b> de CO₂ — unas <b>{pc} t</b> por persona de media. Esa media esconde una brecha enorme sobre quién lo causó realmente. Esta visita recorre el panel de abajo.',
  'Today’s three biggest emitters': 'Los tres mayores emisores de hoy',
  '<b>{names}</b> alone account for <b>{p}%</b> of this year’s emissions. The map is set to total CO₂ — darker means more.':
    'Solo <b>{names}</b> suman el <b>{p} %</b> de las emisiones de este año. El mapa muestra el CO₂ total: más oscuro significa más.',
  'The atmosphere remembers': 'La atmósfera recuerda',
  'Switch to <b>cumulative</b> emissions since 1750 and the map redraws. Countries that industrialized first carry more than two centuries of accumulated CO₂ — a weight today’s fast-growing emitters haven’t caught up to yet.':
    'Cambia a emisiones <b>acumuladas</b> desde 1750 y el mapa se redibuja. Los países que se industrializaron primero cargan con más de dos siglos de CO₂ acumulado — un peso que los emisores de rápido crecimiento aún no han alcanzado.',
  'A fairer lens': 'Una lente más justa',
  'This map divides each country’s share of historical CO₂ by its share of world population. Blue countries emitted less than their population share; red countries emitted more. <b>High-income</b> countries hold <b>{hp}%</b> of people but <b>{hc}%</b> of cumulative CO₂. <b>Low-income</b> countries hold <b>{lp}%</b> of people and just <b>{lc}%</b>.':
    'Este mapa divide la parte del CO₂ histórico de cada país entre su parte de la población mundial. Los países azules emitieron menos que su parte; los rojos, más. Los países de <b>renta alta</b> tienen el <b>{hp} %</b> de la población pero el <b>{hc} %</b> del CO₂ acumulado. Los de <b>renta baja</b>, el <b>{lp} %</b> de la población y solo el <b>{lc} %</b>.',
  'Pin countries side by side': 'Fija países lado a lado',
  'Pin up to <b>4</b> countries — from the compare tray, a shift-click on the map, or the ☆ on any row — and every chart follows: map outlines, the ranking, this side-by-side card, the trend lines, even the reduction scenario. Here are today’s three biggest emitters.':
    'Fija hasta <b>4</b> países — desde la bandeja de comparación, con Mayús+clic en el mapa o con la ☆ de cualquier fila — y todos los gráficos los siguen: contornos del mapa, ranking, esta tarjeta lado a lado, las tendencias, incluso el escenario de reducción. Aquí están los tres mayores emisores de hoy.',
  'Where the emissions come from': 'De dónde vienen las emisiones',
  'Counting <b>every greenhouse gas</b>, not just CO₂, reveals structure: globally about three-quarters is energy, but Brazil’s footprint is mostly <b>agriculture and land use</b>, while China’s forests are a net carbon <b>sink</b> — drawn left of the axis. The rows follow your pinned countries.':
    'Contar <b>todos los gases de efecto invernadero</b>, no solo el CO₂, revela la estructura: a nivel mundial cerca de tres cuartos es energía, pero la huella de Brasil es sobre todo <b>agricultura y uso de la tierra</b>, mientras que los bosques de China son un <b>sumidero</b> neto — dibujado a la izquierda del eje. Las filas siguen tus países fijados.',
  'Where the pledges stand': 'Dónde están las promesas',
  'Of the {n} largest emitters tracked here, <b>{law}</b> have a net-zero target written into law and <b>{none}</b> — including the United States, since its 2025 withdrawal from the Paris Agreement — currently have no active national target at all. A target is not a trajectory: check the trend column next to it.':
    'De los {n} mayores emisores seguidos aquí, <b>{law}</b> tienen una meta de cero neto escrita en la ley y <b>{none}</b> — incluido Estados Unidos, tras su retirada del Acuerdo de París en 2025 — no tienen hoy ninguna meta nacional activa. Una meta no es una trayectoria: mira la columna de tendencia de al lado.',
  'Try bending the curve': 'Prueba a doblar la curva',
  'The panel below turns the picture into a tool: pick a group of emitters and a reduction target, and see roughly how much warming that choice would avoid, using the IPCC’s standard climate-response estimate.':
    'El panel de abajo convierte la imagen en una herramienta: elige un grupo de emisores y una meta de reducción, y mira aproximadamente cuánto calentamiento evitaría esa decisión, usando la estimación estándar de respuesta climática del IPCC.',
  'Overlay a portfolio': 'Superpón una cartera',
  'Paste a holdings list — country and weight, straight from a spreadsheet — and see its climate exposure: weighted footprint, sector mix, and where emissions are still rising. Holdings never leave this browser. Try <b>Load sample</b>.':
    'Pega una lista de posiciones — país y peso, directo de una hoja de cálculo — y mira su exposición climática: huella ponderada, mezcla sectorial y dónde siguen subiendo las emisiones. Las posiciones nunca salen de este navegador. Prueba <b>Cargar ejemplo</b>.',
  'Make it yours': 'Hazlo tuyo',
  '<b>☆ Saved views</b> stars any metric + country + scenario combination and brings it back in one click, with a short link. <b>Share &amp; reuse</b> exports the current view as a citation-ready PNG sized for a deck or a social post. Your pins and selection from before this tour are restored when you close it.':
    '<b>☆ Vistas guardadas</b> marca cualquier combinación de métrica, países y escenario y la recupera con un clic, con enlace corto. <b>Compartir y reutilizar</b> exporta la vista actual como PNG citable para una presentación o una red social. Tus países fijados y tu selección previos a la visita se restauran al cerrarla.',
  'Back': 'Atrás', 'Next': 'Siguiente', 'Done': 'Listo',

  /* ---- footer ---- */
  'Data: Global Carbon Project &amp; Our World in Data, <a href="https://github.com/owid/co2-data" target="_blank" rel="noopener">owid/co2-data</a> (CC BY 4.0), <span id="data-release">2024 release</span>. Country boundaries are simplified for display; a handful of small island states and territories aren’t resolved on the map but remain in the table below. “Share of warming” is each country’s share of the observed global temperature increase attributed to greenhouse gas emissions.':
    'Datos: Global Carbon Project y Our World in Data, <a href="https://github.com/owid/co2-data" target="_blank" rel="noopener">owid/co2-data</a> (CC BY 4.0), <span id="data-release">edición 2024</span>. Las fronteras están simplificadas para su visualización; algunos pequeños estados insulares y territorios no se resuelven en el mapa pero siguen en la tabla. «Parte del calentamiento» es la parte de cada país en el aumento observado de la temperatura global atribuido a los gases de efecto invernadero.',
  'Income groups follow the World Bank classification as compiled by Our World in Data. Built as an interactive reference, not a forecast — figures are territorial production emissions unless noted.':
    'Los grupos de renta siguen la clasificación del Banco Mundial recopilada por Our World in Data. Construido como referencia interactiva, no como pronóstico: las cifras son emisiones territoriales de producción salvo indicación.',
  'data through {y}': 'datos hasta {y}',
  'Simplified, illustrative model — not a forecast. Assumes the selected countries\' emissions would otherwise hold flat at <span id="scenario-base-year">2024</span> levels, declining in a straight line to the target year and staying flat after. Avoided warming applies IPCC AR6’s transient climate response to cumulative emissions (TCRE): a likely range of 0.27–0.63°C per 1,000 Gt CO₂, central estimate ≈0.45°C. The dashed 1.5°C-aligned reference is the global IPCC benchmark — a straight-line decline to net-zero CO₂ by 2050 — applied uniformly to the selected group; equity-based national pathways differ. Real trajectories also depend on non-CO₂ gases, carbon-cycle feedbacks, and what every other country does.':
    'Modelo simplificado e ilustrativo, no un pronóstico. Supone que las emisiones de los países elegidos se mantendrían en los niveles de <span id="scenario-base-year">2024</span>, bajando en línea recta hasta el año objetivo y quedando planas después. El calentamiento evitado aplica la respuesta climática transitoria a las emisiones acumuladas (TCRE) del IPCC AR6: rango probable de 0,27–0,63 °C por cada 1.000 Gt de CO₂, estimación central ≈0,45 °C. La referencia discontinua alineada con 1,5 °C es el punto de referencia global del IPCC — descenso lineal hasta cero neto en 2050 — aplicado uniformemente al grupo; las sendas nacionales basadas en equidad difieren. Las trayectorias reales dependen también de otros gases, de las retroalimentaciones del ciclo del carbono y de lo que hagan los demás países.'
},

fr: {
  'Methodology &amp; sources': 'Méthodologie et sources',
  'Download the data:': 'Télécharger les données :',
  'Shift-click to pin for comparison': 'Maj+clic pour l’épingler à la comparaison',
  'High-income': 'Revenu élevé', 'Upper-middle-income': 'Revenu intermédiaire sup.',
  'Lower-middle-income': 'Revenu intermédiaire inf.', 'Low-income': 'Faible revenu',
  '{p}% of population': '{p} % de la population',
  '{p}% of cumulative CO₂': '{p} % du CO₂ cumulé',
  '<b>High-income</b> countries hold {hp}% of global population but {hc}% of cumulative CO₂ since 1750 — <b>{hx}×</b> their population share. <b>Low-income</b> countries: {lp}% of people, {lc}% of the CO₂ — <b>{lx}×</b>.':
    'Les pays à <b>revenu élevé</b> comptent {hp} % de la population mondiale mais {hc} % du CO₂ cumulé depuis 1750 — <b>{hx}×</b> leur part de population. Les pays à <b>faible revenu</b> : {lp} % de la population, {lc} % du CO₂ — <b>{lx}×</b>.',
  'Weighted footprint of your country exposure, set against the world average.':
    'L’empreinte pondérée de votre exposition pays, face à la moyenne mondiale.',
  'The sector mix behind it — energy, industry, agriculture, waste, land use.':
    'Le mix sectoriel derrière elle — énergie, industrie, agriculture, déchets, usage des terres.',
  'A weight-shaded world map and a country-by-country exposure list.':
    'Une carte du monde ombrée par poids et une liste d’exposition pays par pays.',

  'Country-level CO₂ emissions and their share of observed warming, built from the Global Carbon Project via Our World in Data.':
    'Émissions de CO₂ par pays et leur part du réchauffement observé, d’après le Global Carbon Project via Our World in Data.',
  'Guided tour': 'Visite guidée',
  'Share &amp; reuse': 'Partager et réutiliser',
  '☆ Saved views': '☆ Vues enregistrées',
  'Latest year: {y}': 'Dernière année : {y}',
  'Link to this view': 'Lien vers cette vue',
  'A short link carrying the metric, country set, and scenario.':
    'Un lien court portant la métrique, les pays et le scénario.',
  'Embed': 'Intégrer',
  'Paste into a page or newsletter.': 'À coller dans une page ou une lettre d’information.',
  'Share card': 'Carte à partager',
  'A citation-ready PNG of the current view, sized for a deck or a social post.':
    'Un PNG citable de la vue actuelle, au format d’une présentation ou d’un réseau social.',
  'Download the data': 'Télécharger les données',
  'The cleaned, joined dataset behind this dashboard.': 'Le jeu de données nettoyé et consolidé derrière ce tableau de bord.',
  'Copy link': 'Copier le lien', 'Copy embed code': 'Copier le code',
  'Deck 16:9': 'Présentation 16:9', 'Social 1200×630': 'Social 1200×630',
  'Copied': 'Copié', 'Copy blocked': 'Copie bloquée', 'Downloaded': 'Téléchargé', 'Saved': 'Enregistré',
  'Save this view': 'Enregistrer cette vue',
  'Your saved views': 'Vos vues enregistrées',
  'Country set, metric, and scenario — one click brings it all back.':
    'Pays, métrique et scénario : un clic et tout revient.',
  '★ Save view': '★ Enregistrer',
  'Nothing saved yet. Set up a comparison, pick a metric or scenario, then save it here.':
    'Rien d’enregistré pour l’instant. Préparez une comparaison, choisissez une métrique ou un scénario, puis enregistrez-les ici.',
  'Restore this view': 'Restaurer cette vue',
  'Link': 'Lien', 'Copy short link': 'Copier le lien court',
  'Restored view: ': 'Vue restaurée : ',
  'World': 'Monde',
  'Total CO₂': 'CO₂ total', 'Per person': 'Par personne', 'Cumulative': 'Cumulé',
  'Warming share': 'Part du réchauffement', 'Fair share': 'Juste part',
  'CO₂ emissions': 'Émissions de CO₂', 'CO₂ per person': 'CO₂ par personne',
  'Cumulative CO₂ since 1750': 'CO₂ cumulé depuis 1750',
  'Share of global warming': 'Part du réchauffement mondial',
  'Cumulative CO₂ share ÷ population share': 'Part du CO₂ cumulé ÷ part de la population',
  'Mt CO₂ / yr': 'Mt CO₂ / an', 't CO₂ / yr': 't CO₂ / an', 'Mt CO₂': 'Mt CO₂',
  '% of observed warming': '% du réchauffement observé',
  '× a proportional share (1.0× = exactly proportional)': '× une part proportionnelle (1,0× = exactement proportionnel)',
  'Global CO₂ emissions, {y}': 'Émissions mondiales de CO₂, {y}',
  'vs. {v} in {y}': 'contre {v} en {y}',
  'Average per person': 'Moyenne par personne',
  't / yr': 't / an',
  'world population {n}B': 'population mondiale {n} Md',
  'Cumulative since 1750': 'Cumulé depuis 1750',
  'total industrial-era CO₂': 'CO₂ total de l’ère industrielle',
  'Warming from CO₂ so far': 'Réchauffement dû au CO₂ à ce jour',
  '{v} from all greenhouse gases': '{v} pour l’ensemble des gaz à effet de serre',
  'Largest emitter, {y}': 'Premier émetteur, {y}',
  'Largest emitter': 'Premier émetteur',
  '{p} of the world total': '{p} du total mondial',
  'year over year': 'sur un an',
  'Emissions by country, {y}': 'Émissions par pays, {y}',
  'Click a country for its detail and trend; shift-click pins it to the comparison. Choose a metric above — the ranking and top-15 chart update with it.':
    'Cliquez sur un pays pour son détail et sa tendance ; Maj+clic l’épingle à la comparaison. Choisissez une métrique ci-dessus : le classement et le top 15 s’actualisent.',
  'No data': 'Pas de données', 'no data': 'pas de données',
  'Rank {r} of {n}': 'Rang {r} sur {n}',
  'Click for state-level detail': 'Cliquez pour le détail par État',
  'Under': 'Moins', 'Over ({n}×+)': 'Plus ({n}×+)',
  'Global summary': 'Vue d’ensemble mondiale',
  'Click any country on the map, in the ranking, or in the table to see its detail here.':
    'Cliquez sur un pays — carte, classement ou tableau — pour afficher son détail ici.',
  '{y} total': 'Total {y}',
  'World CO₂, 1900–{y} (Mt/yr)': 'CO₂ mondial, 1900–{y} (Mt/an)',
  'CO₂, 1950–{y} (Mt/yr)': 'CO₂, 1950–{y} (Mt/an)',
  'dashed: 1.5°C path': 'pointillé : trajectoire 1,5 °C',
  '← Back to global summary': '← Retour à la vue mondiale',
  '★ Unpin from comparison': '★ Retirer de la comparaison',
  '☆ Pin to compare': '☆ Épingler pour comparer',
  '⎙ One-pager (PDF)': '⎙ Fiche pays (PDF)',
  'A formatted A4 summary of this country — print or save as PDF':
    'Une synthèse A4 de ce pays — à imprimer ou enregistrer en PDF',
  'Share of global CO₂': 'Part du CO₂ mondial',
  'Share of warming': 'Part du réchauffement',
  'Warming from its CO₂': 'Réchauffement dû à son CO₂',
  'Ranked <b>#{r}</b> of {n} countries by {m}': 'Rang <b>{r}</b> sur {n} pays par {m}',
  '▸ State-level detail': '▸ Détail par État',
  'Top 15 by {m}': 'Top 15 par {m}',
  'All countries, {y}': 'Tous les pays, {y}',
  'Full underlying dataset — the accessible, sortable twin of the map and rankings above.':
    'Le jeu de données complet : le jumeau accessible et triable de la carte et des classements.',
  '{n} countries': '{n} pays',
  'Search countries…': 'Rechercher un pays…',
  'Country': 'Pays', 'CO₂ (Mt)': 'CO₂ (Mt)', 'Per capita (t)': 'Par habitant (t)',
  'Cumulative (Mt)': 'Cumulé (Mt)', 'Share of global (%)': 'Part mondiale (%)',
  'Share of warming (%)': 'Part du réchauffement (%)',
  'Compare': 'Comparer',
  'Side by side': 'Côte à côte',
  'Pin 2–4 countries and every chart follows them.': 'Épinglez 2 à 4 pays et tous les graphiques les suivent.',
  'Pin another to compare side by side.': 'Épinglez-en un autre pour comparer côte à côte.',
  'Up to {n} countries — unpin one first.': 'Maximum {n} pays — retirez-en un d’abord.',
  'Remove from comparison': 'Retirer de la comparaison',
  'Pin to compare': 'Épingler pour comparer',
  'Unpin ': 'Retirer ', 'Pin ': 'Épingler ',
  'Limit of {n} — unpin one': 'Limite de {n} — retirez-en un',
  'Add a country…': 'Ajouter un pays…',
  'No matching country': 'Aucun pays correspondant',
  '{y} figures for your pinned country — pin up to 4 to compare.':
    'Chiffres {y} de votre pays épinglé — épinglez jusqu’à 4 pour comparer.',
  '{y} figures for your pinned countries — the map outline, ranking, trend chart, and tables follow the same pins.':
    'Chiffres {y} de vos pays épinglés — contours sur la carte, classement, tendance et tableaux suivent les mêmes épingles.',
  'One-pager (PDF) for ': 'Fiche pays (PDF) : ',
  '10-yr trend': 'Tendance 10 ans',
  'Not tracked': 'Non suivi', 'None': 'Aucun',
  'Net-zero target': 'Objectif zéro net',
  ' pinned to comparison, ': ' épinglé à la comparaison, ',
  ' unpinned, ': ' retiré, ',
  'Selected ': 'Sélectionné : ',
  'Your comparison, 1950–{y}': 'Votre comparaison, 1950–{y}',
  'Who has driven the rise, 1950–{y}': 'Qui a porté la hausse, 1950–{y}',
  'Annual territorial CO₂ emissions for your pinned countries.':
    'Émissions territoriales annuelles de CO₂ de vos pays épinglés.',
  'Annual territorial CO₂ emissions for the six largest current emitters.':
    'Émissions territoriales annuelles de CO₂ des six premiers émetteurs actuels.',
  'Dashed: a 1.5°C-consistent reference — straight-line decline to net zero by {y}, the global IPCC benchmark applied uniformly, not a national pledge.':
    'Pointillé : une référence compatible 1,5 °C — baisse linéaire jusqu’au zéro net en {y}, le repère mondial du GIEC appliqué uniformément, pas un engagement national.',
  '1.5°C-aligned path → net zero {y}': 'Trajectoire alignée 1,5 °C → zéro net {y}',
  '1.5°C-aligned path': 'Trajectoire alignée 1,5 °C',
  'No emissions history available for the pinned countries.':
    'Pas d’historique d’émissions pour les pays épinglés.',
  'View as table': 'Voir en tableau', 'View as chart': 'Voir en graphique',
  'Year': 'Année',
  'Rio': 'Rio', 'Kyoto': 'Kyoto', 'Kyoto in force': 'Kyoto en vigueur', 'Paris': 'Paris', 'NDCs due': 'Premières CDN',
  'UNFCCC adopted at the Rio Earth Summit': 'La CCNUCC est adoptée au Sommet de Rio',
  'Kyoto Protocol adopted': 'Adoption du protocole de Kyoto',
  'Kyoto Protocol enters into force': 'Le protocole de Kyoto entre en vigueur',
  'Paris Agreement adopted': 'Adoption de l’accord de Paris',
  'First round of Paris NDCs due': 'Échéance de la première série de CDN de Paris',
  'NDC': 'CDN', '2060 pledge': 'Cap 2060', 'Exits Kyoto': 'Quitte Kyoto',
  'Rejoins Paris': 'Rejoint Paris', 'Exits Paris': 'Quitte Paris',
  '2070 pledge': 'Cap 2070', 'Joins Paris': 'Rejoint Paris',
  '2050 pledge': 'Cap 2050', '2045 law': 'Loi 2045', 'Unratified': 'Non ratifié',
  '2050 law': 'Loi 2050', 'Ratifies Paris': 'Ratifie Paris',
  'Climate law': 'Loi climat', 'Climate act': 'Loi climat',
  'Paris NDC: peak CO2 around 2030': 'CDN de Paris : pic de CO₂ vers 2030',
  'Pledges carbon neutrality by 2060': 'Promet la neutralité carbone pour 2060',
  'Rejects Kyoto Protocol ratification': 'Refuse de ratifier le protocole de Kyoto',
  'Rejoins the Paris Agreement': 'Rejoint l’accord de Paris',
  'Withdraws from the Paris Agreement again': 'Se retire de nouveau de l’accord de Paris',
  'Pledges net zero by 2070 at COP26': 'Promet le zéro net pour 2070 à la COP26',
  'Formally accepts the Paris Agreement': 'Accepte formellement l’accord de Paris',
  'Announces 2060 net-zero goal': 'Annonce un objectif zéro net pour 2060',
  'Pledges net zero by 2050': 'Promet le zéro net pour 2050',
  'Climate law tightened: net zero by 2045': 'Loi climat renforcée : zéro net en 2045',
  'Signs but never ratifies the Paris Agreement': 'Signe mais ne ratifie jamais l’accord de Paris',
  'Pledges net zero by 2060': 'Promet le zéro net pour 2060',
  'Carbon-neutrality act: net zero by 2050': 'Loi de neutralité carbone : zéro net en 2050',
  'Withdraws from the Kyoto Protocol': 'Se retire du protocole de Kyoto',
  'Net-zero accountability act: 2050 in law': 'Loi de responsabilité zéro net : 2050 dans la loi',
  'Ratifies Paris; announces 2053 net-zero goal': 'Ratifie Paris ; annonce le zéro net pour 2053',
  'Ratifies the Paris Agreement': 'Ratifie l’accord de Paris',
  'Brings neutrality pledge forward to 2050': 'Avance son objectif de neutralité à 2050',
  'General law on climate change enacted': 'Promulgue sa loi générale sur le changement climatique',
  'Climate Change Act signed into law': 'Promulgation de la loi sur le changement climatique',
  'Climate Change Act — first binding national carbon budget law': 'Climate Change Act : première loi nationale contraignante de budgets carbone',
  'Net zero by 2050 written into law': 'Zéro net en 2050 inscrit dans la loi',
  'Climate Change Act: 43% cut by 2030, net zero 2050': 'Loi climat : −43 % en 2030, zéro net en 2050',
  'Who bears responsibility': 'Qui porte la responsabilité',
  'Historical emissions, grouped by World Bank income classification — population share alongside share of all industrial-era CO₂.':
    'Émissions historiques par groupes de revenu de la Banque mondiale : part de la population face à la part du CO₂ de l’ère industrielle.',
  '<span class="sw" style="background:var(--cat-1)"></span>Share of world population':
    '<span class="sw" style="background:var(--cat-1)"></span>Part de la population mondiale',
  '<span class="sw" style="background:var(--cat-2)"></span>Share of cumulative CO₂ since 1750':
    '<span class="sw" style="background:var(--cat-2)"></span>Part du CO₂ cumulé depuis 1750',
  'Emissions by sector, {y}': 'Émissions par secteur, {y}',
  'All greenhouse gases in CO₂-equivalents — the lens that makes agriculture and waste visible. Globally: energy {e}%, agriculture {a}%, industrial processes {i}%, waste {w}%. Rows follow your pinned or selected countries.':
    'Tous les gaz à effet de serre en équivalent CO₂ — la focale qui rend visibles l’agriculture et les déchets. Au niveau mondial : énergie {e} %, agriculture {a} %, procédés industriels {i} %, déchets {w} %. Les lignes suivent vos pays épinglés ou sélectionnés.',
  'Source: Climate Watch via Our World in Data, {y}, all gases as CO₂e. “Energy” bundles all fuel combustion — power, transport, buildings, manufacturing, fugitive and bunker fuels — so “industrial processes” covers only non-energy emissions such as cement chemistry. Land use & forestry can be negative: a net sink, drawn left of the axis. Sector data lags the rest of the dashboard by a year and is unavailable for some small territories.':
    'Source : Climate Watch via Our World in Data, {y}, tous gaz en CO₂e. « Énergie » regroupe toute la combustion — électricité, transports, bâtiments, industrie, émissions fugitives et soutes —, si bien que « procédés industriels » ne couvre que les émissions non énergétiques comme la chimie du ciment. L’usage des terres peut être négatif : un puits net, tracé à gauche de l’axe. Ces données ont un an de retard sur le reste du tableau de bord et manquent pour quelques petits territoires.',
  'Energy': 'Énergie', 'Industrial processes': 'Procédés industriels',
  'Agriculture': 'Agriculture', 'Waste': 'Déchets', 'Land use & forestry': 'Usage des terres et forêts',
  'No sector data for the current countries.': 'Pas de données sectorielles pour ces pays.',
  'No sector data': 'Pas de données sectorielles',
  'Net sink': 'Puits net',
  '% of gross emissions': ' % des émissions brutes',
  'Net total, all sectors': 'Total net, tous secteurs',
  'Net total': 'Total net',
  '{c}, state by state — {y}': '{c}, État par État — {y}',
  'Energy-related CO₂ from fossil-fuel combustion only; excludes industrial process emissions and land use.':
    'CO₂ énergétique issu de la seule combustion fossile ; hors procédés industriels et usage des terres.',
  'Bars are each state’s share of the state total; the pill is the 10-year change ({y0}–{y1}).':
    'Les barres donnent la part de chaque État dans le total ; la pastille, l’évolution sur 10 ans ({y0}–{y1}).',
  'Source: {s} ({u}). The {n} states sum to {tot} in {y} on this scope; the national figure elsewhere on this page ({nat}) is all CO₂ in {ly}, so the two are not directly comparable.':
    'Source : {s} ({u}). Les {n} États totalisent {tot} en {y} sur ce périmètre ; le chiffre national ailleurs sur cette page ({nat}) est l’ensemble du CO₂ en {ly} — les deux ne sont donc pas directement comparables.',
  'Show top {n}': 'Voir le top {n}', 'Show all {n}': 'Voir les {n}',
  'Share of the state total': 'Part du total des États',
  'Change vs {y}': 'Évolution depuis {y}',
  'Targets vs. trajectory': 'Objectifs contre trajectoire',
  'The largest current emitters: which way their emissions are actually moving, next to their stated net-zero commitment.':
    'Les premiers émetteurs actuels : la direction réelle de leurs émissions, à côté de leur engagement zéro net déclaré.',
  'Trend is the compound annual growth rate of territorial CO₂ over <span id="targets-trend-range">2014–2024</span>. Net-zero targets: <a href="https://eciu.net/netzerotracker" target="_blank" rel="noopener">Energy &amp; Climate Intelligence Unit Net Zero Tracker</a>; the United States is shown as having no active national target following its 2025 withdrawal from the Paris Agreement.':
    'La tendance est le taux de croissance annuel composé du CO₂ territorial sur <span id="targets-trend-range">2014–2024</span>. Objectifs zéro net : <a href="https://eciu.net/netzerotracker" target="_blank" rel="noopener">Net Zero Tracker de l’Energy &amp; Climate Intelligence Unit</a> ; les États-Unis apparaissent sans objectif national actif depuis leur retrait de l’accord de Paris en 2025.',
  'In law': 'Dans la loi', 'In policy document': 'Document de politique',
  'Declaration / pledge': 'Déclaration / promesse', 'No target': 'Aucun objectif',
  'No active target (withdrew from Paris Agreement, 2025)': 'Aucun objectif actif (retrait de l’accord de Paris, 2025)',
  'What if? — a reduction scenario': 'Et si… ? — un scénario de réduction',
  'Pick a group of emitters and a reduction target. See the cumulative CO₂ it would avoid, and roughly how much warming that represents.':
    'Choisissez un groupe d’émetteurs et un objectif de réduction. Voyez le CO₂ cumulé évité et, en ordre de grandeur, le réchauffement que cela représente.',
  'Who cuts emissions': 'Qui réduit ses émissions',
  'Reduction by target year': 'Réduction à l’année cible',
  'Target year': 'Année cible',
  'Top 6 emitters': 'Les 6 premiers émetteurs',
  'Pinned countries': 'Pays épinglés',
  'All countries (global)': 'Tous les pays (monde)',
  'No emissions history available for this group of countries.': 'Pas d’historique d’émissions pour ce groupe de pays.',
  'Emissions in {y} — {g}': 'Émissions en {y} — {g}',
  'vs. {v} /yr held flat from {y}': 'contre {v}/an maintenus depuis {y}',
  'Cumulative CO₂ avoided by {y}': 'CO₂ cumulé évité d’ici {y}',
  'vs. holding at {y} levels the whole way': 'par rapport au maintien des niveaux de {y}',
  'Illustrative avoided warming': 'Réchauffement évité (illustratif)',
  'likely range {a}–{b}': 'fourchette probable {a}–{b}',
  'Against the 1.5°C path in {y}': 'Face à la trajectoire 1,5 °C en {y}',
  'On track': 'Sur la trajectoire',
  'at or below the aligned level of {v} /yr': 'au niveau aligné de {v}/an ou en dessous',
  'above the aligned level of {v} /yr': 'au-dessus du niveau aligné de {v}/an',
  'Actual, {a}–{b}': 'Réel, {a}–{b}',
  'If unchanged': 'Sans changement',
  'With this cut': 'Avec cette réduction',
  '1.5°C-aligned → net zero {y}': 'Aligné 1,5 °C → zéro net {y}',
  'Portfolio overlay': 'Superposition de portefeuille',
  "Map a portfolio's country weights onto emissions, sector, and trajectory exposure — no separate spreadsheet. Holdings stay in this browser; nothing is uploaded.":
    'Projetez les poids pays d’un portefeuille sur son exposition aux émissions, aux secteurs et aux trajectoires — sans tableur séparé. Les positions restent dans ce navigateur ; rien n’est envoyé.',
  'Apply': 'Appliquer', 'Load CSV…': 'Charger un CSV…', 'Load sample': 'Charger l’exemple',
  'Clear': 'Effacer', 'Edit holdings': 'Modifier les positions',
  'One holding per line: country and weight.': 'Une position par ligne : pays et poids.',
  'Weights can be % or amounts — they are normalized. Comments start with #.':
    'Les poids peuvent être des % ou des montants : ils sont normalisés. Les commentaires commencent par #.',
  'No holdings recognized — use one line per holding: country name or ISO code, then a weight.':
    'Aucune position reconnue — une ligne par position : nom du pays ou code ISO, puis un poids.',
  '{n} countries matched': '{n} pays reconnus',
  'not recognized:': 'non reconnus :',
  'Weighted CO₂ per person': 'CO₂ pondéré par personne',
  '{x}× the world average of {v} t': '{x}× la moyenne mondiale de {v} t',
  'Historical responsibility tilt': 'Biais de responsabilité historique',
  'exposure-weighted share of cumulative CO₂ ÷ population share':
    'part du CO₂ cumulé pondérée par l’exposition ÷ part de la population',
  'Weight where emissions rise': 'Poids où les émissions montent',
  'countries with a positive 10-yr CO₂ trend': 'pays à tendance CO₂ positive sur 10 ans',
  'Largest exposure': 'Première exposition',
  '{p}% of weight · {n} countries': '{p} % du poids · {n} pays',
  'Sector exposure of underlying emissions': 'Exposition sectorielle des émissions sous-jacentes',
  'based on {p}% of weight': 'sur {p} % du poids',
  'No sector data for these countries.': 'Pas de données sectorielles pour ces pays.',
  'Country exposure': 'Exposition par pays',
  '+{n} more countries': '+{n} autres pays',
  'Pin top {n} to compare': 'Épingler le top {n} pour comparer',
  'Where the weight sits': 'Où se trouve le poids',
  '{p}% of weight': '{p} % du poids',
  "Country-level attribution: each holding is mapped to its country's territorial emissions profile — a screening view, not issuer-level carbon accounting. Sector mix weights each country's share of gross CO₂e emissions (Climate Watch); net land-use sinks are excluded from the mix. Trajectory is the 10-year CAGR of territorial CO₂.":
    'Attribution au niveau pays : chaque position est rattachée au profil d’émissions territoriales de son pays — une vue de sélection, pas une comptabilité carbone par émetteur. Le mix sectoriel pondère la part de chaque pays dans les émissions brutes de CO₂e (Climate Watch) ; les puits nets d’usage des terres en sont exclus. La trajectoire est le TCAC sur 10 ans du CO₂ territorial.',
  'Data through {y}': 'Données jusqu’en {y}',
  'All countries': 'Tous les pays',
  'rank #{r} of {n}': 'rang {r} sur {n}',
  'vs.': 'vs',
  'Data: Global Carbon Project via Our World in Data, owid/co2-data (CC BY 4.0)':
    'Données : Global Carbon Project via Our World in Data, owid/co2-data (CC BY 4.0)',
  'refreshed': 'actualisé',
  'You can also right-click the preview to copy or save it.':
    'Vous pouvez aussi faire un clic droit sur l’aperçu pour le copier ou l’enregistrer.',
  'Copy image': 'Copier l’image', 'Download PNG': 'Télécharger le PNG', 'Close': 'Fermer',
  'Country one-pager': 'Fiche pays',
  'Your browser’s print dialog opens — choose “Save as PDF”.':
    'La boîte d’impression du navigateur s’ouvre : choisissez « Enregistrer en PDF ».',
  'Print / Save as PDF': 'Imprimer / Enregistrer en PDF',
  'Country climate profile': 'Profil climatique du pays',
  'Generated': 'Généré le',
  'No tracked national net-zero target': 'Aucun objectif national zéro net suivi',
  'Net-zero target: ': 'Objectif zéro net : ',
  'CO₂ emissions, {y}': 'Émissions de CO₂, {y}',
  'of {v} worldwide': 'sur {v} dans le monde',
  'world average {v} t': 'moyenne mondiale {v} t',
  'rank #{r}': 'rang {r}',
  'rank #{r} all-time': 'rang {r} historique',
  'Share of observed warming': 'Part du réchauffement observé',
  'of warming from all greenhouse gases': 'du réchauffement dû à tous les gaz',
  'Fair-share ratio': 'Ratio de juste part',
  'of a population-proportional share of historical CO₂': 'd’une part du CO₂ historique proportionnelle à la population',
  'Territorial CO₂, 1950–{y}, with a 1.5°C-aligned reference to {z} (Mt/yr)':
    'CO₂ territorial, 1950–{y}, avec une référence alignée 1,5 °C jusqu’en {z} (Mt/an)',
  'Territorial CO₂, 1950–{y} (Mt/yr)': 'CO₂ territorial, 1950–{y} (Mt/an)',
  'In {y}, {c} emitted <b>{v}</b> of CO₂ — <b>{p}</b> of the world total{rank}{pc}.':
    'En {y}, {c} a émis <b>{v}</b> de CO₂ — <b>{p}</b> du total mondial{rank}{pc}.',
  ', ranking <b>#{r}</b> of {n} countries': ', au rang <b>{r}</b> sur {n} pays',
  ', at <b>{v} t</b> per person against a world average of {w} t': ', soit <b>{v} t</b> par personne contre une moyenne mondiale de {w} t',
  'Over {y0}–{y1}, emissions {verb} at <b>{g}%/yr</b>. Cumulatively since 1750 it accounts for <b>{cum}</b>{share}.':
    'Entre {y0} et {y1}, les émissions ont {verb} de <b>{g} %/an</b>. Depuis 1750, le pays cumule <b>{cum}</b>{share}.',
  'fell': 'baissé', 'rose': 'augmenté',
  ' — <b>{p}%</b> of all industrial-era CO₂': ' — soit <b>{p} %</b> de tout le CO₂ de l’ère industrielle',
  'A 1.5°C-consistent path — the global IPCC benchmark applied uniformly, not a national pledge — implies cutting about <b>{r}%</b> of the {y} level each year, reaching net-zero CO₂ by <b>{z}</b>. {nz}.':
    'Une trajectoire compatible 1,5 °C — le repère mondial du GIEC appliqué uniformément, pas un engagement national — implique de réduire chaque année d’environ <b>{r} %</b> du niveau de {y}, pour atteindre le zéro net en <b>{z}</b>. {nz}.',
  'Emissions by sector, {y} — all greenhouse gases, share of gross CO₂e':
    'Émissions par secteur, {y} — tous gaz, part du CO₂e brut',
  'Land use & forestry is a net sink of {v} CO₂e, excluded from the shares above.':
    'L’usage des terres et les forêts forment un puits net de {v} CO₂e, exclu des parts ci-dessus.',
  'Sources: Global Carbon Project via Our World in Data, owid/co2-data (CC BY 4.0); sector data Climate Watch via OWID ({y}, CO₂e); net-zero status ECIU Net Zero Tracker. Territorial production emissions; the 1.5°C reference is the IPCC SR1.5 global benchmark applied uniformly.':
    'Sources : Global Carbon Project via Our World in Data, owid/co2-data (CC BY 4.0) ; secteurs : Climate Watch via OWID ({y}, CO₂e) ; statut zéro net : Net Zero Tracker de l’ECIU. Émissions territoriales de production ; la référence 1,5 °C est le repère mondial du GIEC SR1.5 appliqué uniformément.',
  'Interactive version:': 'Version interactive :',
  'One-pager ready for ': 'Fiche pays prête : ',
  'One number, one gap': 'Un chiffre, un écart',
  'In {y} the world emitted <b>{v}</b> of CO₂ — about <b>{pc} t</b> per person on average. That average hides an enormous gap in who actually caused it. This tour walks through the dashboard below.':
    'En {y}, le monde a émis <b>{v}</b> de CO₂ — environ <b>{pc} t</b> par personne en moyenne. Cette moyenne cache un écart énorme sur qui en est réellement la cause. Cette visite parcourt le tableau de bord ci-dessous.',
  'Today’s three biggest emitters': 'Les trois premiers émetteurs d’aujourd’hui',
  '<b>{names}</b> alone account for <b>{p}%</b> of this year’s emissions. The map is set to total CO₂ — darker means more.':
    '<b>{names}</b> représentent à eux seuls <b>{p} %</b> des émissions de l’année. La carte affiche le CO₂ total — plus c’est sombre, plus c’est élevé.',
  'The atmosphere remembers': 'L’atmosphère se souvient',
  'Switch to <b>cumulative</b> emissions since 1750 and the map redraws. Countries that industrialized first carry more than two centuries of accumulated CO₂ — a weight today’s fast-growing emitters haven’t caught up to yet.':
    'Passez aux émissions <b>cumulées</b> depuis 1750 et la carte se redessine. Les pays industrialisés les premiers portent plus de deux siècles de CO₂ accumulé — un poids que les émetteurs en forte croissance n’ont pas encore rattrapé.',
  'A fairer lens': 'Une focale plus juste',
  'This map divides each country’s share of historical CO₂ by its share of world population. Blue countries emitted less than their population share; red countries emitted more. <b>High-income</b> countries hold <b>{hp}%</b> of people but <b>{hc}%</b> of cumulative CO₂. <b>Low-income</b> countries hold <b>{lp}%</b> of people and just <b>{lc}%</b>.':
    'Cette carte divise la part de CO₂ historique de chaque pays par sa part de la population mondiale. Les pays bleus ont émis moins que leur part ; les rouges, plus. Les pays à <b>revenu élevé</b> comptent <b>{hp} %</b> de la population mais <b>{hc} %</b> du CO₂ cumulé. Les pays à <b>faible revenu</b>, <b>{lp} %</b> de la population et seulement <b>{lc} %</b>.',
  'Pin countries side by side': 'Épinglez des pays côte à côte',
  'Pin up to <b>4</b> countries — from the compare tray, a shift-click on the map, or the ☆ on any row — and every chart follows: map outlines, the ranking, this side-by-side card, the trend lines, even the reduction scenario. Here are today’s three biggest emitters.':
    'Épinglez jusqu’à <b>4</b> pays — depuis le bandeau de comparaison, un Maj+clic sur la carte ou l’☆ d’une ligne — et tous les graphiques suivent : contours de la carte, classement, cette carte côte à côte, les tendances, même le scénario de réduction. Voici les trois premiers émetteurs d’aujourd’hui.',
  'Where the emissions come from': 'D’où viennent les émissions',
  'Counting <b>every greenhouse gas</b>, not just CO₂, reveals structure: globally about three-quarters is energy, but Brazil’s footprint is mostly <b>agriculture and land use</b>, while China’s forests are a net carbon <b>sink</b> — drawn left of the axis. The rows follow your pinned countries.':
    'Compter <b>tous les gaz à effet de serre</b>, pas seulement le CO₂, révèle la structure : au niveau mondial, environ trois quarts relèvent de l’énergie, mais l’empreinte du Brésil vient surtout de <b>l’agriculture et de l’usage des terres</b>, tandis que les forêts de la Chine forment un <b>puits</b> net — tracé à gauche de l’axe. Les lignes suivent vos pays épinglés.',
  'Where the pledges stand': 'Où en sont les promesses',
  'Of the {n} largest emitters tracked here, <b>{law}</b> have a net-zero target written into law and <b>{none}</b> — including the United States, since its 2025 withdrawal from the Paris Agreement — currently have no active national target at all. A target is not a trajectory: check the trend column next to it.':
    'Sur les {n} premiers émetteurs suivis ici, <b>{law}</b> ont un objectif zéro net inscrit dans la loi et <b>{none}</b> — dont les États-Unis, depuis leur retrait de l’accord de Paris en 2025 — n’ont aujourd’hui aucun objectif national actif. Un objectif n’est pas une trajectoire : regardez la colonne de tendance juste à côté.',
  'Try bending the curve': 'Essayez d’infléchir la courbe',
  'The panel below turns the picture into a tool: pick a group of emitters and a reduction target, and see roughly how much warming that choice would avoid, using the IPCC’s standard climate-response estimate.':
    'Le panneau ci-dessous transforme l’image en outil : choisissez un groupe d’émetteurs et un objectif de réduction, et voyez en ordre de grandeur le réchauffement évité, selon l’estimation standard de réponse climatique du GIEC.',
  'Overlay a portfolio': 'Superposez un portefeuille',
  'Paste a holdings list — country and weight, straight from a spreadsheet — and see its climate exposure: weighted footprint, sector mix, and where emissions are still rising. Holdings never leave this browser. Try <b>Load sample</b>.':
    'Collez une liste de positions — pays et poids, tout droit d’un tableur — et voyez son exposition climatique : empreinte pondérée, mix sectoriel et où les émissions montent encore. Les positions ne quittent jamais ce navigateur. Essayez <b>Charger l’exemple</b>.',
  'Make it yours': 'Faites-en votre outil',
  '<b>☆ Saved views</b> stars any metric + country + scenario combination and brings it back in one click, with a short link. <b>Share &amp; reuse</b> exports the current view as a citation-ready PNG sized for a deck or a social post. Your pins and selection from before this tour are restored when you close it.':
    '<b>☆ Vues enregistrées</b> mémorise toute combinaison métrique + pays + scénario et la restaure en un clic, avec un lien court. <b>Partager et réutiliser</b> exporte la vue actuelle en PNG citable au format présentation ou réseau social. Vos épingles et votre sélection d’avant la visite sont restaurées à la fermeture.',
  'Back': 'Retour', 'Next': 'Suivant', 'Done': 'Terminé',
  'Data: Global Carbon Project &amp; Our World in Data, <a href="https://github.com/owid/co2-data" target="_blank" rel="noopener">owid/co2-data</a> (CC BY 4.0), <span id="data-release">2024 release</span>. Country boundaries are simplified for display; a handful of small island states and territories aren’t resolved on the map but remain in the table below. “Share of warming” is each country’s share of the observed global temperature increase attributed to greenhouse gas emissions.':
    'Données : Global Carbon Project et Our World in Data, <a href="https://github.com/owid/co2-data" target="_blank" rel="noopener">owid/co2-data</a> (CC BY 4.0), <span id="data-release">édition 2024</span>. Les frontières sont simplifiées pour l’affichage ; quelques petits États insulaires et territoires n’apparaissent pas sur la carte mais restent dans le tableau. « Part du réchauffement » : la part de chaque pays dans la hausse observée de la température mondiale attribuée aux gaz à effet de serre.',
  'Income groups follow the World Bank classification as compiled by Our World in Data. Built as an interactive reference, not a forecast — figures are territorial production emissions unless noted.':
    'Les groupes de revenu suivent la classification de la Banque mondiale compilée par Our World in Data. Conçu comme une référence interactive, pas une prévision — sauf mention, les chiffres sont des émissions territoriales de production.',
  'data through {y}': 'données jusqu’en {y}',
  'Guided tour': 'Visite guidée',
  'Simplified, illustrative model — not a forecast. Assumes the selected countries\' emissions would otherwise hold flat at <span id="scenario-base-year">2024</span> levels, declining in a straight line to the target year and staying flat after. Avoided warming applies IPCC AR6’s transient climate response to cumulative emissions (TCRE): a likely range of 0.27–0.63°C per 1,000 Gt CO₂, central estimate ≈0.45°C. The dashed 1.5°C-aligned reference is the global IPCC benchmark — a straight-line decline to net-zero CO₂ by 2050 — applied uniformly to the selected group; equity-based national pathways differ. Real trajectories also depend on non-CO₂ gases, carbon-cycle feedbacks, and what every other country does.':
    'Modèle simplifié et illustratif — pas une prévision. Suppose que les émissions des pays choisis resteraient aux niveaux de <span id="scenario-base-year">2024</span>, baissant en ligne droite jusqu’à l’année cible puis restant stables. Le réchauffement évité applique la réponse climatique transitoire aux émissions cumulées (TCRE) du GIEC AR6 : fourchette probable de 0,27–0,63 °C par 1 000 Gt de CO₂, estimation centrale ≈ 0,45 °C. La référence pointillée alignée 1,5 °C est le repère mondial du GIEC — baisse linéaire vers le zéro net en 2050 — appliqué uniformément au groupe ; les trajectoires nationales fondées sur l’équité diffèrent. Les trajectoires réelles dépendent aussi des autres gaz, des rétroactions du cycle du carbone et de l’action de tous les autres pays.'
}
} };
