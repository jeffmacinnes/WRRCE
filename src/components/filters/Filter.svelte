<script>
  import { slide } from "svelte/transition";

  export let name;
  export let display;
  export let isOpen;
  export let opts;
  export let onToggle;
  export let onOptUpdate;

  // -- calculate the type of filter it is
  // -- calculate if any options are selected
  $: anySelected = opts.filter((opt) => opt.isSelected).length > 0;
</script>

<!-- FILTER HEADER -->
<button
  class="header"
  class:active={anySelected}
  on:click={() => onToggle(name)}
  aria-expanded={isOpen}
>
  {display}
  <svg
    style="tran"
    width="20"
    height="20"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
  >
</button>

<!-- FILTER PANEL -->
{#if isOpen}
  <div transition:slide={{ duration: 300 }} class="panel">
    {#each opts as opt}
      <div
        class="checkbox-container"
        class:checked={opt.isSelected}
        on:click={() => onOptUpdate(name, opt, !opt.isSelected)}
      >
        <span class="checkmark" />
        {opt.display}
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
  .panel {
    max-height: 400px;
    overflow-y: auto;
    padding-left: 20px;
  }

  button {
    background: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2px 0px;
    padding-left: 5px;
    border-radius: 0;

    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.015;
    text-transform: uppercase;
    color: var(--color-g1);

    &.active {
      background-color: var(--color-c1);
      font-weight: 800;
      color: var(--color-c4);
    }

    cursor: pointer;
  }

  svg {
    transition: transform 0.2s ease-in;
  }

  [aria-expanded="true"] svg {
    transform: rotate(0.25turn);
  }

  .checkbox-container {
    display: block;
    position: relative;
    margin: 2px;
    padding-left: 25px;
    cursor: pointer;

    &:hover {
      opacity: 0.6;

      // .checkmark {
      //   background-color: var(--color-c1);
      // }
    }

    // custom checkbox
    .checkmark {
      position: absolute;
      top: 3px;
      left: 0;
      height: 15px;
      width: 15px;
      border: solid 1px var(--color-g1);
      background-color: var(--color-white);
    }

    &.checked {
      .checkmark {
        background-color: var(--color-c4);
      }

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
