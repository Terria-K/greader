<script lang="ts">
  import { getContext } from "svelte";
  import MdChevronRight from "svelte-icons/md/MdChevronRight.svelte";
  import type { Writable } from "svelte/store";

  const { index, count, currentState } = getContext<{
    index: () => number, 
    count: Writable<number>,
    currentState: Writable<number>
  }>("breadIndex");
  const state = index();
  export let title: string;
</script>

<a 
  class:canClick={$currentState > state} href={null} 
  on:click={() => { 
      if ($currentState > state)
        $currentState = state
    }
  }
  class:on={$currentState < state}>{title}</a>
{#if $count != state}
  <div class="arrow">
    <MdChevronRight/>
  </div>
{/if}

<slot/>
<style>
a {
  margin: 0;
  font-size: 16px;
  transition: 300ms;
}
a:hover {
  color: white;
}

a.canClick {
  cursor: pointer;
}

a.canClick:hover {
  cursor: pointer;
  color: rgb(95, 209, 114);
}

.arrow {
  width: 20px;
  height: 20px;
}

.on {
  color: gray;
}
</style>