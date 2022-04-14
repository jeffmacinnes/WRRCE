<script>
  import { fullData, filteredData } from "$stores/dataStores";
  import { flatGroup } from "d3-array";
  import { filterOptions } from "$data/filterOptions";

  import SmallMultipleWrapper from "./SmallMultipleWrapper.svelte";

  let institutions = flatGroup($filteredData, (d) => d.institution).map((d) => ({
    institution: d[0],
    instData: d[1],
    bgData: $filteredData
  }));

  let splitBy;
  const setSplitBy = (splitByVar) => {
    // use the levels of the splitby var from the filter options list
    splitBy = filterOptions.find((d) => d.display === splitByVar);
  };
  setSplitBy("Compliance Status");
</script>

<div class="splitbar-container">
  <div class="group-container">
    {#each institutions as instition}
      <SmallMultipleWrapper data={instition} {splitBy} />
    {/each}
  </div>

  <div class="split-var-container">
    {#each ["Compliance Status", "Action", "Precision"] as splitVarOpt, i}
      <div
        class="split-var"
        class:active={splitBy.display === splitVarOpt}
        on:click={() => setSplitBy(splitVarOpt)}
      >
        {splitVarOpt}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .splitbar-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: hidden;
  }

  .group-container {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .split-var-container {
    display: flex;

    .split-var {
      border: solid 2px var(--color-g2);
      background-color: var(--color-white);
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;

      &.active {
        background-color: var(--color-c3);
        color: var(--color-white);
      }

      &:hover:not(.active) {
        background-color: var(--color-g2);
      }
    }
  }
</style>
