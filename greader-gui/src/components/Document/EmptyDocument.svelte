<script>
  import { createEventDispatcher } from "svelte";

  const click = createEventDispatcher();
</script>

<div class="bg-std-gray rounded shadow w-[250px] h-auto ml-2 mb-3 min-w-[220px] min-h-[120px] text-center">
  <div class="flex items-center justify-between flex-col">
    <h1 class="text-xl select-none">Create Document</h1>
    <p class="text-xl font-semibold mt-[1px]"/>
    <div class="mt-10 select-none">
      <button class="p-[10px] font-bold w-10 rounded-[50%] text-white bg-green transition-all duration-300 cursor-pointer mb-3 hover:bg-light-green"
      on:click={() => click('click')}>+</button>
    </div>
  </div>
</div>

<style>
.shadow {
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
}
</style>