<script>
  import { LayerCake, Svg, Html } from "layercake";
  import { scaleBand } from "d3";
  import { getNumRecsBySplit } from "./utils";

  import SplitBarChart from "./SplitBar.Chart.svelte";
  import SplitBarChartTitle from "./SplitBar.ChartTitle.svelte";
  import SplitBarXLabels from "./SplitBar.XLabels.svelte";

  export let data;
  export let institution;
  export let splitBy;
  export let showXLabels;

  // get recommendation counts by 'splitByVar' on background data to use as layercake scale extents
  $: bgNRecs = getNumRecsBySplit(data, splitBy);

  let titleWidth = 200;
</script>

<LayerCake
  padding={{ top: 30, bottom: 30, left: titleWidth, right: 120 }}
  {data}
  x="display"
  y="nRecs"
  xDomain={splitBy.opts.map((d) => d.display)}
  yDomain={[0, null]}
  yNice={true}
  xScale={scaleBand().paddingInner([0.1]).paddingOuter(0.1).round(true)}
  flatData={bgNRecs}
>
  <Svg>
    <SplitBarChart {institution} {splitBy} />
  </Svg>
  <Html>
    <SplitBarChartTitle {titleWidth} {institution} />
  </Html>

  {#if showXLabels}
    <Html>
      <SplitBarXLabels />
    </Html>
  {/if}
</LayerCake>
