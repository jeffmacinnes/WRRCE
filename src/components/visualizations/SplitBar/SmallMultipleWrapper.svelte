<script>
  import { LayerCake, Svg } from "layercake";
  import { scaleBand } from "d3";
  import { getNumRecsBySplit } from "./utils";

  import SplitBarChart from "./SplitBar.Chart.svelte";

  export let data;
  export let splitBy;

  let { institution, instData, bgData } = data;

  // get recommendation counts by 'splitByVar'
  $: bgNRecs = getNumRecsBySplit(bgData, splitBy); // passed to layercake so scales are set on larger of the two datasets
  $: instNRecs = getNumRecsBySplit(instData, splitBy); // passed to splitBar chart cmp
</script>

<LayerCake
  data={bgNRecs}
  xScale={scaleBand().paddingInner([0.02]).round(true)}
  padding={{ top: 10, bottom: 10, left: 150, right: 150 }}
>
  <Svg>
    <SplitBarChart {institution} {instData} />
  </Svg>
</LayerCake>
