<script>
  export let title = "WRRCE";
  export let description = "Description";
  export let url = "https://wrrce.org";
  export let keywords = "";
  export let preloadFont = [];

  import GoogleAnalytics from "$components/common/GoogleAnalytics.svelte";
</script>

<svelte:head>
  <GoogleAnalytics />
  <title>{title}</title>
  <link rel="icon" href="{url}/assets/favicon.svg" />
  <meta name="description" content={description} />
  <meta name="author" content="" />
  <meta name="news_keywords" content={keywords} />

  <meta property="og:title" content={title} />
  <meta property="og:site_name" content="Women's Rights Recommendation & Compliance Explorer" />
  <meta property="og:url" content={url} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="en_US" />

  <meta property="og:image" content="{url}/assets/social.png" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="600" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="https://www.wrrce.org" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image:src" content="{url}/assets/social.png" />

  <meta name="robots" content="max-image-preview:large" />

  <link rel="canonical" href="{url}/" />

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-KXVZJSMS7P"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-KXVZJSMS7P");
  </script>

  {#each preloadFont as href}
    <link rel="preload" {href} as="font" type="font/woff2" crossorigin />
  {/each}
</svelte:head>
