<script lang="ts">
  import { writable } from "svelte/store";
  import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.svelte";
  import ModalForm from "../Modal/ModalForm.svelte";
  import Crumbs from "../Breadcrumbs/Crumbs.svelte";
  import AvailCourseCard from "../Courses/AvailCourseCard.svelte";
  import { CollectionReference, addDoc, collection, type DocumentData } from "firebase/firestore";
  import { FirestoreApp } from "../../firebase";
  import { error, success } from "../../composables/toast";

  export let active = false;

  let studentCol: CollectionReference<DocumentData, DocumentData> = collection(FirestoreApp, "students");
  let state = writable(0);

  let studentName: string = "";
  let studentID: number = 0;
  let selectedCourse: number = -1;
  let level = 0;

  function validation(index: number): boolean {
    switch (index) {
      case 0:
        return studentName != "" && studentID != 0 && level != 0;
      case 1: 
        return selectedCourse != -1;
      default:
        return false;
    }
  }

  async function addItem() {
    const student = {
      name: studentName,
      usn: studentID,
      course: "BSIT",
      subjects: [],
      yearLevel: level
    }
    studentName = "";
    studentID = 0;
    selectedCourse = -1;
    level = 0;

    try {
      await addDoc(studentCol, student);
      success("Success", "Student has been created!");
    }
    catch (e) {
      console.log(e);
      error("Failed", "Error occurred! Please try again later.");
    }
    finally {
      $state = 0;
      active = false;
    }
  }
</script>

<ModalForm bind:active={active}>
  <p>Create Student</p>
  <Breadcrumbs {state}>
    <Crumbs title="Set Information"/>
    <Crumbs title="Select Courses"/>
  </Breadcrumbs>

  <form>
{#if $state == 0}
    <label>
      <p>Student Name</p>
      <input type="text" bind:value={studentName}/>
    </label>
    <label>
      <p>Student ID</p>
      <input type="number" bind:value={studentID} />
    </label>
    <label>
      <span>Academic Level</span>
      <select name="academicLevel" bind:value={level}>
        {#each {length: 4 } as _, i }
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>
    </label>
{:else if $state == 1}
    <div class="select-courses">
      <p>Available Courses</p>
      <div class="avail-list">
        {#each {length: 8 } as _, i}
        <AvailCourseCard selected={selectedCourse == i} on:click={() => selectedCourse = i}/>
        {/each}
      </div>
    </div>
{/if}
  </form>

  <div class="button-container">
    <button on:click={() => $state--} 
    disabled={$state == 0}>Back</button>

    {#key (studentID && studentName && level && selectedCourse)}
    <button on:click={async () =>{
        if ($state != 1) {
          $state++
          return;
        }
        await addItem();
      } 
    } disabled={!validation($state)}>{$state == 1 ? "Create" : "Next"}</button>
    {/key}
  </div>
</ModalForm>

<style>

.avail-list {
  display: flex;
  flex-wrap: wrap;
  width: 550px;
  height: 200px;
  justify-content: center;
  overflow-y: auto;
}

.select-courses {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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
}

label p {
  text-align: start;
  font-size: 20px;
  margin-bottom: 6px;
  margin-left: 20px;
}

input[type="text"], input[type="number"] {
  font-size: 21px;
  padding: 6px;
  margin-left: 20px;
}


label span {
  text-align: start;
  font-size: 20px;
  margin-bottom: 6px;
  margin-left: 20px;
}


select {
  margin-top: 10px;
  border-radius: 10px;
  font-size: 16px;
  width: 2.5rem;
  height: 2.5rem;
  color-scheme: dark;
  border: 2px solid rgb(49, 49, 49);
}
</style>