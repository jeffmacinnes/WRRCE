<script>
  import Icon from "$components/helpers/Icon.svelte";

  export let icon = "anchor";
  export let color = "#000000";
  export let text = "Click here";
  export let fontSize = "1em";
  export let iconSize = "1.8em";
  export let iconFirst = false;
  export let rotation = 0;
  export let lineSize = "2px";
  export let textClass = "body-rg-link"; // override the class applied to the text
  export let onClick = () => {};

  let iconLast = !iconFirst;
</script>

<div class="cta-container" on:click={onClick}>
  <Icon name={icon} width={iconSize} height={iconSize} {rotation} />
  <div class="spacer" />
  <div
    class={`text-container ${textClass}`}
    style:font-size={fontSize}
    style:--color={color}
    style:--line-size={lineSize}
  >
    {text}
  </div>
</div>

<style lang="scss">
  // * {
  //   border: solid 1px red;
  // }

  .cta-container {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    &.iconLast {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
  }

  .spacer {
    width: 10px;
  }

  .text-container {
    margin: 0;
    display: inline-block;
    position: relative;
    --color: red; // dynamic variable that can be overwritten in js above and passed to pseudoselector
    --line-size: 2px;

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: var(--line-size);
      bottom: 0;
      left: 0;
      background: var(--color);
      transform-origin: bottom left;
    }

    &:hover:after {
      transform: scaleX(1);
      transform-origin: bottom left;
      transition: transform 0.25s ease-out;
    }
  }
</style>
