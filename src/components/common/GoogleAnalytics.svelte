<script>
  import { page } from "$app/stores";
  $: {
    if (typeof gtag !== "undefined") {
      // gtag comes from window, so make sure it exists first
      gtag("config", "G-KXVZJSMS7P", {
        page_title: $page.url.href,
        page_path: $page.url.href
      });
    }
  }
</script>
