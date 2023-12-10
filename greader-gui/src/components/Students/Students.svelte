<script lang="ts">
  import { collection, onSnapshot, orderBy, query, type Unsubscribe } from "firebase/firestore";
  import StudentsAdd from "../Document/StudentsAdd.svelte";
  import CreateStudentsModal from "./CreateStudentsModal.svelte";
  import { FirestoreApp } from "../../firebase";
  import { onDestroy, onMount } from "svelte";
  import { students, type Students } from "../../composables/stores";
  import StudentsSelect from "../Document/StudentsSelect.svelte";

  let studentCol = query(
    collection(FirestoreApp, "students"), 
    orderBy("name", "desc"));

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

<CreateStudentsModal bind:active={createStudentActive}/>

<div class="panel">
  <div class="panel-box">
    <div class="students-panel">
      {#each $students as student}
        <StudentsSelect name={student.name} asButton={true}/>
      {/each}
      <StudentsAdd on:click={() => createStudentActive = true}/>
    </div>
  </div>
</div>

<style>
.panel {
  padding-top: 54px;
  flex-direction: column;
}

.panel-box {
  z-index: -1;
  position: absolute;
  margin: 10px;
  width: 95%;
  height: 80%;
  background-color: rgb(31, 31, 31);
  border-radius: 10px;
  border: 2px solid white;
}

.students-panel {
  overflow-y: auto;
  width: 280px;
  height: 100%;
  background-color: rgb(37, 37, 37);
  border-radius: 10px 0px 0px 10px;
  border-style: solid;
  border-color: white;
  border-width: 2px;
  border-top: 0;
  border-bottom: 0;
  border-left: 0;
}
</style>