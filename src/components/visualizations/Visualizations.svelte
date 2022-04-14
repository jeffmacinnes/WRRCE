<script>
  import { fade, fly } from "svelte/transition";
  import Map from "$components/visualizations/Map/Map.svelte";
  import SplitBar from "$components/visualizations/SplitBar/SplitBar.svelte";
  import VizTest from "./VizTest.svelte";

  const visOpts = [
    {
      cmp: Map,
      title: "Regional Trends in Recommendation Compliance",
      props: { color: "#529D8E", name: "Viz 1" }
    },
    {
      cmp: SplitBar,
      title: "Recommendations by Institution",
      props: { color: "#D4B483", name: "Viz 2" }
    },
    { cmp: VizTest, title: "", props: { color: "#3E3D81", name: "Viz 3" } }
  ];

  let currentIdx = 1;
</script>

<div class="visualization-container">
  <div class="view-container">
    {#key currentIdx}
      <div
        class="current-view-wrapper shadow"
        in:fly={{ delay: 500, x: 500, duration: 500 }}
        out:fly={{ duration: 500, x: -500 }}
      >
        <div class="title">
          <h4>{visOpts[currentIdx].title}</h4>
        </div>
        <svelte:component this={visOpts[currentIdx].cmp} {...visOpts[currentIdx].props} />
      </div>
    {/key}
  </div>

  <div class="view-controls">
    <h4 class="label">views</h4>
    {#each [0, 1, 2, 3] as viewIdx}
      <div class="view-button shadow" on:click={() => (currentIdx = viewIdx)} />
    {/each}
  </div>
</div>

<style lang="scss">
  .visualization-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    width: 100%;
    padding: 50px;
    min-height: 900px;
    background-color: var(--color-g1);
  }

  .view-container {
    width: 100%;
    height: 70vh;
    max-height: 900px;
  }

  .current-view-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    overflow: hidden;

    .title {
      width: 100%;
      top: 0px;
      left: 0px;
      padding: 8px;
      border-radius: 5px 5px 0px 0px;
      text-align: center;
      color: white;
      background: var(--color-c4);
    }
  }

  .view-controls {
    display: flex;
    align-items: center;
    gap: 5px;

    .label {
      text-transform: uppercase;
      margin-right: 10px;
    }

    .view-button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: var(--color-c2);
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }
    }
  }
</style>
