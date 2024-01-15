<script lang="ts">
  import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte'

  let open = false;
  export let title: string;
</script>


<button type="button" class="flex items-center cursor-pointer 
  text-white p-0 w-full h-[60px] bg-std-accordion-gray rounded 
  focus:bg-std-accordion-gray" on:click|preventDefault={() => open = !open}>
  <div class="m-7 w-full flex justify-between">
    <p class="font-bold text-xl">{title}</p>
    <div class="mt-4 w-8 h-8 transition-all duration-300" 
      class:open={open} 
      class:close={!open}>
      <FaChevronDown/>
    </div>
  </div>
</button>

<div class="grid">
  <div class={`bg-std-dark transition-all w-full duration-300 overflow-hidden border-white border-solid 
    border-t-0 border-l-0 border-r-0 border-b-2 rounded-md
    ${open ? 'max-h-full ease-out' : 'max-h-0 ease-in'}`}>
    <slot/>
  </div>
</div>


<style>

.open {
  animation-name: Open;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.close {
  animation-name: Close;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: backwards;
}

@keyframes Open {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

@keyframes Close {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>