<script>
  import { LayerCake, Svg } from "layercake";
  import { scaleBand } from "d3";
  import { getNumRecsBySplit } from "./utils";

  import Chart from "./Chart.svelte";

  export let data;
  export let splitBy;

  let { institution, instData, bgData } = data;

  // get recommendation counts by 'splitByVar'
  $: nRecs = getNumRecsBySplit(bgData, splitBy);
  $: console.log("nRecs", nRecs);

  $: console.log("data", data);
  // $: console.log("split by", splitBy);
</script>

<LayerCake {data} padding={{ top: 10, bottom: 10, left: 150, right: 150 }}>
  <Svg>
    <Chart />
  </Svg>
</LayerCake>
