<script>
  import inView from "$actions/inView";

  let loadComponent;
  export { loadComponent as this };

  let isShowingComponent = false;
  let componentPromise;
</script>

{#if !isShowingComponent}
  <div
    use:inView={{ root: document.querySelector("#data-table") }}
    on:enter={() => {
      componentPromise = loadComponent();
      isShowingComponent = true;
    }}
  />
{:else}
  {#await componentPromise}
    <slot name="loading">Loading...</slot>
  {:then { default: TableRow }}
    <slot name="component" {TableRow} />
  {/await}
{/if}
