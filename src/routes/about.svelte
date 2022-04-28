<script context="module">
  import { client } from "$utils/SanityClient";
  export async function load() {
    // ready copy from Sanity
    const query = "*[_id == 'aboutPage']";
    const results = await client.fetch(query);
    return {
      props: {
        copy: results[0]
      }
    };
  }
</script>

<script>
  import CTA from "$components/common/CTA.svelte";
  import { color } from "$data/variables.json";

  export let copy;

  // prep copy
  let { heading, body, subheading, objectives, methods } = copy;
  body = body.split("\n").filter((d) => d.length > 0);
  methods = methods.split("\n").filter((d) => d.length > 0);
</script>

<section class="about-container col-12">
  <aside class="related-papers-container shadow">
    <div class="title"><b>Related Papers</b></div>
  </aside>
  <div class="text-container">
    <!-- Intro -->
    <h1>{heading}</h1>
    <div>
      {#each body as text}
        <p class="body-lg">{@html text}</p>
      {/each}
    </div>

    <!-- Objectives -->
    <h3>{subheading}</h3>
    <ul class="objectives-list">
      {#each objectives as objective}
        <li class="body-lg">{@html objective}</li>
      {/each}
    </ul>

    <!-- Methods -->
    <div class="spacer" />
    <h1>Methods</h1>
    <div class="codebook-container">
      <CTA icon="file-text" text="Codebook and Methodology" iconFirst={true} color={color.c4} />
      <i
        >Download the codebook for detailed information and sample coding rubrics for all of our
        coding</i
      >
    </div>
    {#each methods as text}
      <p class="body-rg">{@html text}</p>
    {/each}
  </div>
</section>

<style lang="scss">
  .about-container {
    position: relative;
    margin: 100px auto;
  }

  .text-container {
    grid-column: 5 / span 6;
  }

  .objectives-list {
    margin: 2em 0px;
    li {
      margin: 1em;
    }
  }

  .spacer {
    height: 2em;
  }

  .codebook-container {
    margin: 2em 0px;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    i {
      margin: 1em 0;
      margin-bottom: 0;
    }
  }

  .sidebar {
    grid-column: 1 / span 3;
    height: 100%;
    background-color: aqua;
  }

  .related-papers-container {
    grid-column: 1 / span 3;
    align-self: start;
    position: sticky;
    top: 150px;
    min-height: 100px;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--color-a1);

    .title {
      display: block;
      padding: 3px 0;
      border-bottom: solid 1px var(--color-white);
      color: var(--color-white);
    }
  }
</style>
