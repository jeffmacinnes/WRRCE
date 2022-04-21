<script>
  import { getContext } from "svelte";
  const { xScale, yRange } = getContext("LayerCake"); // get bg data from layercake

  $: xTicks = $xScale.domain();
</script>

{#each xTicks as xTick}
  <div
    class="x-tick-label"
    style:width={`${$xScale.bandwidth()}px`}
    style:top={`${$yRange[1] - 15}px`}
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
    font-size: 12px;
    text-transform: uppercase;
    line-height: 1;
    color: var(--color-g3);

    // transform-origin: 100% 0%;
    // transform: translate(0, 10px) rotate(-45deg);

    // border: solid 1px red;
  }
</style>
