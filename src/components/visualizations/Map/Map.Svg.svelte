<script>
  import { getContext } from "svelte";
  import { geoPath } from "d3-geo";
  import { geoAzimuthalEqualArea } from "d3";
  import { raise } from "layercake";

  const { data, width, height } = getContext("LayerCake");

  // projection and geo path
  $: projection = geoAzimuthalEqualArea()
    .rotate([-10.0, -52.0])
    .translate([$width / 2, $height / 2])
    //.center([x,y]) // use this to reposition the map based on current countries
    .scale(1000)
    .precision(0.1);
  // .fitSize([$width, $height], $data);

  $: geoPathFn = geoPath(projection);

  $: console.log("map svg", $data);
</script>

<g class="map-group">
  {#each $data.features as feature}
    <path
      class="feature-path"
      fill="#000"
      stroke="#ccc"
      stroke-width="1px"
      d={geoPathFn(feature)}
    />
  {/each}
</g>
