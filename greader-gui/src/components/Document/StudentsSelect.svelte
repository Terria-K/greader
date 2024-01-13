<script lang="ts">
  import MdAccountCircle from "svelte-icons/md/MdAccountCircle.svelte";
  import Checkbox from "../Checkbox/Checkbox.svelte";
  import { fly } from "svelte/transition";
  import { sineOut } from "svelte/easing";
  import { createEventDispatcher } from "svelte";

  export let selected = false;
  export let name: string;
  export let asButton: boolean = false;

  const click = createEventDispatcher();

  function onClick() {
    click('click');
  }
</script>

<div class="card" class:selected={asButton && selected} in:fly={{duration: 200, easing: sineOut, x:-200}}>
{#if !asButton}
  <div class="container">
    <Checkbox bind:checked={selected}>
      <div class="flex items-center">
        <div class="icon">
          <MdAccountCircle/>
        </div>
      </div>
    </Checkbox>
  </div>
  <span>{name}</span>
{:else}
  <button on:click|preventDefault={onClick}>
    <div class="flex items-center">
      <div class="icon">
        <MdAccountCircle/>
      </div>
    </div>
    <span>{name}</span>
  </button>
{/if}
</div>

<style>
.card {
  display: flex;
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

.card.selected {
  background-color: rgb(44, 44, 44);
  border-color: rgb(72, 179, 115);
}

.container {
  margin-left: 15px;
  display: flex;
  width: 70px;
  height: 100%;
  text-align: center;
  align-items: center;
  font-size: 16px;
}

button {
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  box-shadow: none;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon {
  width: 30px;
  height: 30px;
}

span {
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>