<script>
  import { fly } from "svelte/transition";
  import { showFilters } from "$stores/dataStores.js";

  export let height = "1px";
  $: console.log(height);
</script>

{#if $showFilters}
  <div class="filters-container" transition:fly={{ x: -550, opacity: 1 }}>
    <h1>Here are the filters</h1>
  </div>
{/if}

<style lang="scss">
  .filters-container {
    position: absolute;
    width: 300px;
    height: calc(100vh - 150px);
    top: 0;
    left: 0;
    border-right: 1px solid black;
    background-color: var(--color-white);
  }
</style>
