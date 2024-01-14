<script lang="ts">
  import Accordion from '../Accordion/Accordion.svelte';

  export let subjectName: string;
</script>

<Accordion title={subjectName}>
  {#each {length: 4} as _, i}
  <form class="h-auto bg-std-dark p-5 [&:nth-child(even)]:bg-std-darker" on:submit|preventDefault>
    <p class="m-0 mb-5 font-bold text-2xl">{subjectName} {i + 1}</p>
    <label>
      Score:
      <input type="number">
      / 20
    </label>
  </form>
  {/each}
</Accordion>


<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  text-align: center;
  appearance: textfield;
  width: 30px
}
</style>