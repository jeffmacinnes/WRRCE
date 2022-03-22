<script context="module">
  // Pass the key of the current path for the transitions
  export const load = async ({ url }) => {
    console.log("here", url);
    return { props: { url } };
  };
</script>

<script>
  import "$styles/app.css";
  import Footer from "$components/Footer.svelte";
  import Navigation from "$components/Navigation.svelte";
  import PageTransition from "$components/helpers/PageTransition.svelte";

  export let url;

  $: console.log("layout url: ", url);
</script>

<main id="content">
  <Navigation />
  <PageTransition {url}>
    <slot />
    <Footer />
  </PageTransition>
</main>
