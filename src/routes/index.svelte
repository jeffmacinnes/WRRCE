<script context="module">
  import { client } from "$utils/SanityClient";
  export const prerender = true;

  export async function load() {
    // ready copy from Sanity
    const query = "*[_id == 'landingPage' || _id == 'explorePage' || _type == 'tooltip']";
    const results = await client.fetch(query);
    return {
      props: {
        landingCopy: results.find((d) => d._id === "landingPage"),
        exploreCopy: results.find((d) => d._id === "explorePage"),
        tooltips: results.filter((d) => d._type === "tooltip")
      }
    };
  }
</script>

<script>
  import Landing from "$components/Landing.svelte";
  import ExploreIntro from "$components/ExploreIntro.svelte";
  import Explore from "$components/Explore.svelte";

  import mq from "$stores/mq.js";
  import { variableTooltips } from "$stores/dataStores.js";

  export let landingCopy;
  export let exploreCopy;
  export let tooltips;

  // put the tooltips for the data variables in a store since they'll be accessed multiple places
  variableTooltips.set(tooltips);
</script>

<Landing copy={landingCopy} />
<ExploreIntro copy={exploreCopy} />

{#if !$mq.sm && !$mq.md}
  <Explore />
{/if}
