<script>
  import { fly } from "svelte/transition";
  import { showFilters, searchKeyword, filters } from "$stores/dataStores.js";
  import Icon from "$components/helpers/Icon.svelte";
  import { filter } from "d3";

  let w = 300;
</script>

{#if $showFilters}
  <div
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

    <h1>{$searchKeyword}</h1>

    <div class="filters-container">
      <div class="keyword-container">
        <Icon name="search" width="24px" height="24px" />
        <input class="keyword-input" placeholder="keyword search" bind:value={$searchKeyword} />
      </div>
    </div>
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
    padding-top: 50px;
    border-right: 1px solid black;
    background-color: var(--color-white);
  }

  .close-button {
    position: absolute;
    right: 15px;
    top: 25px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }

  .logo-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    h4 {
      padding-left: 15px;
    }
  }

  .filters-container {
    margin: 30px 0;
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
      color: var(--color-g1);
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
