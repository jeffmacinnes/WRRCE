<script>
  import { createEventDispatcher } from "svelte";

  export let currentSplitVar = { display: "" };
  const dispatch = createEventDispatcher();
</script>

<div class="split-controls-container">
  Tally Recommendations By:
  <div class="split-var-container">
    {#each ["Compliance Status", "Action", "Precision"] as splitVarOpt, i}
      <div
        class="split-var"
        class:active={currentSplitVar.display === splitVarOpt}
        on:click={() => dispatch("setSplitVar", splitVarOpt)}
      >
        {splitVarOpt}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .split-controls-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
  }

  .split-var-container {
    display: flex;
    margin: 10px;
    overflow: hidden;
    text-transform: uppercase;
    color: var(--color-g4);

    .split-var {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: solid 1px var(--color-g3);
      padding: 5px 10px;
      cursor: pointer;

      &:last-of-type {
        border-right: none;
      }

      &.active {
        color: var(--color-c4);
        font-weight: 700;
      }

      &:hover:not(.active) {
        background-color: var(--color-g1);
      }
    }
  }
</style>
