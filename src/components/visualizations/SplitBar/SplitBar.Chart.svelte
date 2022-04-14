<script>
  import { getContext } from "svelte";
  const { data, width, height } = getContext("LayerCake");

  // console.log("chart", $data);
</script>

<g>
  <rect width={$width} height={$height} fill="red" />
</g>
