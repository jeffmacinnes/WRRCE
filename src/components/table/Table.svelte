<script>
  import { filteredData, rawDataCount, activeFilters } from "$stores/dataStores.js";

  $: countText =
    $activeFilters.length === 0
      ? `<b>${$rawDataCount.toLocaleString("en-US")}</b> total recommendations`
      : `<b>${$filteredData.length.toLocaleString(
          "en-US"
        )}</b> out of <b>${$rawDataCount.toLocaleString("en-US")}</b> total recommendations`;
</script>

<div class="table-container shadow">
  <h3>TABLE</h3>
  <div class="current-filters-container">
    <div class="count-label body-rg">{@html countText}</div>
  </div>
</div>

<style>
  .table-container {
    height: 100%;
    margin: 20px;
    border: solid 1px var(--color-c4);
    border-radius: 10px;
    background-color: var(--color-c3);
    padding: 20px;
  }

  .count-label {
    color: var(--color-white);
  }
</style>
