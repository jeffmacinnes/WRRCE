<script>
  import { setContext } from "svelte";
  import { headerHeight } from "$stores/dataStores";

  import CurrentFilters from "$components/filters/CurrentFilters.svelte";
  import FiltersPanel from "$components/filters/FiltersPanel.svelte";
  import Visualizations from "$components/visualizations/Visualizations.svelte";
  import Table from "$components/table/Table.svelte";

  export let tooltips;

  setContext("tooltips", tooltips);
</script>

<section class="explore-container">
  <div class="fg" style:top={`${$headerHeight}px`}>
    <CurrentFilters />
  </div>

  <div class="filter-panel">
    <FiltersPanel />
  </div>
  <div class="bg">
    <Visualizations />
    <Table />
  </div>
</section>

<style lang="scss">
  // * {
  //   border: solid 1px red;
  // }

  .explore-container {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: var(--color-white);
  }

  .fg {
    position: sticky;
    width: 100%;
    // top: 100px;
    z-index: 10;
  }

  .bg {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .filter-panel {
    position: sticky;
    top: 150px;
    overscroll-behavior: contain;
    z-index: 2;
  }
</style>
