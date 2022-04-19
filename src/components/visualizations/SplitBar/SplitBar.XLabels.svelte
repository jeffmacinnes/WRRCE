<script>
  import { getContext } from "svelte";
  const { xScale, yScale } = getContext("LayerCake"); // get bg data from layercake

  $: xTicks = $xScale.domain();

  let labelWidth = 150;
</script>

{#each xTicks as xTick}
  <div
    class="x-tick-label"
    style:width={`${labelWidth}px`}
    style:top={`${$yScale(0)}px`}
    style:left={`${$xScale(xTick) - labelWidth + $xScale.bandwidth() / 2}px`}
  >
    {xTick.replace(/[0-9]\s-\s/g, "")}
  </div>
{/each}

<style lang="scss">
  .x-tick-label {
    position: absolute;
    width: 0px;

    text-align: right;
    font-size: 12px;
    text-transform: uppercase;
    line-height: 1;
    color: var(--color-g3);

    transform-origin: 100% 0%;
    transform: translate(0, 10px) rotate(-45deg);

    // border: solid 1px red;
  }
</style>
