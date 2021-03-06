<script>
  import {
    filteredData,
    rawDataCount,
    searchKeyword,
    activeFilters,
    filterOpts,
    showFilters
  } from "$stores/dataStores.js";
  import CTA from "$components/common/CTA.svelte";
  import FilterPill from "$components/filters/FilterPill.svelte";
  import { downloadData } from "$data/download";

  const toggleFiltersPanel = () => {
    showFilters.set(!$showFilters);
  };

  const clearFilter = (filter) => {
    if (filter.type === "keyword") {
      searchKeyword.set("");
    } else {
      // reset the isSelected flag for the given filterOpt
      filterOpts.update((store) => {
        let filterIdx = store.findIndex((d) => d.name === filter.type);
        if (filter.type === "year") {
          // deselect ALL year opts
          store[filterIdx].opts = store[filterIdx].opts.map((d) => ({ ...d, isSelected: false }));
        } else {
          let optIdx = store[filterIdx].opts.findIndex((opt) => opt.name === filter.opt);
          store[filterIdx].opts[optIdx].isSelected = false;
        }
        return store;
      });
    }
  };

  $: countText =
    $activeFilters.length === 0
      ? `Showing <b>${$rawDataCount.toLocaleString("en-US")}</b> total recommendations`
      : `Showing <b>${$filteredData.length.toLocaleString(
          "en-US"
        )}</b> out of <b>${$rawDataCount.toLocaleString(
          "en-US"
        )}</b> total recommendations, filtered by:`;
  $: filterToggleText = $showFilters ? "Hide filters" : "Select filters";
  $: downloadText = $activeFilters.length === 0 ? "Download Data" : "Download Filtered Data";
</script>

<div class="container shadow">
  <div class="contents col-12">
    <div class="filters-toggle-container">
      <CTA
        icon="sliders"
        text={filterToggleText}
        textClass="filters-cta"
        iconFirst={true}
        iconSize="1.3em"
        rotation="90"
        lineSize="1px"
        onClick={toggleFiltersPanel}
      />
    </div>

    <div class="current-filters-container">
      <div class="body-rg filter-count-label">{@html countText}</div>
      <div class="pills-container">
        {#each $activeFilters as filter, i (`${filter.type}-${filter.opt}`)}
          <FilterPill
            title={filter.typeDisplay}
            name={filter.optDisplay}
            onClose={() => clearFilter(filter)}
          />
        {/each}
      </div>
    </div>

    <div class="download-container">
      <CTA
        icon="download"
        text={downloadText}
        textClass="filters-cta"
        iconSize="1.3em"
        lineSize="1px"
        iconFirst={false}
        onClick={() => downloadData($activeFilters.length > 0)}
      />
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    min-height: 50px;
    background-color: var(--color-white);

    // to hide the shadow on top
    &:before {
      content: "";
      height: 7px;
      width: 100%;
      position: absolute;
      top: -7px;
      background: inherit;
      z-index: 2;
    }
  }

  .filter-count-label {
    margin-bottom: 5px;
  }

  .container .filters-toggle-container {
    padding: 15px 0px;
    grid-column: 1 / span 2;
  }

  .current-filters-container {
    padding: 15px 0px;
    grid-column: 3 / span 8;
  }

  .download-container {
    grid-column: 11 / span 2;
    padding: 15px 0px;
    text-align: right;
  }
</style>
