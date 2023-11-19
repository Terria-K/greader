<script lang="ts">
  import { Link } from "svelte-routing";
  import { createEventDispatcher } from "svelte";

  export const click = createEventDispatcher();

  export let link: string | null = null;
</script>

{#if link}
<div class="link">
  <Link to={link}>
    <slot/>
  </Link>
</div>
{:else}
<button class="button" on:click={() => click('click')}>
  <slot/>
</button>
{/if}


<style>

.button {
  justify-content: center;
  color: white;
  cursor: pointer;
  background: none;
  box-shadow: none;
  transition: 300ms;
}

.button:hover {
  color: black;
  background-color: rgba(156, 156, 156, 0.452);
}

.link {
  display: flex;
  align-items: center;
  padding: 8px;
  text-decoration: none;
}

/** just why??? */
:global(a) {
  color: white;
}
</style>