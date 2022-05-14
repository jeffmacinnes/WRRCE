<script>
  import { client } from "$utils/SanityClient";
  import imageUrlBuilder from "@sanity/image-url";
  import { Lightbox } from "svelte-lightbox";

  export let finding;
  export let figSide = "right";

  const imgBuilder = imageUrlBuilder(client);
  const urlFor = (source) => imgBuilder.image(source);

  // prep copy
  let { heading, body, figureThumbnail, figure } = finding;

  body = body.split("\n").filter((d) => d.length > 0);

  $: textSide = figSide === "right" ? "left" : "right";

  // --- DEBUG ----
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
    <Lightbox thumbnail>
      <div class="thumbnail" slot="thumbnail">
        <img class="shadow" src={urlFor(figureThumbnail).url()} alt={figureThumbnail.alt} />
      </div>

      <div class="figure" slot="image">
        <img src={urlFor(figure).url()} alt={figure.alt} />
        <div class="caption-container">
          <h5>{figure.figureTitle}</h5>
          <div class="caption-divider" />
          <div class="caption-text">{figure.caption}</div>
        </div>
      </div>
    </Lightbox>

    <div class="caption-container">
      <h5>{figureThumbnail.figureTitle}</h5>
      <div class="caption-divider" />
      <div class="caption-text body-sm">{figureThumbnail.caption} (Click figure to enlarge)</div>
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
    background-color: var(--color-a1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .caption-container {
      width: 80%;
      padding: 10px;
      background-color: var(--color-a1);
      color: var(--color-white);
    }

    .caption-divider {
      border-bottom: solid 2px var(--color-white);
      margin: 6px 0;
    }
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
