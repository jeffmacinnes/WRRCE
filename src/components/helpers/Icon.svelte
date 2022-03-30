<script>
  import feather from "feather-icons";

  export let name;
  export let width = "1em";
  export let height = "1em";
  export let stroke = undefined;
  export let strokeWidth = undefined;
  export let rotation = 0; // deg

  $: icon = feather.icons[name];
  $: if (icon) {
    if (stroke) icon.attrs["stroke"] = stroke;
    if (strokeWidth) icon.attrs["stroke-width"] = strokeWidth;
  }
</script>

{#if icon}
  <svg {...icon.attrs} style="width: {width}; height: {height}; transform: rotate({rotation}deg);">
    <g>
      {@html icon.contents}
    </g>
  </svg>
{/if}

<style>
  /* * {
    border: solid 1px red;
  } */

  svg {
    width: 1em;
    height: 1em;
    overflow: visible;
    transform-origin: 50% 50%;
  }
</style>
