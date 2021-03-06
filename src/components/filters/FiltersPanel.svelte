<script>
  import { fly } from "svelte/transition";
  import { showFilters, searchKeyword, filterOpts, variableTooltips } from "$stores/dataStores.js";
  import Icon from "$components/helpers/Icon.svelte";
  import Filter from "$components/filters/Filter.svelte";
  import CTA from "$components/common/CTA.svelte";

  let w = 300;

  // --- UPDATING FILTER STORE
  const findFilterIdx = (name) => $filterOpts.findIndex((d) => d.name === name);
  const toggleFilter = (filterName) => {
    // toggle the open/close state of the filter panel for the specified filter
    filterOpts.update((store) => {
      let idx = findFilterIdx(filterName);
      store[idx].isOpen = !store[idx].isOpen;
      return store;
    });
  };

  const updateFilterOpts = (filterName, opts, states) => {
    // update the selected options for the specified filter
    // `opts` should be array of `opt` objects with props for: name, display, isSelected
    // `states` is the array of booleans you want to assign to isSelected for each opt
    filterOpts.update((store) => {
      let filterIdx = findFilterIdx(filterName);
      opts.forEach((opt, i) => {
        let optIdx = store[filterIdx].opts.findIndex((d) => d.name === opt.name);
        store[filterIdx].opts[optIdx] = { ...opt, isSelected: states[i] };
      });
      return store;
    });
  };

  const resetFilters = () => {
    searchKeyword.set("");
    filterOpts.update((store) => {
      return store.map((filter) => {
        let { opts } = filter;
        opts = opts.map((opt) => ({ ...opt, isSelected: false }));
        return { ...filter, opts };
      });
    });
  };

  let panelRef;
</script>

{#if $showFilters}
  <div
    bind:this={panelRef}
    class="filters-panel-container"
    transition:fly={{ x: -w, opacity: 1 }}
    style:width={`${w}px`}
  >
    <div class="info-container">
      <div class="close-button" on:click={() => showFilters.set(!$showFilters)}>
        <Icon name="arrow-left" width="32px" height="32px" />
      </div>
      <div class="logo-container">
        <Icon name="sliders" width="28px" height="28px" rotation="90" />
        <h4>FILTERS</h4>
      </div>
    </div>

    <!-- SEARCH KEYWORD -->
    <div class="filters-container">
      <div class="reset-container">
        <CTA
          icon="refresh-ccw"
          text="reset all"
          textClass="filters-cta"
          iconFirst={true}
          iconSize="1.2em"
          rotation="90"
          lineSize="1px"
          onClick={resetFilters}
        />
      </div>
      <div class="keyword-container">
        <Icon name="search" width="24px" height="24px" />
        <input class="keyword-input" placeholder="keyword search" bind:value={$searchKeyword} />
      </div>
    </div>

    <!-- COLLAPSIBLE FILTERS -->
    {#each $filterOpts as filter}
      <Filter
        {...filter}
        tooltipContent={$variableTooltips.find((d) => d.variable === filter.name)}
        opts={filter.opts}
        onToggle={toggleFilter}
        onOptsUpdate={updateFilterOpts}
      />
    {/each}
  </div>
{/if}

<style lang="scss">
  .filters-panel-container {
    box-sizing: border-box;
    position: absolute;
    height: calc(100vh - 150px); // minus nav header and filter status
    top: 0;
    left: 0;
    padding: 15px;
    padding-top: 70px;
    border-right: 1px solid black;
    background-color: var(--color-white);
    overscroll-behavior: contain;
  }

  .close-button {
    position: absolute;
    right: 15px;
    top: 67px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }

  .logo-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 50px;

    h4 {
      padding-left: 15px;
    }
  }

  .reset-container {
    margin: 0px 0 15px;
    padding-left: 2px;
  }

  .filters-container {
    margin: 15px 0;
    margin-bottom: 20px;
  }

  .keyword-container {
    display: flex;
    align-items: center;
  }

  .keyword-input {
    border: none;
    padding: 5px;
    margin-left: 5px;
    font-size: 18px;
    color: var(--color-c4);
    border-bottom: solid 1px black;

    &::placeholder {
      color: var(--color-g3);
      font-size: 16px;
    }

    &:focus {
      outline: 1px solid #ddd;
    }

    &::-webkit-search-cancel-button {
      color: var(--color-c4);
      display: none;
    }
  }
</style>
