<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DiCode from 'svelte-icons/di/DiCode.svelte'

  const click = createEventDispatcher();

  export let selected = false;
</script>

<button 
  class="card" class:selected on:click|preventDefault={() => click('click')}>
  <p>BSIT</p>
  <div class="icon">
    <DiCode/>
  </div>
</button>

<style>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0;
  margin-right: 20px;
  margin-top: 20px;
  padding: 0;
  width: 110px;
  height: 110px;
  background-color: rgba(107, 107, 107, 0.555);
  border-radius: 10px;
  cursor: pointer;
  transition: 300ms;
} 

.card:hover {
  background-color: rgba(196, 196, 196, 0.555);
}

.card.selected:hover {
  background-color: rgb(95, 209, 114);
}

.card p {
  font-size: 22px;
  margin: 0;
}

.icon {
  width: 60px;
  height: 60px;
}

.selected {
  background-color: rgb(95, 209, 114);
}
</style>