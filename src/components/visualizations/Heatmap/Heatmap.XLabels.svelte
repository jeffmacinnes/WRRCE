<script>
  import { getContext } from "svelte";
  const { xScale, yRange } = getContext("LayerCake"); // get bg data from layercake

  $: xTicks = $xScale.domain();

  // --- DEBUG
  // $: console.log($xScale.domain());
</script>

<div
  class="x-tick-title"
  style:width="200px"
  style:top={`${$yRange[1] - 26}px`}
  style:left={`${$xScale.range()[0] + 10}px`}
>
  Recommendation Issued In:
</div>

{#each xTicks as xTick}
  <div
    class="x-tick-label"
    style:width={`${$xScale.bandwidth()}px`}
    style:top={`${$yRange[1] - 10}px`}
    style:left={`${$xScale(xTick)}px`}
  >
    {xTick}
  </div>
  <div
    class="x-tick-label"
    style:width={`${$xScale.bandwidth()}px`}
    style:top={`${$yRange[0] + 5}px`}
    style:left={`${$xScale(xTick)}px`}
  >
    {xTick}
  </div>
{/each}

<style lang="scss">
  .x-tick-label {
    position: absolute;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1;
    color: var(--color-g4);

    // transform-origin: 100% 0%;
    // transform: translate(0, 10px) rotate(-45deg);

    // border: solid 1px red;
  }

  .x-tick-title {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    text-align: left;
    font-size: 12px;
    text-transform: uppercase;
    line-height: 1;
    color: var(--color-g3);

    // border: solid 1px red;
  }
</style>
