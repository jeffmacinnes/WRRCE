<script context="module">
  import { client } from "$utils/SanityClient";
  export async function load() {
    // ready copy from Sanity
    const query = "*[_type == 'aboutPage']";
    const results = await client.fetch(query);
    return {
      props: {
        copy: results[0]
      }
    };
  }
</script>

<script>
  export let copy;
  let { heading, body, subheading, objectives, methods } = copy;

  // split the text sections into separate paragraphs
  body = body.split("\n").filter((d) => d.length > 0);
  methods = methods.split("\n").filter((d) => d.length > 0);
</script>

<div class="page">
  <!-- Intro -->
  <h1>{heading}</h1>
  {#each body as text}
    <p class="body-lg">{@html text}</p>
  {/each}

  <!-- Objectives -->
  <h3>{subheading}</h3>
  <ul>
    {#each objectives as objective}
      <li class="body-lg">{@html objective}</li>
    {/each}
  </ul>

  <!-- Methods -->
  <h1>Methods</h1>

  <div>DOWNLOAD</div>
  {#each methods as text}
    <p class="body-rg">{@html text}</p>
  {/each}
</div>
