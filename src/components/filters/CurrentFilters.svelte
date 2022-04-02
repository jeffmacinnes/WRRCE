<script>
  import { filteredData, rawData, showFilters } from "$stores/dataStores.js";
  import CTA from "$components/common/CTA.svelte";

  const toggleFiltersPanel = () => {
    showFilters.set(!$showFilters);
  };

  $: countText =
    $filteredData.length === $rawData.length
      ? `Showing <b>${$rawData.length.toLocaleString("en-US")}</b> total recommendations`
      : `Showing <b>${$filteredData.length.toLocaleString(
          "en-US"
        )}</b> out of <b>${$rawData.length.toLocaleString(
          "en-US"
        )}</b> total recommendations, filtered by:`;
  $: filterToggleText = $showFilters ? "Hide filters" : "Select filters";
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
      <div class="body-rg">{@html countText}</div>
    </div>

    <div class="download-container">
      <CTA
        icon="download"
        text="download filtered"
        textClass="filters-cta"
        iconSize="1.3em"
        lineSize="1px"
        iconFirst={false}
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
