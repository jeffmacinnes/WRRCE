<script>
  import { fade, fly } from "svelte/transition";

  export let color = "#ff0";
  export let name = "";
</script>

<div
  in:fly={{ delay: 500, x: 500, duration: 500 }}
  out:fly={{ duration: 500, x: -500 }}
  class="vis-container"
  style:background={color}
>
  <h1>{name}</h1>
</div>

<style>
  .vis-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 90%;
    color: white;
  }
</style>
