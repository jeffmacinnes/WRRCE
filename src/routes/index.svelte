<script context="module">
  import { client } from "$utils/SanityClient";
  export const prerender = true;

  export async function load() {
    // ready copy from Sanity
    const query = "*[_id == 'landingPage' || _id == 'explorePage']";
    const results = await client.fetch(query);
    return {
      props: {
        landingCopy: results.find((d) => d._id === "landingPage"),
        exploreCopy: results.find((d) => d._id === "explorePage")
      }
    };
  }
</script>

<script>
  import Meta from "$components/Meta.svelte";
  import Landing from "$components/Landing.svelte";
  import ExploreIntro from "$components/ExploreIntro.svelte";
  import Explore from "$components/Explore.svelte";

  export let landingCopy;
  export let exploreCopy;
</script>

<Meta />
<Landing copy={landingCopy} />
<ExploreIntro copy={exploreCopy} />
<Explore />
