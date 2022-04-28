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
      {#if i < 2}
        <div class="divider" />
      {/if}
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
      display: inline-block;
      position: relative;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      margin: 5px 10px;
      cursor: pointer;

      &:last-of-type {
        border-right: none;
      }

      &.active {
        color: var(--color-c4);
        font-weight: 700;
      }

      &:after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background: var(--color-c4);
        transform-origin: bottom left;
      }

      &:hover:after {
        transform: scaleX(1);
        transform-origin: bottom left;
        transition: transform 0.25s ease-out;
      }
    }

    .divider {
      border-right: solid 1px var(--color-g3);
    }
  }
</style>
