<script>
  import { onMount } from "svelte";
  import {
    filteredData,
    rawDataCount,
    activeFilters,
    sortBy,
    variableTooltips
  } from "$stores/dataStores.js";
  import { tooltip } from "$actions/tooltip";

  import InfiniteScroll from "$components/helpers/InfiniteScroll.svelte";
  import TableRow from "./TableRow.svelte";
  import SortBy from "./SortBy.svelte";
  import VariableTooltip from "$components/tooltips/variables/VariableTooltip.svelte";

  let tableVars = [
    { name: "country", display: "country" },
    { name: "institution", display: "institution" },
    { name: "year", display: "year" },
    { name: "complianceStatus", display: "compliance status" },
    { name: "action", display: "action" },
    { name: "precision", display: "precision" }
  ];

  $: countText =
    $activeFilters.length === 0
      ? `<b>${$rawDataCount.toLocaleString("en-US")}</b> total recommendations`
      : `<b>${$filteredData.length.toLocaleString(
          "en-US"
        )}</b> out of <b>${$rawDataCount.toLocaleString("en-US")}</b> total recommendations`;

  $: title = $activeFilters.length === 0 ? "Recommendations" : "Filtered Recommendations";

  // -- Infinite Scroll for efficient loading of the table --
  let tableScrollWrapper;
  let rowList = [];
  let newRows = [];
  let batchSize = 50; // how many rows to get at once;
  let rowIdx = 0;

  const fetchRows = () => {
    // console.log(`fetching ${rowIdx} through ${rowIdx + batchSize}...`);
    newRows = $filteredData.slice(rowIdx, rowIdx + batchSize);
    rowIdx += batchSize;
    rowList = [...rowList, ...newRows];
  };

  const reset = () => {
    rowList = [];
    newRows = [];
    rowIdx = 0;
    fetchRows();
  };

  $: $filteredData, reset();

  onMount(() => {
    fetchRows();
  });

  // --- Sort By Options ---
  const handleSortBy = (name) => {
    let modes = ["none", "asc", "dsc"];
    if (name === $sortBy.name) {
      let modeIdx = modes.findIndex((d) => d === $sortBy.mode);
      modeIdx++;
      modeIdx = modeIdx === modes.length ? 0 : modeIdx;
      let newMode = modes[modeIdx];
      name = newMode === "none" ? null : name;
      sortBy.set({ name, mode: modes[modeIdx] });
    } else {
      // if not a current sortBy, set it to the specified 'name' w/ ascending
      sortBy.set({ name, mode: "asc" });
    }
  };
</script>

<div class="table-section shadow">
  <div class="title"><h4>{title}</h4></div>
  <div class="current-filters-container">
    <div class="count-label body-rg">{@html countText}</div>
  </div>

  <div bind:this={tableScrollWrapper} class="table-container">
    <table class="table">
      <!-- HEADER -->
      <thead class="header">
        <tr>
          <th class="expander" />
          {#each tableVars as th}
            <th
              ><div
                class="header-item"
                use:tooltip={{
                  component: VariableTooltip,
                  props: {
                    tooltip: $variableTooltips.find((d) => d.variable === th.name),
                    placement: "top"
                  }
                }}
              >
                {th.display}<SortBy
                  isActive={$sortBy.name === th.display}
                  sortMode={$sortBy.mode}
                  on:sortBy={() => handleSortBy(th.display)}
                />
              </div></th
            >
          {/each}
        </tr>
      </thead>

      <!-- BODY -->
      <tbody>
        {#each rowList as entry, i (entry.id)}
          <TableRow data={entry} />
        {/each}
        <InfiniteScroll
          elementScroll={tableScrollWrapper}
          hasMore={newRows.length}
          threshold={100}
          on:loadMore={() => fetchRows()}
        />
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
    border-radius: 5px;
    background-color: var(--color-c4);
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
    background-color: var(--color-c4);
    color: var(--color-white);
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .count-label {
    color: var(--color-white);
  }

  .table-container {
    overflow: auto; // Scroll events are on div, not table
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
      background: var(--color-c4);
      color: var(--color-white);
      /* border isn't sticky, so have to do this craziness to get "border": */
      background: linear-gradient(to left, #fff 1px, var(--color-c4) 1px, var(--color-c4));

      &:last-of-type {
        border-right: none;
        text-align: center;
      }

      &:first-of-type {
        border-right: none;
        text-align: center;
      }
    }

    .header-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }

    .expander {
      width: 50px;
    }
  }

  tbody {
    max-height: 500px;
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
