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

<div class="page">
  <h1>About</h1>

  {#each results as item}
    <div>My favorite movie is {item.title}</div>
  {/each}
</div>
