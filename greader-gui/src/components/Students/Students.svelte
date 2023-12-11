<script lang="ts">
  import { collection, doc, onSnapshot, orderBy, query, updateDoc, type Unsubscribe, deleteDoc } from "firebase/firestore";
  import StudentsAdd from "../Document/StudentsAdd.svelte";
  import CreateStudentsModal from "./CreateStudentsModal.svelte";
  import { FirestoreApp } from "../../firebase";
  import { onDestroy, onMount } from "svelte";
  import { students, type Students } from "../../composables/stores";
  import StudentsSelect from "../Document/StudentsSelect.svelte";
    import CourseCard from "../Courses/CourseCard.svelte";
    import { fly } from "svelte/transition";

  let studentCol = query(
    collection(FirestoreApp, "students"), 
    orderBy("name", "desc"));
  
  let currentStudentSelected: Students | null = null;

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

  async function updateStudent(student: Students | null) {
    if (student) {
      let docRef = doc(FirestoreApp, "students/" + student.id);
      let studentUpdate: Students = { 
        name: student.name, 
        usn: student.usn,
        course: student.course,
        subjects: student.subjects
      };
      await updateDoc(docRef, studentUpdate);
    }
  }

  async function deleteStudent(student: Students | null) {
    if (student) {
      let docRef = doc(FirestoreApp, "students/" + student.id);
      currentStudentSelected = null;
      await deleteDoc(docRef);
    }
  }
</script>

<CreateStudentsModal bind:active={createStudentActive}/>

<div class="panel">
  <div class="panel-box">
    <div class="students-panel">
      {#each $students as student}
        <StudentsSelect name={student.name} asButton={true} on:click={() => currentStudentSelected = student}/>
      {/each}
      <StudentsAdd on:click={() => createStudentActive = true}/>
    </div>

{#if currentStudentSelected}
    <form in:fly={{duration: 200, x: 200}}>
      <label>
        <p>Student Name</p>
        <input type="text" bind:value={currentStudentSelected.name}/>
      </label>
      <label>
        <p>Student ID</p>
        <input type="text" bind:value={currentStudentSelected.usn}/>
      </label>
      <div>
        <p>Course</p>
        <CourseCard name={currentStudentSelected.course}/>
      </div>
      <div class="button-container">
        <button on:click|preventDefault={() => updateStudent(currentStudentSelected)}>Save Changes</button>
        <button class="reset" on:click|preventDefault>Reset</button>
        <button class="delete" 
          on:click|preventDefault={() => deleteStudent(currentStudentSelected)}>Delete
        </button>
      </div>
    </form>
{/if}
  </div>
</div>

<style>
.panel {
  padding-top: 54px;
  flex-direction: column;
}

.panel-box {
  display: flex;
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

p {
  font-weight: 600;
  font-size: 19px;
}

form {
  margin-left: 10px;
}

.button-container {
  margin-top: 10px;
}

.reset {
  background-color: rgb(90, 90, 90);
}

.reset:hover {
  background-color: rgb(180, 180, 180);
}

.delete {
  background-color: rgb(194, 2, 2);
}

.delete:hover {
  background-color: rgb(255, 53, 53);
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
</style>