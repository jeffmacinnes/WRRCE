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
  const width = 250;
  const height = 55;
  let ccc = new ColorContrastChecker();

  // Set up histogram
  let margin = { top: 0, right: 15, bottom: 25, left: 15 };
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

  $: validCountry = !["Belarus", "Kosovo"].includes(name);

  // --- debug
</script>

<div id="tooltip" class="tooltip-container shadow" style:width style:top={y} style:left={x}>
  <div class="text-content">
    <div class="var-container">
      <div class="title">Country</div>
      <div class="value">{name}</div>
    </div>
    {#if validCountry}
      <div
        class="rec-count"
        style:background={colorScale(nRecs)}
        style:color={ccc.isLevelCustom(d3Color(colorScale(nRecs)).formatHex(), color.white, 1.5)
          ? color.white
          : color.a1}
      >
        {nRecs}
        <span>Recommendations</span>
      </div>
    {:else}
      <div class="no-data">Data Unavailable</div>
    {/if}
  </div>

  <div class="chart-container">
    <svg {width} {height} viewBox={[0, 0, width, height]}>
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
        <!-- {#each bins as bin}
          <rect
            x={xScale(bin.x0)}
            y={yScale(bin.length)}
            width={xScale(bin.x1) - xScale(bin.x0) - 1}
            height={chartH - yScale(bin.length)}
            fill={color.g2}
          />
        {/each} -->

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
          y={yScale(0) + 15}
          dominant-baseline="hanging"
          text-anchor="middle"># of recommendations</text
        >

        <!-- BG CIRCLES -->
        {#each data as country}
          <circle cx={xScale(country.nRecs)} cy={yScale(0)} r={6} fill={color.g3} opacity={0.5} />
        {/each}

        <!-- COUNTRY CIRCLE -->
        {#if nRecs}
          <circle
            cx={xScale(nRecs)}
            cy={yScale(0)}
            r="10"
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
    margin-bottom: 10px;
  }

  .rec-count {
    padding: 5px;
    height: 100%;
    border-radius: 3px;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
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

  .var-container {
    max-width: 200px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .title {
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .value {
      font-size: 24px;
      line-height: 24px;
      font-weight: 800;
    }
  }

  .no-data {
    font-style: italic;
    font-size: 14px;
  }

  .tick,
  .x-label {
    font-size: 12px;
    fill: var(--color-g4);
  }
</style>
