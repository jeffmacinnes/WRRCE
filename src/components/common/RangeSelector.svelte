<script>
  import { createEventDispatcher } from "svelte";

  import RangeSlider from "svelte-range-slider-pips";

  export let min;
  export let max;
  export let values = [min, max];

  const dispatch = createEventDispatcher();
</script>

<div class="range-container">
  <RangeSlider
    id="year-range"
    {min}
    {max}
    {values}
    float
    range
    pushy
    on:stop={(e) => dispatch("updateSliderValues", { values: e.detail.values })}
  />
</div>

<style lang="scss">
  .range-container {
    width: 100%;
    padding: 15px;
    padding-top: 26px;

    border: solid 1px #ccc;
  }
</style>
