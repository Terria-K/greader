<script lang="ts">
  import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
  import { fly } from "svelte/transition";
  import { sineOut } from "svelte/easing";
  import { createEventDispatcher } from 'svelte';

  const click = createEventDispatcher();

  function onClick() {
    click('click');
  }
</script>

<div class="card" in:fly={{duration: 200, easing: sineOut, x:-200}}>
  <button on:click|preventDefault={onClick} class="add">
    <div class="icon"><FaPlus/></div>
    <p class="m-0 text-xl">Add new students</p>
  </button>
</div>

<style>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: rgb(31, 31, 31);
  border: 2px solid  rgb(61, 139, 74);
  border-radius: 5px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}

.add {
  display: flex;
  height: 100%;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.add:hover {
  color: rgb(95, 209, 114);
}

.icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

button {
  color: white;
  padding: 0;
  border: none;
  background-color: transparent;
}
</style>