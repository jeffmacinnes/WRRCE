<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { scaleLinear, extent, color as d3Color } from "d3";
  import { color } from "$data/variables.json";
  import ColorContrastChecker from "color-contrast-checker";

  export let colorScale;

  let ccc = new ColorContrastChecker();

  const { data, width, height, xScale, yScale, yRange } = getContext("LayerCake");

  // $: colorScale = scaleLinear()
  //   .domain(extent($data, (d) => d.nRecs))
  //   .range([color.white, color.a1]);

  $: yTicks = $yScale.domain();
</script>

<g class="heatmap">
  {#each $data as d, i}
    <rect
      class="cell"
      data-id={i}
      x={$xScale(d.year)}
      y={$yScale(d.display)}
      rx={0}
      width={$xScale.bandwidth()}
      height={$yScale.bandwidth()}
      fill={colorScale(d.nRecs)}
      stroke={color.white}
    />
    <!-- <circle
      cx={$xScale(d.year) + $xScale.bandwidth() / 2}
      cy={$yScale(d.display) + $yScale.bandwidth() / 2}
      r={15}
      fill={color.white}
    /> -->
    <!-- <text
      x={$xScale(d.year) + $xScale.bandwidth() / 2}
      y={$yScale(d.display) + $yScale.bandwidth() / 2}
      text-anchor="middle"
      dominant-baseline="middle"
      fill={ccc.isLevelCustom(d3Color(colorScale(d.nRecs)).formatHex(), color.g4, 1.9)
        ? color.g4
        : color.white}>{d.nRecs}</text
    > -->
  {/each}
</g>

<style lang="scss">
  .cell {
    cursor: pointer;

    &:hover {
      stroke: black;
    }
  }
</style>
