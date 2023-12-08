<script>
  import { createEventDispatcher } from "svelte";
  import IoMdClose from "svelte-icons/io/IoMdClose.svelte";
  import { sineOut } from "svelte/easing";
  import { fade, scale } from "svelte/transition";

  const close = createEventDispatcher();

  export let noExit = false;
  export let active = false;
</script>

{#if active}
<div class="fade-modal" transition:fade={{ duration: 230, easing: sineOut }}>
  <div class="modal" transition:scale={{ duration: 230, easing: sineOut }}>
{#if !noExit}
    <div class="corner">
      <button class="close-button" on:click={() => {
        close('close');
        active = false;
      }}>
        <IoMdClose/>
      </button>
    </div>
{/if}
    <slot/>
  </div>
</div>
{/if}


<style>
.fade-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.603);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.modal {
  position: relative;
  background-color: rgb(66, 66, 66);
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  width: 680px;
  height: 580px;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  z-index: 10;
}

.corner {
  position: absolute;
  margin: 10px;
}

.close-button {
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  color: white;
  box-shadow: none;
  cursor: pointer;
  transition: 300ms;
  border-radius: 50%;
}

.close-button:hover {
  background-color: rgb(97, 97, 97);
}
</style>