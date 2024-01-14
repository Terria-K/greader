<script lang="ts">
  import { onMount } from "svelte";
  import FaFlask from 'svelte-icons/fa/FaFlask.svelte'
  import FaPercent from 'svelte-icons/fa/FaPercent.svelte'
  import FaMarker from 'svelte-icons/fa/FaMarker.svelte'
  import Accordion from "../Accordion/Accordion.svelte";
  import FormulaButton from "./FormulaButton.svelte";
  import type { SubjectType } from "../../composables/stores";

  export let subject: SubjectType

  // Form variables
  let formName: string = "";
  let formulaIndex: number = 0;
  export let customFormulaActive = {
    active: false,
    subject: subject
  };

  onMount(() => {
    formName = subject.name;
  });

  function save() {
    subject.name = formName;
  }

  function formulaPreview() {
    if (formulaIndex == 0) {
      return "[100% + 100% + 100%] / 3"
    } else {
      return "[30% + 50% + 20%] / 3"
    }
  }
</script>


<Accordion title={subject.name}>
  <form class="h-auto p-5 bg-std-darker" on:submit|preventDefault>
    <div class="flex justify-between ml-[120px]">
      <div class="flex flex-col">
        <p class="text-xl font-bold m-0">Name</p>
        <label>
          <input type="text" bind:value={formName}/>
        </label>
        <div class="flex items-center">
          <p class="p-0 text-xl font-bold mr-2">Categories</p>
          <div>
            <button class="transition-all duration-300 p-0 m-0 w-8 h-8 cursor-pointer bg-green text-white hover:bg-light-green">+</button>
          </div>
        </div>
        <div class="flex flex-col w-[400px]">
          <Accordion title="Activities">
          </Accordion>
          <Accordion title="Task Performances">
          </Accordion>
          <Accordion title="Exams">
          </Accordion>
        </div>
        <div class="mt-5">
          <button class="bg-green hover:bg-light-green text-white cursor-pointer transition-all duration-300"
            on:click={save}>
              Save
          </button>
          <button class="bg-red hover:bg-light-red text-white cursor-pointer transition-all duration-300"
            on:click={save}>
              Delete
          </button>
        </div>
      </div>
      <div class="ml-0 mr-[120px] flex-col">
        <p class="text-center text-lg font-bold m-0">Formula</p>
        <div class="flex justify-center">
          <FormulaButton right={true} left={false} index={0} bind:currentIndex={formulaIndex}
            on:click={(e) => formulaIndex = e.detail} tooltip="Simple grade computation with fixed percentage">
            <FaMarker/>
          </FormulaButton>
          <FormulaButton right={false} left={false} index={1} bind:currentIndex={formulaIndex}
            on:click={(e) => formulaIndex = e.detail} tooltip="Allows for changing percentages per activities">
            <FaPercent/>
          </FormulaButton>
          <FormulaButton right={false} left={true} index={2} bind:currentIndex={formulaIndex}
            on:click={(e) => formulaIndex = e.detail} tooltip="Allows for customized computation for grades via scripting">
            <FaFlask/>
          </FormulaButton>
        </div>

        {#if formulaIndex != 2}
        {#key formulaIndex}
        <textarea readonly class="relative mt-4 rounded p-0 m-0 w-[250px] h-20 resize-none text-lg bg-std-dark text-white" 
          value={formulaPreview()}/>
        {/key}
        {:else}
        <button on:click={() => customFormulaActive = { active: true, subject: subject}} class="
          cursor-pointer w-[250px] h-20 bg-std-dark text-white rounded flex 
          transition-all duration-300 mt-4
          justify-center items-center font-bold text-xl hover:bg-std-gray">
          Show Script
        </button>
        {/if}
      </div>
    </div>
  </form>
</Accordion>