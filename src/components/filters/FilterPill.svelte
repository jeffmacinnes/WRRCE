<script>
  import { tooltip } from "$actions/tooltip";
  import { color } from "$data/variables.json";
  import Icon from "$components/helpers/Icon.svelte";
  import Tooltip from "$components/tooltips/Tooltip.svelte";

  export let title = "";
  export let name = "";
  export let onClose = () => {};

  let maxLength = 30;
  $: displayedName = name.length > maxLength ? `${name.slice(0, maxLength - 3)}...` : name;
</script>

<div class="pill-container shadow">
  <div class="content-container">
    <div class="title">{title}</div>
    <div
      class="name"
      use:tooltip={{
        component: Tooltip,
        props: { text: name }
      }}
    >
      {displayedName}
    </div>
  </div>
  <div class="close-container" on:click={onClose}>
    <Icon name="x" width="16px" height="16px" stroke={color.c3} strokeWidth="3px" />
  </div>
</div>

<style lang="scss">
  .pill-container {
    display: inline-flex;
    max-width: 300px;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    padding: 6px 13px;
    margin: 2px;
    background-color: var(--color-c3);
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .title {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.005em;
      line-height: 11px;
      color: var(--color-c1);
    }

    .name {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.005em;
      line-height: 1.333;
      color: var(--color-white);
      cursor: pointer;
    }
  }

  .close-container {
    width: 20px;
    min-width: 20px;
    height: 20px;
    margin-left: 40px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
