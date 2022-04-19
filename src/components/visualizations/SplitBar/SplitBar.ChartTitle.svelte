<script>
  import { getContext } from "svelte";
  import { category } from "$data/variables.json";

  export let titleWidth;
  export let maxWidth;
  export let institution;
</script>

<div
  class="institute-label"
  style:left={`-${titleWidth}px`}
  style:max-width={`${titleWidth - 20}px`}
  style:color={category[institution.name]}
>
  {institution.display}
</div>

<style>
  .institute-label {
    position: absolute;
    display: flex;
    justify-content: center;
    max-width: 200px;
    height: 100%;
    align-items: center;
    text-align: right;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
    /* border: solid 1px red; */
  }
</style>
