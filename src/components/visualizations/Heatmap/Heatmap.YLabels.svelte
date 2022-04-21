<script>
  import { getContext } from "svelte";
  const { yScale, xRange } = getContext("LayerCake"); // get bg data from layercake

  $: yTicks = $yScale.domain();

  let labelWidth = 125;
</script>

{#each yTicks as yTick}
  <div
    class="y-tick-label"
    style:width={`${labelWidth}px`}
    style:height={`${$yScale.bandwidth()}px`}
    style:left={`${$xRange[1] + 5}px`}
    style:top={`${$yScale(yTick)}px`}
  >
    {yTick.replace(/[0-9]\s-\s/g, "")}
  </div>
{/each}

<style lang="scss">
  .y-tick-label {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    text-align: left;
    font-size: 12px;
    text-transform: uppercase;
    line-height: 1;
    color: var(--color-g3);

    // transform-origin: 100% 0%;
    // transform: translate(0, 10px) rotate(-45deg);

    // border: solid 1px red;
  }
</style>
