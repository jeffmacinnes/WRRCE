<script>
  import { fade, fly } from "svelte/transition";
  import Icon from "$components/helpers/Icon.svelte";
  import { color } from "$data/variables.json";

  import Map from "$components/visualizations/Map/Map.svelte";
  import SplitBar from "$components/visualizations/SplitBar/SplitBar.svelte";
  import Heatmap from "$components/visualizations/Heatmap/Heatmap.svelte";

  const viewOpts = [
    {
      cmp: Map,
      title: "Regional Trends in Recommendations",
      props: {},
      icon: "globe"
    },
    {
      cmp: SplitBar,
      title: "Recommendations by Institution",
      props: {},
      icon: "clipboard"
    },
    {
      cmp: Heatmap,
      title: "Temporal Trends in Recommendations",
      props: {},
      icon: "calendar"
    }
  ];

  let currentViewIdx = 0;
</script>

<div class="visualization-container">
  <div class="view-container">
    {#key currentViewIdx}
      <div
        class="current-view-wrapper"
        in:fly={{ delay: 500, x: 500, duration: 500 }}
        out:fly={{ duration: 500, x: -500 }}
      >
        <div class="title">
          <h4>{viewOpts[currentViewIdx].title}</h4>
        </div>
        <svelte:component this={viewOpts[currentViewIdx].cmp} {...viewOpts[currentViewIdx].props} />
      </div>
    {/key}
  </div>

  <div class="view-controls">
    <h4 class="label">views</h4>
    {#each viewOpts as viewOpt, i}
      <div
        class="view-button shadow"
        class:active={currentViewIdx === i}
        on:click={() => (currentViewIdx = i)}
      >
        <Icon
          name={viewOpt.icon}
          width="28px"
          height="28px"
          stroke={currentViewIdx === i ? "#fff" : color.c4}
        />
        <div class="view-label">{viewOpt.title}</div>
      </div>
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
    gap: 30px;
    width: 100%;
    padding: 50px;
    margin-bottom: 50px;
    min-height: 900px;
    background-color: var(--color-white);
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
    // border-radius: 15px;
    overflow: hidden;

    .title {
      width: 100%;
      top: 0px;
      left: 0px;
      padding: 8px;
      text-align: center;
      color: var(--color-g4);

      h4 {
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 1.5%;
        font-weight: 700;
      }
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
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: var(--color-white);
      cursor: pointer;

      .view-label {
        position: absolute;
        top: 0px;
        transform: translateY(-35px);
        width: 150px;
        text-align: center;
        text-transform: uppercase;
        font-size: 12px;
        line-height: 1.05;
        opacity: 0;
        transition: opacity 200ms;
      }

      &.active {
        background-color: var(--color-c3);
      }

      &:hover {
        background-color: var(--color-c1);

        .view-label {
          opacity: 1;
        }
      }
    }
  }
</style>
