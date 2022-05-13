<script>
  import { client } from "$utils/SanityClient";
  import imageUrlBuilder from "@sanity/image-url";
  import { Lightbox } from "svelte-lightbox";

  export let finding;
  export let figSide = "right";

  const imgBuilder = imageUrlBuilder(client);
  const urlFor = (source) => {
    console.log(source);

    let i = imgBuilder.image(source);
    console.log(i);
    return i;
  };

  // prep copy
  let { heading, body, figureThumbnail, figure } = finding;

  body = body.split("\n").filter((d) => d.length > 0);

  $: textSide = figSide === "right" ? "left" : "right";
</script>

<div class={`figure-container ${figSide}`}>
  <Lightbox thumbnail>
    <!-- THUMBNAIL IMAGE -->
    <div class="thumbnail" slot="thumbnail">
      <img class="shadow" src={urlFor(figureThumbnail)} alt="" />
    </div>

    <!-- POPUP IMAGE -->
    <div class="figure" slot="image">
      <img src={urlFor(figure)} alt="" />
      <div class="caption-container">
        <h5>{figureTitle}</h5>
        <div class="caption-divider" />
        <div class="caption-text">{figureCaption}</div>
      </div>
    </div>
  </Lightbox>

  <div class="caption-container">
    <h5>{figureTitle}</h5>
    <div class="caption-divider" />
    <div class="caption-text body-sm">{figureCaption}</div>
  </div>
</div>

<div class="finding-divider" />

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
