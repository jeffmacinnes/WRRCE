<script>
  import { fade, fly } from "svelte/transition";
  import Map from "$components/visualizations/Map/Map.svelte";
  import VizTest from "./VizTest.svelte";

  const visOpts = [
    { cmp: Map, props: { color: "#529D8E", name: "Viz 1" } },
    { cmp: VizTest, props: { color: "#D4B483", name: "Viz 2" } },
    { cmp: VizTest, props: { color: "#3E3D81", name: "Viz 3" } },
    { cmp: VizTest, props: { color: "#DBF4AD", name: "Viz 4" } }
  ];

  let currentIdx = 0;

  const nextVis = () => {
    currentIdx++;
    if (currentIdx === visOpts.length) {
      currentIdx = 0;
    }
  };

  /* CHILDREN:
    - view selector
    - legend
      - scale by option
  */
</script>

<div class="visualization-container">
  {#key currentIdx}
    <div
      class="viz-wrapper shadow"
      in:fly={{ delay: 500, x: 500, duration: 500 }}
      out:fly={{ duration: 500, x: -500 }}
    >
      <svelte:component this={visOpts[currentIdx].cmp} {...visOpts[currentIdx].props} />
    </div>
  {/key}

  <div class="view-controls">
    <div class="button shadow" on:click={() => nextVis()}>Viz Toggle</div>
  </div>
</div>

<style lang="scss">
  .visualization-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 900px;
    background-color: var(--color-g1);
    border: solid 1px red;
  }

  .viz-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    width: 90%;
    height: 90%;
  }

  .view-controls {
    width: 200px;
    padding: 15px;
    border: solid 1px red;
  }
</style>
