<script>
  import CurrentFilters from "$components/filters/CurrentFilters.svelte";
  import Filters from "$components/filters/Filters.svelte";
  import CurrentVisualization from "$components/visualizations/CurrentVisualization.svelte";
  import Table from "$components/table/Table.svelte";

  let bgHeight;
</script>

<section class="explore-container">
  <div class="fg" style:height={`${bgHeight}px`}>
    <CurrentFilters />
    <Filters height={bgHeight} />
  </div>

  <div class="bg" bind:clientHeight={bgHeight}>
    <div class="visualization-container">
      <h1>VISUALIZATIONS GO HERE</h1>
      <!-- <CurrentVisualization /> -->
    </div>

    <div class="table-container">
      <!-- <Table /> -->
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
    border: solid 1px red;
  }

  .bg {
    position: relative;
    //top: 0;
    width: 100%;
    top: calc(-100vh + 150px);
    height: 100%;
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
    position: relative;
    background-color: coral;
  }
</style>
