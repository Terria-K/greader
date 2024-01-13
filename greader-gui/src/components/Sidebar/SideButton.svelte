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
  
  function clicked() {
    if (to) {
      toClicked();
    } else {
      click('click');
    }
  }
</script>

<button class="flex mt-2 h-10 text-left bg-transparent text-white shadow-none rounded 
  w-full transition-all duration-300 items-center cursor-pointer hover:bg-transparent-white" 
  on:click={clicked}>
  <div class="mr-1 w-8 h-8">
    <slot/>
  </div>
  <p>{text}</p>
</button>
