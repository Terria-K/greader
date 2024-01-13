<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const click = createEventDispatcher<{view: string[]}>()

  export let title = "1ST Year";
  export let name = "BSIT11E";
</script>

<div class="bg-std-gray rounded shadow w-[250px] h-auto ml-2 mb-3 min-w-[220px] min-h-[120px] text-center">
  <div class="flex items-center justify-between flex-col">
    <h1 class="select-none">{title}</h1>
    <p class="text-xl font-semibold mt-[1px]">{name}</p>
  </div>
  <button class="select-none text-white p-3 rounded-xl bg-green transition-all duration-300 mb-3 cursor-pointer
                hover:bg-light-green hover:duration-300" 
    on:click={() => click('view', [title, name])}>View</button>
</div>

<style>
.shadow {
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
}
</style>