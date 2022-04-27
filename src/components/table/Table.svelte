<script>
  import { filteredData, rawDataCount, activeFilters } from "$stores/dataStores.js";

  import Lazy from "$components/common/Lazy.svelte";
  // import TableRow from "./TableRow.svelte";

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

  $: title = $activeFilters.length === 0 ? "Recommendations" : "Filtered Recommendations";
</script>

<div class="table-section shadow">
  <div class="title"><h4>{title}</h4></div>
  <div class="current-filters-container">
    <div class="count-label body-rg">{@html countText}</div>
  </div>

  <div id="data-table" class="table-container">
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
        {#each $filteredData as entry, i (entry.id)}
          <Lazy this={() => import("./TableRow.svelte")}>
            <div slot="loading">Loading...</div>
            <svelte:fragment slot="component" let:TableRow>
              <TableRow idx={i} data={entry} />
            </svelte:fragment>
          </Lazy>
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
    background-color: var(--color-c2);
    padding: 10px 50px;
  }

  .title {
    width: 100%;
    top: 0px;
    left: 0px;
    padding: 8px;
    text-align: center;
    color: var(--color-white);

    :global(h4) {
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 1.5%;
      font-weight: 700;
      text-transform: none;
    }
  }

  .current-filters-container {
    width: 100%;
    height: 25px;
    margin-bottom: 5px;
    background-color: var(--color-c2);
    color: var(--color-white);
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .count-label {
    color: var(--color-white);
  }

  .table-container {
    overflow: auto;
    height: 90%;
    max-height: 900px;
  }

  table {
    table-layout: auto;
    position: relative;
    border-collapse: collapse;
  }

  .header {
    th {
      position: sticky;
      top: 0;
      z-index: 1;
      padding: 10px 5px;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.005em;
      text-transform: uppercase;
      background-color: var(--color-c4);
      color: var(--color-white);
      border-right: solid 1px white;

      &:last-of-type {
        border-right: none;
      }
    }

    .expander {
      width: 50px;
    }
  }

  tbody {
    max-height: 500px;
    overflow-y: auto;
  }

  div::-webkit-scrollbar {
    height: 17px;
    width: 10px;
  }

  div::-webkit-scrollbar-track {
    background-color: var(--color-c1);
    webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  div::-webkit-scrollbar-thumb {
    border-radius: 5px;
    // border: solid 1px var(--color-white);
    background-color: var(--color-c3);
    webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
</style>
