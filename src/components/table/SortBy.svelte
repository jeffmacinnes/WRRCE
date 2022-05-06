<script>
  import { createEventDispatcher } from "svelte";

  export let isActive;
  export let sortMode;

  const dispatch = createEventDispatcher();

  // modes = ["none", "asc", "dsc"];
  $: currentMode = isActive ? sortMode : "none";
</script>

<div
  class="sort-container"
  on:click={() => {
    dispatch("sortBy", {});
  }}
>
  <div class="arrow down" class:active={["dsc"].includes(currentMode)} />
  <div class="arrow up" class:active={["asc"].includes(currentMode)} />
</div>

<style lang="scss">
  .sort-container {
    display: flex;
    flex-direction: column;
    width: 13px;
    height: 20px;
    cursor: pointer;
  }

  .arrow {
    content: "";
    display: block;
    height: 0;
    right: 5px;
    top: 50%;
    position: absolute;
    width: 0;
    opacity: 0.5;
    border: 5px solid transparent;
  }

  .up {
    border-bottom-color: var(--color-c1);
    margin-top: -10px;
  }

  .down {
    border-top-color: var(--color-c1);
    margin-top: 2px;
  }

  .active {
    opacity: 1;
  }
</style>
