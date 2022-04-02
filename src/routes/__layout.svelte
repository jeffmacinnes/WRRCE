<script context="module">
  // Pass the key of the current path for the transitions
  // export const load = async ({ url }) => ({ props: { url } });
</script>

<script>
  import "$styles/app.css";
  import Footer from "$components/Footer.svelte";
  import Navigation from "$components/Navigation.svelte";
  import PageTransition from "$components/helpers/PageTransition.svelte";

  // export let url;

  let w;
</script>

<main id="content" bind:clientWidth={w}>
  <Navigation />
  <div class="bg" style:width={`${w}px`} style:height={`${w}px`} />
  <!-- <PageTransition {url}> -->
  <slot />
  <Footer />
  <!-- </PageTransition> -->
</main>

<style>
  .bg {
    position: fixed;
    max-width: 1200px;
    max-height: 1200px;
    top: 0;
    left: 50%;
    border-radius: 50%;
    background-color: var(--color-a1);
    transform: translate(-100%);
    opacity: 15%;
    z-index: -1;
  }
</style>
