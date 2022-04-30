<script>
  import { createEventDispatcher } from "svelte";

  export let name; // variable name
  export let display = ""; // display name (if different from name)
  export let isSelected = false;

  const dispatch = createEventDispatcher();
</script>

<div
  class="checkbox-container body-rg"
  class:checked={isSelected}
  on:click={() => dispatch("toggleCheckbox", { name })}
>
  <span class="checkmark" />
  {display.length > 0 ? display : name}
</div>

<style lang="scss">
  .checkbox-container {
    display: block;
    position: relative;
    margin: 7px 2px;
    padding-left: 25px;
    line-height: 1.33;
    color: var(--color-g3);
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }

    // custom checkbox
    .checkmark {
      position: absolute;
      top: 3px;
      left: 0;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      border: solid 1px var(--color-g3);
      background-color: var(--color-white);
    }

    &.checked {
      color: var(--color-c3);

      .checkmark {
        background-color: var(--color-c4);
      }

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
