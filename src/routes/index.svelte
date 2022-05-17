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
  import Meta from "$components/Meta.svelte";
  import Landing from "$components/Landing.svelte";
  import ExploreIntro from "$components/ExploreIntro.svelte";
  import Explore from "$components/Explore.svelte";

  import { variableTooltips } from "$stores/dataStores.js";

  export let landingCopy;
  export let exploreCopy;
  export let tooltips;

  // put the tooltips for the data variables in a store since they'll be accessed multiple places
  variableTooltips.set(tooltips);

  let description =
    "Tracking Compliance with Women's Rights Recommendations throughout Europe. New data and analytical tools to help scholars, practitioners and other stakeholders better understand how international human rights recommendations become reality";
</script>

<Meta url="https://www.wrrce.org/" {description} />
<Landing copy={landingCopy} />
<ExploreIntro copy={exploreCopy} />
<Explore />
