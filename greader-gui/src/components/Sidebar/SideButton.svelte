<script lang="ts">
  import { navigate } from "svelte-routing";
  import { createEventDispatcher } from "svelte";

  const click = createEventDispatcher();

  export let text: string;
  export let to: string | null = null;

  function toClicked() {
    click('click');
    navigate(to!, { replace: true });
  }
</script>

{#if to}
<button on:click={toClicked}>
  <div class="icon">
    <slot/>
  </div>
  <p>{text}</p>
</button>
{:else}
<button on:click={() => click('click')}>
  <div class="icon">
    <slot/>
  </div>
  <p>{text}</p>
</button>
{/if}


<style>
button {
  margin-top: 8px;
  height: 40px;
  display: flex;
  text-align: left;
  background-color: transparent;
  box-shadow: none;
  color: white;
  border-radius: 4px;
  width: 100%;
  transition: 300ms;
  align-items: center;
}

button:hover {
  cursor: pointer;
  background-color: rgba(105, 105, 105, 0.788);
}

.icon {
  margin-right: 6px;
  width: 30px;
  height: 30px;
}
</style>