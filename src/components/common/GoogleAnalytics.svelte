<script>
  import { page } from "$app/stores";
  $: {
    if (typeof gtag !== "undefined") {
      gtag("config", "G-KXVZJSMS7P", {
        page_path: $page.path
      });
    }
  }
</script>
