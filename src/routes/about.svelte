<script context="module">
  import { client } from "$utils/SanityClient";
  export async function load() {
    const query = "*[_type == 'book']{title, authors}";
    const results = await client.fetch(query);
    return {
      props: {
        results
      }
    };
  }
</script>

<script>
  export let results;
  console.log("results", results);
</script>

<h1>This is a test of the sanity connection</h1>

{#each results as item}
  <div>My favorite movie is {item.title}</div>
{/each}
