<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export const click = createEventDispatcher();
  export let text: string;

</script>

<div>
  <p>
  <slot/>
  <button on:click={() => {
      click('click')
  }}>{text}</button>
  </p>
</div>

<style>

button {
  color: rgb(103, 103, 255);
  background-color: transparent;
  box-shadow: none;
  padding: 0.1em;
  cursor: pointer;
}

button:hover {
  color: rgb(155, 169, 253);
}
</style>