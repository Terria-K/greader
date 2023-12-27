<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const click = createEventDispatcher<{click: number}>();

  let currentId = 0;

  function clicked(id: number) {
    currentId = id;
    click('click', id);
  }
</script>

<div class="tab">
  <button class:selected={currentId == 0} on:click={() => clicked(0)}>Grades</button>
  <button class:selected={currentId == 1} on:click={() => clicked(1)}>Info</button>
</div>

<style>
.tab {
  width: 100%;
  display: flex;
  border: 2px solid white;
  border-left: 0;
  border-right: 0;
  border-top: 0;
}

button {
  padding: 0.8rem;
  border: 2px solid white;
  border-left: 0;
  border-top: 0;
  border-bottom: 0;
  border-radius: 0 0 5px 0;
  cursor: pointer;
  color: white;
  background-color: rgb(36, 36, 36);
}

button.selected {
  background-color: rgb(49, 49, 49);
}
</style>