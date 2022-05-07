<script>
  import { scaleBand, scaleLinear, max, extent, color as d3Color, range } from "d3";
  import ColorContrastChecker from "color-contrast-checker";
  import { color } from "$data/variables.json";

  export let colorScale;
  export let splitBy;
  export let data;
  export let item;
  export let x;
  export let y;

  let ccc = new ColorContrastChecker();

  // Plot parameters
  let width = 350;
  const height = 125;
  let margin = { top: 20, right: 5, bottom: 35, left: 25 };
  const chartW = width - margin.left - margin.right;
  const chartH = height - margin.top - margin.bottom;

  // --- Data prep
  $: levelByYear = $data.filter((d) => d.name === item.name);
  // $: yearByLevels = $data.filter((d) => d.year === item.year);

  // By Year
  $: year_xScale = scaleBand()
    .padding(0.1)
    .domain(levelByYear.map((d) => d.year))
    .range([0, chartW]);
  $: year_yScale = scaleLinear()
    .domain([0, max($data.map((d) => d.nRecs))])
    .range([chartH, 0]);
  $: year_yTickVals = year_yScale.ticks(2);
  $: yearRange = extent(levelByYear.map((d) => d.year));

  // --- DEBUG ---
  // $: console.log("here", item, $data);
</script>

<div id="tooltip" class="tooltip-container shadow" style:top={y} style:left={x}>
  <div class="text-content">
    <div class="vars-container">
      <div class="var-container">
        <div class="title">{splitBy.display}</div>
        <div class="value">{item.display.replace(/[0-9]\s-\s/g, "")}</div>
      </div>

      <div class="var-container">
        <div class="title">year</div>
        <div class="value">{item.year}</div>
      </div>
    </div>
    <div
      class="rec-count"
      style:background={colorScale(item.nRecs)}
      style:color={ccc.isLevelCustom(d3Color(colorScale(item.nRecs)).formatHex(), color.white, 1.5)
        ? color.white
        : color.a1}
    >
      {item.nRecs}
      <span>Recommendations</span>
    </div>
  </div>

  <div class="charts-container">
    <!-- BY YEAR PLOT -->
    <svg {width} {height} viewBox={`[0 0 ${chartW} ${chartH}]`}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <!-- Y-AXIS -->
        {#each year_yTickVals as yTick}
          <line
            class="x-axis"
            x1={year_xScale.range()[0]}
            x2={year_xScale.range()[1]}
            y1={year_yScale(yTick)}
            y2={year_yScale(yTick)}
            stroke-width={1}
            stroke-dasharray={3}
            opacity={yTick === 0 ? 0 : 0.7}
            stroke={color.g3}
          />
          <text
            class="tick-label"
            x={year_xScale.range()[0] - 3}
            y={year_yScale(yTick)}
            text-anchor="end"
            dominant-baseline="middle">{yTick}</text
          >
        {/each}

        <!-- RECS PER YEAR BARS -->
        {#each levelByYear as d}
          <rect
            x={year_xScale(d.year)}
            y={year_yScale(d.nRecs)}
            width={year_xScale.bandwidth()}
            height={year_yScale.range()[0] - year_yScale(d.nRecs)}
            fill={d.year === item.year ? colorScale(d.nRecs) : color.g2}
            stroke={d.year === item.year ? color.g4 : "none"}
          />
        {/each}
        <!-- YEAR INDICATOR -->
        <line
          x1={year_xScale(item.year) + year_xScale.bandwidth() / 2}
          x2={year_xScale(item.year) + year_xScale.bandwidth() / 2}
          y1={year_yScale(0)}
          y2={year_yScale(0) + 15}
          stroke={color.g5}
        />
        <text
          class="data-label"
          x={year_xScale(item.year) + year_xScale.bandwidth() / 2}
          y={year_yScale(0) + 17}
          dominant-baseline="hanging"
          text-anchor="middle">{item.year}</text
        >

        <!-- X-AXIS -->
        <line
          x1={year_xScale(0)}
          x2={year_xScale.range()[1]}
          y1={year_yScale(0)}
          y2={year_yScale(0)}
          stroke={color.g5}
        />
        {#if item.year !== yearRange[0]}
          <text
            class="x-tick"
            x={year_xScale(yearRange[0]) + year_xScale.bandwidth() / 2}
            y={year_yScale(0) + 5}
            dominant-baseline="hanging"
            text-anchor="middle">{yearRange[0]}</text
          >
        {/if}

        {#if item.year !== yearRange[1]}
          <text
            class="x-tick"
            x={year_xScale(yearRange[1]) + year_xScale.bandwidth() / 2}
            y={year_yScale(0) + 5}
            dominant-baseline="hanging"
            text-anchor="middle">{yearRange[1]}</text
          >
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
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .charts-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-content {
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }

  .vars-container {
    display: flex;
    gap: 20px;
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

  .tick-label,
  .x-tick {
    font-size: 12px;
    stroke: none;
    fill: var(--color-g3);
  }

  .data-label {
    font-size: 14px;
    font-weight: 800;
    fill: var(--color-g4);
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
    fill: var(--color-g5);
  }
</style>
