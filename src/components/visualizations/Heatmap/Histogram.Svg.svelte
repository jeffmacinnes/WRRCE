<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { color } from "$data/variables.json";

  const { data, xScale, xRange, yScale, yRange, width, height } = getContext("LayerCake");

  $: yTickVals = $yScale.ticks(2);
</script>

<!-- Y-Ticks -->
<g class="axes">
  {#each yTickVals as yTick}
    <line
      class="x-axis"
      x1={$xRange[0]}
      x2={$xRange[1]}
      y1={$yScale(yTick)}
      y2={$yScale(yTick)}
      stroke-width={1}
      stroke-dasharray={3}
      opacity={yTick === 0 ? 0 : 1}
    />
    <line
      class="x-axis"
      x1={$xRange[0]}
      x2={$xRange[1]}
      y1={$yScale(yTick)}
      y2={$yScale(yTick)}
      stroke-width={1}
      stroke-dasharray={3}
      opacity={yTick === 0 ? 0 : 1}
      stroke={color.g2}
    />
    <text
      class="tick-label"
      x={$xRange[1] + 8}
      y={$yScale(yTick)}
      text-anchor="start"
      dominant-baseline="middle">{yTick}</text
    >
  {/each}
</g>

<!-- Bars -->
<g>
  {#each $data as d, i}
    <rect
      class="bg-rect"
      data-id={i}
      x={$xScale(d.year)}
      y={$yScale(d.nRecs)}
      width={$xScale.bandwidth()}
      height={$yRange[0] - $yScale(d.nRecs)}
      fill={"#e8e8e8"}
    />
    <text
      class="nRecs-text"
      x={$xScale(d.year) + $xScale.bandwidth() / 2}
      y={$yScale(d.nRecs) - 5}
      text-anchor="middle"
      fill={color.g3}>{d.nRecs}</text
    >
  {/each}
  <text
    class="axis-label"
    text-anchor="start"
    transform={`translate(${$xRange[1] + 8}, ${$yScale(yTickVals.at(-1)) + 15})`}
    dominant-baseline="middle">Recommendations</text
  >
</g>

<!-- 0 - line -->
<g class="axes">
  <line
    class="x-axis"
    x1={$xRange[0]}
    x2={$xRange[1]}
    y1={$yScale(0)}
    y2={$yScale(0)}
    stroke-width={1}
    stroke="#000"
  />
</g>

<!-- Title -->
<g>
  <text
    class="title"
    text-anchor="start"
    transform={`translate(${$xRange[0]}, 0)`}
    dominant-baseline="middle">Total Recommendations By Year</text
  >
</g>

<style>
  .axes {
    stroke: var(--color-g3);
  }

  .nRecs-text {
    font-size: 12px;
  }

  .tick-label {
    font-size: 12px;
    stroke: none;
    fill: var(--color-g3);
  }

  .axis-label {
    font-size: 10px;
    text-transform: uppercase;
    stroke: none;
    fill: var(--color-g3);
  }

  .title {
    font-size: 10px;
    text-transform: uppercase;
    stroke: none;
    fill: var(--color-g3);
  }
</style>
