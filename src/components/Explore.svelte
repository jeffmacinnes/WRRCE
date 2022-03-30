<script>
  import CurrentFilters from "$components/filters/CurrentFilters.svelte";
  import Filters from "$components/filters/Filters.svelte";
  import CurrentVisualization from "$components/visualizations/CurrentVisualization.svelte";
  import Table from "$components/table/Table.svelte";
</script>

<section class="explore-container">
  <div class="fg">
    <CurrentFilters />
  </div>

  <div class="bg">
    <div class="filter-panel">
      <Filters />
    </div>

    <div class="visualization-container">
      <h1>VISUALIZATIONS GO HERE</h1>
    </div>

    <div class="table-container">
      <h1>TABLE GOES HERE</h1>
    </div>
  </div>
</section>

<style lang="scss">
  // * {
  //   border: solid 1px red;
  // }

  .explore-container {
    position: relative;
    height: 100%;
    background: var(--color-g1);
  }

  .fg {
    position: sticky;
    top: 100px;
    z-index: 10;
  }

  .bg {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .filter-panel {
    position: sticky;
    top: 150px;
  }

  .visualization-container {
    height: 900px;
    background-color: aquamarine;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .table-container {
    height: 900px;
    background-color: coral;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
