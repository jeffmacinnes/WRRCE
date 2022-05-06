<script>
  import { histogram, max, scaleLinear, color as d3Color } from "d3";
  import { color } from "$data/variables.json";
  import ColorContrastChecker from "color-contrast-checker";

  export let feature;
  export let colorScale;
  export let data;
  export let x;
  export let y;

  const { name, nRecs } = feature.properties;
  const width = 300;
  const height = 100;
  let ccc = new ColorContrastChecker();

  // Set up histogram
  let margin = { top: 15, right: 15, bottom: 20, left: 15 };
  let chartW = width - margin.left - margin.right;
  let chartH = height - margin.top - margin.bottom;
  $: xScale = scaleLinear().domain(colorScale.domain()).range([0, chartW]);
  $: hist = histogram()
    .value((d) => d.nRecs)
    .domain(xScale.domain())
    .thresholds(xScale.ticks(20));
  $: bins = hist(data);
  $: yScale = scaleLinear()
    .domain([0, max(bins, (d) => d.length)])
    .range([chartH, 0]);

  // --- debug
  $: console.log("TT colorScale", colorScale.domain());
</script>

<div id="tooltip" class="tooltip-container shadow" style:top={y} style:left={x}>
  <div class="text-content">
    <div class="country-name">{name}</div>
    {#if nRecs}
      <div
        class="rec-count"
        style:background={colorScale(nRecs)}
        style:color={ccc.isLevelCustom(d3Color(colorScale(nRecs)).formatHex(), color.white, 1.9)
          ? color.white
          : color.g5}
      >
        {nRecs}
        <span>Recommendations</span>
      </div>
    {:else}
      <div class="no-data">Data Unavailable</div>
    {/if}
  </div>

  <div class="chart-container">
    <svg {width} {height} viewBox={`[0 0 ${chartW} ${chartH}]`}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <!-- Y-AXIS -->
        <!-- <line
          y1={yScale(5)}
          y2={yScale(5)}
          x1={xScale(0)}
          x2={xScale(xScale.domain()[1])}
          stroke-dasharray={3}
          stroke={color.g3}
        /> -->

        <!-- BINS -->
        {#each bins as bin}
          <rect
            x={xScale(bin.x0)}
            y={yScale(bin.length)}
            width={xScale(bin.x1) - xScale(bin.x0) - 1}
            height={chartH - yScale(bin.length)}
            fill={color.g2}
          />
        {/each}

        <!-- X-AXIS -->
        <line
          x2={xScale(xScale.domain()[1])}
          y1={yScale(0)}
          x1={xScale(0)}
          y2={yScale(0)}
          stroke={color.g5}
        />
        {#each xScale.domain() as tick}
          <text
            class="tick"
            x={xScale(tick)}
            y={yScale(0) + 10}
            dominant-baseline="hanging"
            text-anchor="middle">{tick}</text
          >
        {/each}
        <text
          class="x-label"
          x={xScale.range()[1] / 2}
          y={yScale(0) + 10}
          dominant-baseline="hanging"
          text-anchor="middle"># of recommendations</text
        >

        <!-- COUNTRY CIRCLE -->
        {#if nRecs}
          <circle
            cx={xScale(nRecs)}
            cy={yScale(0)}
            r="8"
            fill={colorScale(nRecs)}
            stroke={color.g5}
          />
        {/if}
      </g>
    </svg>
  </div>
</div>

<style lang="scss">
  .tooltip-container {
    position: absolute;
    background: var(--color-white);
    border: solid 1px var(--color-g4);
    color: var(--color-g4);
    padding: 20px;
    border-radius: 5px;
    z-index: 10;
  }

  .text-content {
    display: flex;
    justify-content: space-between;
  }

  .rec-count {
    padding: 5px;
    height: 100%;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    line-height: 24px;
    font-weight: 800;
    border: solid 1px var(--color-g4);

    span {
      font-size: 8px;
      line-height: 10px;
      font-weight: 500;
      text-transform: uppercase;
    }
  }

  .no-data {
    font-style: italic;
    font-size: 14px;
  }

  .country-name {
    max-width: 180px;
    font-weight: 800;
    font-size: 26px;
    line-height: 24px;
    letter-spacing: -0.005em;
    margin-bottom: 10px;
  }

  .tick,
  .x-label {
    font-size: 12px;
    fill: var(--color-g4);
  }
</style>
