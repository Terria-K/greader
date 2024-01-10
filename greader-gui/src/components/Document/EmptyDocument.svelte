<script>
  import { createEventDispatcher } from "svelte";

  const click = createEventDispatcher();
</script>

<div class="documents">
  <div class="documents-holder">
    <h1>Create Document</h1>
    <p class="documents-title"/>
    <div class="viewbutton">
      <button on:click={() => click('click')}>+</button>
    </div>
  </div>
</div>

<style>
h1 {
  font-size: 20px;
}

.viewbutton {
  margin-top: 1.8rem;
}

button {
  padding: 10px;
  font-weight: bold;
  width: 40px;
  border-radius: 50%;
  color: white;
  background-color: rgb(61, 139, 74);
  transition: 300ms;
  cursor: pointer;
  margin-bottom: 10px;
}

button:hover {
  background-color: rgb(95, 209, 114);
}

.documents {
  background-color: rgb(238, 238, 238);
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  width: auto;
  height: auto;
  margin-left: 6px;
  margin-bottom: 10px;
  min-width: 220px;
  min-height: 120px;
}

:global(body.dark-mode) .documents {
  background-color: rgb(66, 66, 66);
}

.documents-title {
  font-size: 20px;
  font-weight: 600;
  margin-top: 1px;
}

.documents-holder {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
</style>