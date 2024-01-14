<script lang="ts">
  import { writable } from "svelte/store";
  import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.svelte";
  import ModalForm from "../Modal/ModalForm.svelte";
  import Crumbs from "../Breadcrumbs/Crumbs.svelte";
  import AvailCourseCard from "../Courses/AvailCourseCard.svelte";
  import StudentsSelect from "./StudentsSelect.svelte";
  import StudentsAdd from "./StudentsAdd.svelte";
  import CreateStudentsModal from "../Students/CreateStudentsModal.svelte";
  import { collection, onSnapshot, orderBy, query, where, type Unsubscribe } from "firebase/firestore";
  import { FirestoreApp } from "../../firebase";
  import { students, type Students } from "../../composables/stores";
  import { onDestroy, onMount } from "svelte";

  let breadState = writable(0);
  let sectionNameText = "";
  let semester = -1;
  let selectedCourse = -1;

  let studentCol = query(
    collection(FirestoreApp, "students"), 
    where("course", "==", "BSIT"),
    orderBy("name", "desc"));

  function validation(index: number): boolean {
    switch (index) {
      case 0:
        return sectionNameText != "";
      case 1:
        return selectedCourse != -1;
      case 2:
        return true;
      default:
        return false;
    }
  }

  export let active = false;
  let createStudentActive = false;

  let snapshotUnsubscriber: Unsubscribe

  onMount(() => {
    snapshotUnsubscriber = onSnapshot(studentCol, querySnapshot => {
      let studentList: Students[] = [];
      querySnapshot.forEach((doc) => {
        const todo: Students = { ...doc.data(), id: doc.id } as Students;
        studentList = [todo, ...studentList];
      })
      $students = studentList;
    })
  });

  onDestroy(() => {
    snapshotUnsubscriber();
  });
</script>


<ModalForm bind:active={active}>
  <p>Create Document</p>
  <Breadcrumbs bind:state={breadState}>
    <Crumbs title="Information"/>
    <Crumbs title="Select Subject"/>
    <Crumbs title="Add Students (Optional)"/>
  </Breadcrumbs>

  <form on:submit|preventDefault>
{#if $breadState == 0}
    <label>
      <p>Section Name</p>
      <input type="text" name="sectionName" bind:value={sectionNameText}/>
    </label>

    <label>
      <span>Academic Level</span>
      <select name="academicLevel">
        {#each {length: 4 } as _, i }
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>
    </label>
    <label>
      <span>Semester Level</span>
      <select name="semesterLevel">
        {#each {length: 2 } as _, i }
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>
    </label>

{:else if $breadState == 1}
    <div class="select-courses">
      <p>Available Courses</p>
      <div class="avail-list">
        {#each {length: 8 } as _, i}
        <AvailCourseCard selected={selectedCourse == i} on:click={() => selectedCourse = i}/>
        {/each}
      </div>
    </div>
{:else if $breadState == 2}
    <div class="add-student">
      <p>Add Students</p>
      <div class="student-container">
        {#each $students as student}
          <StudentsSelect name={student.name}/>
        {/each}
        <StudentsAdd on:click={() => createStudentActive = true}/>
      </div>
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


<CreateStudentsModal bind:active={createStudentActive}/>

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

.add-student {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.student-container {
  background-color: rgb(48, 48, 48);
  width: 400px;
  height: 310px;
  overflow-y: auto;
  border-radius: 10px;
  border: 0.13rem solid rgb(255, 255, 255);
}

.select-courses {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

label span {
  text-align: start;
  font-size: 20px;
  margin-bottom: 6px;
  margin-left: 20px;
}

input[type="text"] {
  font-size: 21px;
  padding: 6px;
  color: white;
  background-color: rgb(48, 48, 48);
  margin-left: 20px;
}

select {
  margin-top: 10px;
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