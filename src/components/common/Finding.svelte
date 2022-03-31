<script>
  export let copy;
  export let figSide = "right";

  // prep copy
  let { heading, body, figureTitle, figureCaption } = copy;
  body = body.split("\n").filter((d) => d.length > 0);

  $: textSide = figSide === "right" ? "left" : "right";
</script>

<div class="finding-container col-12">
  <div class={`text-container ${textSide}`}>
    <h2>{heading}</h2>
    <div>
      {#each body as text}
        <p class="body-rg">{@html text}</p>
      {/each}
    </div>
  </div>

  <div class={`figure-container ${figSide}`}>
    <div class="figure">Figure placeholder</div>
    <div class="caption-container">
      <h5>{figureTitle}</h5>
      <div class="caption-divider" />
      <div class="caption-text body-sm">{figureCaption}</div>
    </div>
  </div>

  <div class="finding-divider" />
</div>

<style lang="scss">
  .finding-container {
    margin: 150px auto;
  }

  .left {
    grid-column: 2 / span 5;
    grid-row: 1;
  }

  .right {
    grid-column: 7 / span 5;
    grid-row: 1;
  }

  .text-container {
    padding: 0 20px;
  }

  .figure {
    width: 100%;
    height: 400px;
    background-color: var(--color-a1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .caption-container {
    width: 80%;
    margin: 10px 0px;
  }

  .caption-divider {
    width: 100px;
    border-bottom: solid 2px var(--color-a1);
    margin: 3px 0;
  }

  .finding-divider {
    grid-column: 4 / span 6;
    grid-row: 2;
    height: 10px;
    border-bottom: solid 1px var(--color-a1);
  }
</style>
