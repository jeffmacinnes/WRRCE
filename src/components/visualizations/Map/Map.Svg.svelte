<script>
  import { getContext, createEventDispatcher, onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { tooltip } from "$actions/tooltip";
  import { geoPath } from "d3-geo";
  import * as d3 from "d3";
  import textures from "textures";
  import { raise } from "layercake";

  import MapTooltip from "$components/tooltips/MapTooltip.svelte";

  export let countryData;
  export let maxRecs;
  export let zoomLevel = 1;

  const dispatch = createEventDispatcher();
  const { data, width, height } = getContext("LayerCake");

  let node;

  // projection and geo path
  $: projection = d3
    .geoAzimuthalEqualArea()
    .rotate([-10.0, -52.0])
    .translate([$width / 2, $height / 2])
    .scale(1000)
    .precision(0.1);

  $: geoPathFn = geoPath(projection);

  $: features = $data.features.map((feature) => {
    let fill = "#e8e8e8";
    let match = countryData.find((d) => d.ccode === feature.properties.ccode);
    if (match) {
      fill = colorScale(match.nRecs);
    }
    feature.properties.fill = fill;

    // project centroid coordinates
    feature.properties.center = projection(feature.properties.centroid.coordinates);

    return feature;
  });

  // --- Fill Colors/Texture
  const landColor = "#e8e8e8";
  const texture = textures.lines().size(8).strokeWidth(1).stroke("#fff").background(landColor);
  $: colorScale = d3.scaleSequential().range(["#e8e8e8", "#288983"]).domain([0, maxRecs]);
  const getColor = (ccode) => {
    // return  the color of the country with the given ccode
    if (ccode === "370") return texture.url(); // No data on Belarus

    let match = countryData.find((d) => d.ccode === ccode);
    return match ? colorScale(match.nRecs) : landColor;
  };

  // --- Interactivity
  function handleMousemove(feature) {
    return function handleMousemoveFn(e) {
      raise(this);
      // When the element gets raised, it flashes 0,0 for a second so skip that
      if (e.layerX !== 0 && e.layerY !== 0) {
        dispatch("mousemove", { e, props: feature.properties });
      }
    };
  }

  const tweenedScale = tweened(1, { duration: 200, easing: cubicOut });
  $: tweenedScale.set(1 + zoomLevel * 0.33);

  $: scale = `scale(${$tweenedScale})`;
  let translate = "translate(0,0)";
  const zoomed = (event) => {
    let { x, y } = event.transform; // get x and y transform from the zoom event
    translate = `translate(${x}, ${y})`;
  };
  const zoom = d3.zoom().on("zoom", zoomed).scaleExtent([1, 1]);
  $: transform = `${translate} ${scale}`;

  onMount(() => {
    d3.select(node).call(texture);
    d3.select(node).call(zoom);
  });
</script>

<g bind:this={node} class="map-group" {transform}>
  {#each features as feature, i (i)}
    <!-- Country Outline -->
    <path
      use:tooltip={{
        component: MapTooltip,
        props: { feature: feature }
      }}
      class="feature-path"
      fill={getColor(feature.properties.ccode)}
      stroke="#fff"
      stroke-width="1px"
      d={geoPathFn(feature)}
      on:mousemove={handleMousemove(feature)}
    />
  {/each}
  <!-- 
  {#each features as feature (feature.id)}
    <circle
      class="feature-center"
      cx={feature.properties.center[0]}
      cy={feature.properties.center[1]}
      r={3}
      fill="red"
    />
    <text
      class="feature-center"
      x={feature.properties.center[0]}
      y={feature.properties.center[1]}
      text-anchor="middle"
      dominant-baseline="center">{feature.properties.name}</text
    >
  {/each} -->
</g>

<style lang="scss">
  .feature-path {
    cursor: pointer;

    &:hover {
      stroke: red;
    }
  }
</style>
