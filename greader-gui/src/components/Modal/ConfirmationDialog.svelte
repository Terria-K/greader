<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { sineOut } from "svelte/easing";
  import { fade, scale } from "svelte/transition";

  const click = createEventDispatcher();

  export let content: string;

  export let active: boolean = false;

  export let red: "Yes" | "No" = "No";

  function onClick(eventName: "yes" | "no") {
    switch (eventName) {
      case "yes": click("yes"); break;
      case "no": click("no");
    }
    active = false;
  }
</script>

{#if active}
<div class="fade-modal" transition:fade={{ duration: 230, easing: sineOut }}>
  <div class="confirmation" transition:scale={{ duration: 230, easing: sineOut }}>
    <p>{content}</p>

    <div class="buttons">
      <button class:red={red == "Yes"} on:click|preventDefault={() => onClick("yes")}>Yes</button>
      <button class:red={red == "No"} on:click|preventDefault={() => onClick("no")}>No</button>
    </div>
  </div>
</div>
{/if}

<style>
.red {
  background-color: rgb(194, 2, 2);
}

.red:hover {
  background-color: rgb(255, 53, 53);
}
  
p {
  font-size: 20px;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
}

button {
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  color: white;
  border-radius: 10px;
  background-color: rgb(61, 139, 74);
  transition: 300ms;
}

button:hover {
  background-color: rgb(95, 209, 114);
}

.confirmation {
  padding: 5px 12px 5px 12px;
  position: relative;
  background-color: rgb(66, 66, 66);
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  min-width: 300px;
  min-height: 120px;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  z-index: 10;
}

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
</style>