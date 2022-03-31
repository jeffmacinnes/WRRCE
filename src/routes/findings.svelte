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
  import CTA from "$components/common/CTA.svelte";
  import Finding from "$components/common/Finding.svelte";
  export let copy;

  console.log(copy);

  // prep copy
  let { heading, body, findings } = copy;
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
    <Finding copy={finding} figSide={i % 2 === 0 ? "left" : "right"} />
  {/each}
</section>

<style lang="scss">
  .findings-page-container {
    margin: 100px auto;
  }

  .intro-container {
    grid-column: 2 / span 8;
  }
</style>
