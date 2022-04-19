<script>
  import { getContext } from "svelte";
  import { getNumRecsBySplit } from "./utils";
  import { category } from "$data/variables.json";

  const { data, xScale, xRange, yScale, yRange } = getContext("LayerCake"); // get bg data from layercake
  export let institution;
  export let splitBy;

  $: instData = getNumRecsBySplit(
    $data.filter((d) => d.institution === institution.name),
    splitBy
  );
  $: bgData = getNumRecsBySplit($data, splitBy);

  $: yTickVals = $yScale.ticks(3);

  //debugging;
  // $: console.log("yTickVlas", yTickVals);
</script>

<!-- Y-Axes -->
<g class="axes">
  <!-- <line
    class="y-axis"
    y1={$yRange[1]}
    y2={$yRange[0]}
    x1={$xRange[0]}
    x2={$xRange[0]}
    stroke-width={1}
  /> -->

  {#each yTickVals as yTick}
    <!-- <line
      class="x-axis"
      x1={$xRange[0] - 5}
      x2={$xRange[0]}
      y1={$yScale(yTick)}
      y2={$yScale(yTick)}
      stroke-width={1}
    /> -->
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
    <text
      class="tick-label"
      x={$xRange[1] + 8}
      y={$yScale(yTick)}
      text-anchor="start"
      dominant-baseline="middle">{yTick}</text
    >
  {/each}
  <text
    class="axis-label"
    text-anchor="start"
    transform={`translate(${$xRange[1] + 8}, ${$yScale(yTickVals.at(-1)) + 15})`}
    dominant-baseline="middle">Recommendations</text
  >
</g>

<g>
  <!-- <rect width={$width} height={$height} fill="none" stroke="red" opacity="0.4" /> -->
  <!-- BG Data -->
  {#each bgData as d, i}
    <rect
      class="bg-rect"
      data-id={i}
      x={$xScale(d.display)}
      y={$yScale(d.nRecs)}
      width={$xScale.bandwidth()}
      height={$yRange[0] - $yScale(d.nRecs)}
      fill={"#e8e8e8"}
    />
  {/each}

  <!-- Institution Data -->
  {#each instData as d, i}
    {@const labelBars = d.nRecs > 0}
    <rect
      class="inst-rect"
      data-id={i}
      x={$xScale(d.display)}
      y={$yScale(d.nRecs)}
      width={$xScale.bandwidth()}
      height={$yRange[0] - $yScale(d.nRecs)}
      fill={category[institution.name]}
    />
    {#if labelBars}
      <text
        class="nRecs-text"
        x={$xScale(d.display) + $xScale.bandwidth() / 2}
        y={$yScale(d.nRecs) - 5}
        text-anchor="middle"
        fill={category[institution.name]}>{d.nRecs}</text
      >
    {/if}
  {/each}
</g>

<g class="axes">
  <!-- X-axis -->
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

<style>
  .nRecs-text {
    font-size: 14px;
    font-weight: 700;
  }

  .axes {
    stroke: var(--color-g3);
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
</style>
