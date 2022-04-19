<script>
  import { filteredData, filterOpts } from "$stores/dataStores";
  import SmallMultipleWrapper from "./SmallMultipleWrapper.svelte";

  // set the list of institutions based off of the filter options
  let institutions = [];
  $: {
    let insts = $filterOpts.find((d) => d.name === "institution").opts;
    // if not currently filtered by an institution, return all 3. Otherwise only return selected institutions
    institutions =
      insts.filter((d) => d.isSelected).length === 0 ? insts : insts.filter((d) => d.isSelected);
  }

  let splitBy;
  const setSplitBy = (splitByVar) => {
    // use the levels of the splitby var from the filter options list
    splitBy = $filterOpts.find((d) => d.display === splitByVar);
  };
  setSplitBy("Compliance Status");
</script>

<div class="splitbar-container">
  <div class="group-container">
    {#each institutions as institution, i}
      <div class="small-multiple-container">
        <SmallMultipleWrapper
          data={$filteredData}
          showXLabels={i === institutions.length - 1}
          {institution}
          {splitBy}
        />
      </div>
    {/each}
  </div>

  <div class="spacer" />

  <div class="split-controls-container">
    Tally Recommendations By
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-bottom: 70px;

    // border: solid 1px blue;
  }

  .small-multiple-container {
    width: 100%;
    max-width: 1000px;
    height: 100%;

    // border: solid 1px red;
  }

  .spacer {
    height: 5%;
  }

  .split-controls-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
  }

  .split-var-container {
    display: flex;
    margin: 20px;
    border-radius: 8px;
    border: solid 2px var(--color-g3);
    overflow: hidden;
    text-transform: uppercase;
    color: var(--color-g4);

    .split-var {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: solid 1px var(--color-g3);
      padding: 5px 10px;
      cursor: pointer;

      &:last-of-type {
        border-right: none;
      }

      &.active {
        background-color: var(--color-c3);
        color: var(--color-white);
      }

      &:hover:not(.active) {
        background-color: var(--color-g1);
      }
    }
  }
</style>
