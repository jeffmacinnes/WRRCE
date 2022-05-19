<script context="module">
  import { client } from "$utils/SanityClient";
  export async function load() {
    // ready copy from Sanity
    const query = "*[_id == 'findingsPage']";
    const results = await client.fetch(query);
    return {
      props: {
        copy: results[0]
      }
    };
  }
</script>

<script>
  import { goto } from "$app/navigation";
  import { color } from "$data/variables.json";

  import Finding from "$components/common/Finding.svelte";
  import CTA from "$components/common/CTA.svelte";

  export let copy;

  // prep copy
  let { body, findings } = copy;
  body = body.split("\n").filter((d) => d.length > 0);
</script>

<section class="findings-page-container">
  <div class="col-12">
    <div class="intro-container">
      <h1>Findings</h1>
      <div>
        {#each body as text}
          <p class="body-lg">{@html text}</p>
        {/each}
      </div>
    </div>
  </div>

  {#each findings as finding, i}
    <Finding {finding} figSide={i % 2 === 0 ? "left" : "right"} />
  {/each}

  <div class="explore-link-container">
    <CTA
      icon="arrow-left"
      text="Explore the data"
      iconFirst={true}
      color={color.c4}
      textClass="body-lg-link"
      onClick={() => goto(`/#explore-anchor`)}
    />
  </div>
</section>

<style lang="scss">
  .findings-page-container {
    margin: 100px auto;
  }

  .intro-container {
    grid-column: 2 / span 8;
  }

  .explore-link-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    .intro-container {
      grid-column: 2 / span 10;
    }
  }
</style>
