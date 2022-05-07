<script>
  import { createEventDispatcher } from "svelte";

  import RangeSlider from "svelte-range-slider-pips";

  export let min;
  export let max;
  export let values = [min, max];

  const dispatch = createEventDispatcher();
</script>

<div class="range-container" class:inactive={values[0] === min && values[1] === max}>
  <RangeSlider
    id="year-range"
    {min}
    {max}
    {values}
    float
    range
    pushy
    springValues={{ stiffness: 0.4, damping: 0.6 }}
    on:stop={(e) => dispatch("updateSliderValues", { values: e.detail.values })}
  />
  <div class="labels-container">
    {#each [min, max] as value}
      <span>{value}</span>
    {/each}
  </div>
</div>

<style lang="scss">
  .range-container {
    width: 100%;
    padding: 15px;
    padding-top: 20px;

    &.inactive {
      :global(#year-range) {
        --range-handle-inactive: var(--color-g4);
      }
    }
  }

  .labels-container {
    width: 100%;
    display: flex;
    justify-content: space-between;

    font-size: 12px;
    font-weight: 500;
    color: var(--color-g4);
  }

  :global(#year-range) {
    --range-handle: var(--color-c3);
    --range-handle-focus: var(--color-c3);
    --range-handle-inactive: var(--color-c3);
  }
</style>
