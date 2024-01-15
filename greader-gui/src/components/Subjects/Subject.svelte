<script lang="ts">
  import { onMount } from "svelte";
  import FaFlask from 'svelte-icons/fa/FaFlask.svelte';
  import FaPercent from 'svelte-icons/fa/FaPercent.svelte';
  import FaMarker from 'svelte-icons/fa/FaMarker.svelte';
  import Accordion from "../Accordion/Accordion.svelte";
  import FormulaButton from "./FormulaButton.svelte";
  import type { SubjectType } from "../../composables/stores";
  import { doc, updateDoc } from "firebase/firestore";
  import { FirestoreApp } from "../../firebase";
  import { error, success } from "../../composables/toast";

  export let subject: SubjectType;

  // Form variables
  let formName: string = "";
  let formulaIndex: number = 0;
  export let customFormulaActive = {
    active: false,
    subject: subject
  };

  export let categoryActive = {
    active: false,
    subject: subject
  };

  onMount(() => {
    formName = subject.name;
    switch (subject.formula) {
      case "Basic": formulaIndex = 0; break;
      case "Percentage": formulaIndex = 1; break;
      case "Customized": formulaIndex = 2; break;
    }
  });

  function indexToString() {
    switch (formulaIndex) {
      default: return "Basic";
      case 1: return "Percentage";
      case 2: return "Customized";
    }
  }

  let saving = false;

  async function save() {
    if (saving)
      return;  
    saving = true;
    subject.name = formName;
    let docRef = doc(FirestoreApp, "subjects/" + subject.id);

    let update: SubjectType = {
      name: subject.name,
      id: subject.id,
      categories: subject.categories,
      formula: indexToString(),
      script: subject.script
    };
    try {
      await updateDoc(docRef, update);
      success("Success", "Subject has been saved!");
    } catch (e) {
      console.error(e);
      error("Failed to save", "Failed to save a subject");
    } finally {
      saving = false;
    }
  }

  function formulaPreview() {
    let categories = Object.entries(subject.categories);
    let str = "(";
    if (formulaIndex == 0) {
      categories.forEach(([_, _v], i) => {
        str += "100%";
        if (i != categories.length - 1) {
          str += "100% + ";
        }
      });
    } else {
      categories.forEach(([_, v], i) => {
        str += v.percentage + "%";
        if (i != categories.length - 1) {
          str += "100% + ";
        }
      });
    }
    str += ")";
    str += " / " + categories.length;
    return str;
  }
</script>


<Accordion title={subject.name}>
  <form class="h-auto p-5 bg-std-darker" on:submit|preventDefault={save}>
    <div class="flex justify-between ml-[60px]">
      <div class="flex flex-col">
        <p class="text-xl font-bold m-0">Name</p>
        <label>
          <input type="text" bind:value={formName}/>
        </label>
        <div class="flex items-center">
          <p class="p-0 text-xl font-bold mr-2">Categories</p>
          <div>
            <button type="button" class="transition-all duration-300 p-0 m-0 w-8 h-8 cursor-pointer bg-green text-white hover:bg-light-green"
              on:click|preventDefault={() => categoryActive = { active: true, subject: subject}}>
              +
            </button>
          </div>
        </div>
        <div class="flex flex-col w-[600px]">
          {#each Object.entries(subject.categories) as [key, value]}
          <Accordion title={key}>
            <form class="h-auto p-5 bg-std-darker" on:submit|preventDefault>
              <div class="flex">
                <label>
                  Percentage
                  <input disabled={formulaIndex != 1} type="number" class="w-8 text-center" value={value.percentage}/>
                  <span>%</span>
                </label>             
              </div>
              <div class="flex flex-col">
                {#each value.activities as activity}
                <p class="mt-4 text-xl font-bold m-0">{activity.name}</p>
                <label class="ml-2">
                  Total Score
                  <input type="number" class="w-8 text-center" value={activity.maxScore} maxlength="3" max="999"/>
                </label>
                {/each}
                <div>
                  <button class="mt-5 p-2 text-white bg-green hover:bg-light-green
                    transition-all duration-300 cursor-pointer">+ Add more {key}</button>
                </div>
              </div>
            </form>
          </Accordion>
          {/each}
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
      <div class="ml-0 mr-[60px] flex-col">
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