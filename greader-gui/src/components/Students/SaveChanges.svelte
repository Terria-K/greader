<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { bounceIn, bounceOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  const click = createEventDispatcher();
</script>


<div class="holder" 
  in:fly={{duration: 300, easing: bounceIn, y: 100}}
  out:fly={{duration: 500, easing: bounceOut, y: 100}}>
  <div class="save-changes">
    <p>Unsaved Changes were made</p>
    <div class="button-container">
      <button on:click|preventDefault={() => click("save-changes")}>Save Changes</button>
      <button class="reset" on:click|preventDefault={() => click("reset")}>Reset</button>
    </div>
  </div>
</div>


<style>
.holder {
  display: flex;
  width: 100%;
  bottom: 10px;
  position: fixed;
  justify-content: center;
}

p {
  font-weight: bold;
}

.button-container {
  margin-left: 10px;
  width: 200px;
  display: flex;
  justify-content: space-evenly;
}

.save-changes {
  padding: 4px 8px 4px 8px;
  background-color: rgb(66, 66, 66);
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  height: 50px;
}

button {
  padding: 12px 12px 12px 12px;
  cursor: pointer;
  color: white;
  border-radius: 10px;
  padding: 10px;
  background-color: rgb(61, 139, 74);
  transition: 300ms;
}

button:hover {
  background-color: rgb(95, 209, 114);
}

.reset {
  background-color: rgb(90, 90, 90);
}

.reset:hover {
  background-color: rgb(180, 180, 180);
}
</style>