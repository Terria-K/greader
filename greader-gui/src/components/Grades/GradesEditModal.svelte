<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import IoMdClose from "svelte-icons/io/IoMdClose.svelte";
  import { sineOut } from "svelte/easing";
  import { fade, scale } from "svelte/transition";

  const close = createEventDispatcher();

</script>

<div class="fade-modal" transition:fade={{ duration: 230, easing: sineOut }}>
  <div class="modal" transition:scale={{ duration: 230, easing: sineOut }}>
    <div class="corner">
      <button class="close-button" on:click={() => {
        close('close');
      }}>
        <IoMdClose/>
      </button>
    </div>
  </div>
</div>

<style>
.fade-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.603);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background-color: rgb(66, 66, 66);
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  width: 580px;
  height: 95%;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
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

.corner {
  position: absolute;
  margin: 10px;
}
</style>