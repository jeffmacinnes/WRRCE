<script>
  import { filteredData, filterOpts } from "$stores/dataStores";
  import SmallMultipleWrapper from "./SmallMultipleWrapper.svelte";
  import SplitByControls from "$components/common/SplitByControls.svelte";

  // set the list of institutions based off of the filter options
  let institutions = [];
  $: {
    let insts = $filterOpts.find((d) => d.name === "institution").opts;
    // if not currently filtered by an institution, return all 3. Otherwise only return selected institutions
    institutions =
      insts.filter((d) => d.isSelected).length === 0 ? insts : insts.filter((d) => d.isSelected);
  }

  // --- Split By Var
  let splitBy = $filterOpts.find((d) => d.display === "Compliance Status");
  const handleSetSplitBy = (e) => {
    // use the levels of the splitby var from the filter options list
    splitBy = $filterOpts.find((d) => d.display === e.detail);
  };
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

  <SplitByControls currentSplitVar={splitBy} on:setSplitVar={handleSetSplitBy} />
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
</style>
