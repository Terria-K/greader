<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  const click = createEventDispatcher<{click: number}>()

  export let index: number;
  export let currentIndex: number;
  export let left = false;
  export let right = false;
  export let tooltip = "";

  let tooltipShown = false;

  function clicked() {
    click('click', index);
  }

  let timeout: NodeJS.Timeout;

  function buttonHovered() {
    if (tooltip) {
      timeout = setTimeout(() => {
        tooltipShown = true;
      }, 500)
    }
  }

  function buttonLeave() {
    if (timeout) {
      tooltipShown = false;
      clearTimeout(timeout)
    }
  }
</script>



<button 
  on:mouseenter={buttonHovered}
  on:mouseleave={buttonLeave}
  class={`transition-all duration-300 p-2 w-16 h-16 cursor-pointer ${currentIndex == index ? 
  'bg-white text-black' : 'bg-transparent-white'} 
  ${!left ? 'rounded-r-none' : ''} ${!right ? 'rounded-l-none' : ''}`} 
  on:click={clicked}>

  <slot/>
  {#if tooltipShown}
    <div class="sticky z-[2] w-[150px] p-3 bg-std-semidark rounded text-white mt-2" transition:fly>
      {tooltip}
    </div>
  {/if}
</button>
