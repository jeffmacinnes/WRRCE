<script>
  import { filteredData, rawDataCount, activeFilters } from "$stores/dataStores.js";

  import TableRow from "./TableRow.svelte";

  let tableVars = [
    { name: "country" },
    { name: "institution" },
    { name: "year" },
    { name: "compliance status" },
    { name: "action" },
    { name: "precision" }
  ];

  $: countText =
    $activeFilters.length === 0
      ? `<b>${$rawDataCount.toLocaleString("en-US")}</b> total recommendations`
      : `<b>${$filteredData.length.toLocaleString(
          "en-US"
        )}</b> out of <b>${$rawDataCount.toLocaleString("en-US")}</b> total recommendations`;

  // --- DEBUGGING
  $: console.log($filteredData);
</script>

<div class="table-section shadow">
  <div class="current-filters-container">
    <div class="count-label body-rg">{@html countText}</div>
  </div>

  <div class="table-container">
    <table class="table">
      <!-- HEADER -->
      <thead class="header">
        <tr>
          <th class="header-item expander" />
          {#each tableVars as th}
            <th class="header-item">{th.name}</th>
          {/each}
        </tr>
      </thead>

      <!-- BODY -->
      <tbody>
        {#each $filteredData as entry (entry.id)}
          <TableRow data={entry} />
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style lang="scss">
  .table-section {
    position: relative;
    height: 100%;
    width: 90vw;
    min-height: 900px;
    border-radius: 10px;
    background-color: var(--color-white);
    padding: 50px;
  }

  .current-filters-container {
    width: 100%;
    height: 25px;
    background-color: var(--color-white);
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .count-label {
    color: var(--color-c4);
  }

  .table-container {
    overflow: auto;
    height: 90%;
    max-height: 700px;
  }

  table {
    table-layout: auto;
    position: relative;
    border-collapse: collapse;
  }

  .header {
    font-weight: 800;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.005em;
    text-transform: uppercase;

    th {
      position: sticky;
      top: 0;
      z-index: 1;
      padding: 10px 5px;
      background-color: var(--color-c4);
      color: var(--color-white);
      border-right: solid 1px white;
    }

    .expander {
      width: 50px;
    }
  }

  tbody {
    max-height: 500px;
    overflow-y: scroll;
  }
</style>
