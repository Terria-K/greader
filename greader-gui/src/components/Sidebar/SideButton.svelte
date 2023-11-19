<script lang="ts">
  import { navigate } from "svelte-routing";

  export let text: string;
  export let to: string | null = null;
  export let onClick: (() => void) | (() => Promise<void>) | null = null!;

  function toClicked() {
    if (onClick) {
      onClick();
    }
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
<button on:click={onClick}>
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