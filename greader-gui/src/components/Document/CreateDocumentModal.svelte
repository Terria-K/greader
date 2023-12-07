<script lang="ts">
  import { writable } from "svelte/store";
  import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.svelte";
  import ModalForm from "../Modal/ModalForm.svelte";
  import Crumbs from "../Breadcrumbs/Crumbs.svelte";
    import AvailCourseCard from "./AvailCourseCard.svelte";

  let breadState = writable(0);
  let sectionNameText = "";
  let selectedCourse = -1;

  function validation(index: number): boolean {
    switch (index) {
      case 0:
        return sectionNameText != "";
      case 1:
        return selectedCourse != -1;
      default:
        return false;
    }
  }

  export let active = false;
</script>

<ModalForm bind:active={active}>
  <p>Create Document</p>
  <Breadcrumbs bind:state={breadState}>
    <Crumbs title="Information"/>
    <Crumbs title="Select Courses"/>
    <Crumbs title="Add Students"/>
  </Breadcrumbs>

  <form>
{#if $breadState == 0}
    <label>
      <span>Academic Level</span>
      <select name="academicLevel">
        {#each {length: 4 } as _, i }
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>
    </label>

    <label>
      <p>Section Name</p>
      <input type="text" name="sectionName" bind:value={sectionNameText}/>
    </label>
{/if}
{#if $breadState == 1}
    <p>Available Courses</p>
    <div class="avail-list">
      {#each {length: 8 } as _, i}
      <AvailCourseCard selected={selectedCourse == i} on:click={() => selectedCourse = i}/>
      {/each}
    </div>

{/if}
  </form>



  <div class="button-container">
    <button on:click={() => $breadState--} 
    disabled={$breadState== 0}>Back</button>

{#key (sectionNameText && selectedCourse)}
    <button on:click={() =>{
        if ($breadState != 2) {
          $breadState++
          return;
        }
        // addItem();
      } 
    } disabled={!validation($breadState)}>{$breadState == 2 ? "Create" : "Next"}</button>
{/key}
  </div>
</ModalForm>

<style>
button {
  cursor: pointer;
  color: white;
  border-radius: 10px;
  padding: 10px;
  background-color: rgb(61, 139, 74);
  transition: 300ms;
}

button:hover {
  background-color: rgb(95, 209, 114);
}

button:disabled {
  cursor: default;
  background-color: rgb(48, 83, 50);
  color: gray;
}

.button-container {
  position: absolute;
  width: 100%;
  justify-content: center;
  display: flex;
  bottom: 10px;
}

.button-container button {
  margin-left: 10px;
  margin-right: 10px;
}

form {
  width: 100%;
  display: flex;
  align-items: baseline;
  flex-direction: column;
  margin: 20px;
}

label p {
  text-align: start;
  font-size: 20px;
  margin-bottom: 6px;
}

label span {
  text-align: start;
  font-size: 20px;
  margin-bottom: 6px;
}

input[type="text"] {
  font-size: 21px;
  padding: 6px;
  color: white;
  background-color: rgb(48, 48, 48);
}

select {
  border-radius: 10px;
  font-size: 16px;
  width: 2.5rem;
  height: 2.5rem;
  color-scheme: dark;
  border: none;
}

.avail-list {
  display: flex;
  flex-wrap: wrap;
  width: 550px;
  height: 200px;
  justify-content: center;
  overflow-y: auto;
}
</style>