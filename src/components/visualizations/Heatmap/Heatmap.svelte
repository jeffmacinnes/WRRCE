<script>
  import { LayerCake, Svg, Html } from "layercake";
  import { flatRollup, extent, ascending, scaleBand, scaleLinear } from "d3";
  import { getYearlyRecsBySplit } from "./utils";
  import { filterOpts, filteredData, activeFilters } from "$stores/dataStores";
  import { color } from "$data/variables.json";

  import HistogramSvg from "./Histogram.Svg.svelte";
  import HeatmapSvg from "./Heatmap.Svg.svelte";
  import HeatmapYLabels from "./Heatmap.YLabels.svelte";
  import HeatmapXLabels from "./Heatmap.XLabels.svelte";
  import Legend from "$components/common/Legend.svelte";
  import SplitByControls from "$components/common/SplitByControls.svelte";

  // --- Shared Vis Props
  let years;
  $: {
    if ($activeFilters.findIndex((d) => d.type === "year") !== -1) {
      let yearLims = $activeFilters.find((d) => d.type === "year").opt;
      years = [...Array(yearLims[1] - yearLims[0] + 1)].map((_, i) => yearLims[0] + i);
    } else {
      years = [...Array(10)].map((_, i) => 2007 + i);
    }
  }

  const padding = { top: 30, bottom: 30, left: 30, right: 150 };
  const xScale = scaleBand().paddingInner([0.1]).paddingOuter(0.1).round(true);

  // --- Split By Var
  let splitBy = $filterOpts.find((d) => d.display === "Compliance Status");
  const handleSetSplitBy = (e) => {
    // use the levels of the splitby var from the filter options list
    splitBy = $filterOpts.find((d) => d.display === e.detail);
  };

  // --- Data prop
  // convert filtered data to array of counts by year
  $: histData = flatRollup(
    $filteredData,
    (v) => v.length,
    (d) => d.year
  )
    .map((d) => ({ year: d[0], nRecs: d[1] }))
    .filter((d) => years.includes(d.year))
    .sort((a, b) => ascending(a.year, b.year));

  $: heatData = getYearlyRecsBySplit($filteredData, years, splitBy);

  // --- Legend, colorScale
  $: colorScale = scaleLinear()
    .domain(extent(heatData, (d) => d.nRecs))
    .range([color.white, color.a1]);

  // ---- DEBUGGING ----
  // $: console.log("years", years);
  // $: console.log("heatdata", heatData);
</script>

<div class="temporal-container">
  <!-- HISTOGRAM OF TOTALS BY YEAR -->
  <div class="histogram-container">
    <LayerCake
      padding={{ ...padding, bottom: 0, top: 20 }}
      data={histData}
      x="year"
      y="nRecs"
      xDomain={years}
      yDomain={[0, null]}
      yNice={true}
      {xScale}
    >
      <Svg>
        <HistogramSvg />
      </Svg>
    </LayerCake>
  </div>

  <div class="heatmap-container">
    <LayerCake
      padding={{ ...padding, top: 25 }}
      data={heatData}
      x="year"
      y="display"
      {xScale}
      xDomain={years}
      yScale={scaleBand().paddingInner([0.1]).paddingOuter(0.1).round(true)}
      yDomain={splitBy.opts.map((d) => d.display)}
    >
      <Html>
        <HeatmapXLabels />
        <HeatmapYLabels />
      </Html>
      <Svg>
        <HeatmapSvg {colorScale} {splitBy} />
      </Svg>
    </LayerCake>
  </div>
  <div style:width="500px" style:height="60px">
    <Legend {colorScale} width={500} height={60} nTicks={6} title="# of Recommendations" />
  </div>
  <SplitByControls currentSplitVar={splitBy} on:setSplitVar={handleSetSplitBy} />
</div>

<style lang="scss">
  .temporal-container {
    width: 100%;
    height: 100%;
    max-width: 1000px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: white;
    overflow: hidden;
  }

  .histogram-container {
    width: 100%;
    height: 200px;
    /* border: solid 1px red; */
  }

  .heatmap-container {
    // border: solid 1px red;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
  }
</style>
