<script lang="ts">
  import { collection, doc, onSnapshot, orderBy, query, updateDoc, type Unsubscribe, deleteDoc } from "firebase/firestore";
  import { FirestoreApp } from "../../firebase";
  import { onDestroy, onMount } from "svelte";
  import { students, type Students } from "../../composables/stores";
  import StudentsAdd from "../Document/StudentsAdd.svelte";
  import CreateStudentsModal from "./CreateStudentsModal.svelte";
  import StudentsSelect from "../Document/StudentsSelect.svelte";
  import CourseCard from "../Courses/CourseCard.svelte";
  import ConfirmationDialog from "../Modal/ConfirmationDialog.svelte";
  import SaveChanges from "./SaveChanges.svelte";
  import InfoTab from "./InfoTab.svelte";
  import Subjects from "./Subjects.svelte";
  import GradesTable from "./GradesTable.svelte";

  let studentCol = query(
    collection(FirestoreApp, "students"), 
    orderBy("name", "desc"));
  
  export let subjectName: string;
  export let sectionName: string;
  
  let currentStudentSelected: Students | null = null;
  let studentToSelect : Students | null = null;

  let createStudentActive = false;
  let discardActive = false;
  let deleteActive = false;
  let unsavedChanges = false;
  let tabState = 0;

  let currentStudent: {
    name: string,
    usn: string,
    course: string
  } | null = null;

  function selectStudent(student: Students) {
    if (currentStudentSelected == student)
      return;
    if (unsavedChanges) {
      studentToSelect = student;
      discardActive = true;
      return;
    }
    currentStudentSelected = student;
    currentStudent = {
      name: student.name,
      usn: student.usn,
      course: student.course
    };
  }

  function changeName(e: any) {
    const text = e.target.value;
    if (!currentStudentSelected || !currentStudent) {
      return;
    }
    currentStudent.name = text;

    if (currentStudentSelected.name.trim() != currentStudent.name.trim()) {
      unsavedChanges = true;
      return;
    }
    unsavedChanges = false;
  }

  function changeUSN(e: any) {
    const text = e.target.value;
    if (!currentStudentSelected || !currentStudent) {
      return;
    }
    currentStudent.usn = text;

    if (currentStudentSelected.usn != currentStudent.usn) {
      unsavedChanges = true;
      return;
    }
    unsavedChanges = false;
  }

  function reset() {
    if (!currentStudent || !currentStudentSelected) {
      return;
    }
    currentStudent.name = currentStudentSelected.name;
    currentStudent.usn = currentStudentSelected.usn;
    currentStudent.course = currentStudentSelected.course;
    unsavedChanges = false;
  }

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
      unsavedChanges = false;
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

  function saveChanges() {
    if (currentStudent && currentStudentSelected) {
      currentStudentSelected.name = currentStudent.name.trim();
      currentStudentSelected.usn = currentStudent.usn;
      currentStudentSelected.course = currentStudent.course;
      updateStudent(currentStudentSelected);
    }
  }
</script>

<CreateStudentsModal bind:active={createStudentActive}/>
<ConfirmationDialog 
  content="Are you sure you want to discard changes?"
  bind:active={discardActive} 
  red="Yes" 
  on:yes={() => {
    reset();
    unsavedChanges = false;
    if (studentToSelect)
      selectStudent(studentToSelect);
    studentToSelect = null;
  }}
/>
<ConfirmationDialog 
  content="Are you sure you want to drop this student?"
  bind:active={deleteActive} 
  red="No" 
  on:yes={() => {
    unsavedChanges = false;
    deleteStudent(currentStudentSelected);
    currentStudentSelected = null;
    currentStudent = null;
  }}
/>

<div class="panel">
  <div class="panel-box">
    <div class="students-panel">
      {#each $students as student}
        <StudentsSelect selected={currentStudent?.usn == student.usn} name={student.name} 
        asButton={true} on:click={() => selectStudent(student)}/>
      {/each}
      <StudentsAdd on:click={() => createStudentActive = true}/>
    </div>

    <div class="container">
      <InfoTab on:click={(e) => {
        const id = e.detail;
        tabState = id
      }}/>
    {#if currentStudent}
      {#if tabState == 1}
      <div class="form-container">
        <form>
          <label>
            <p>Student Name</p>
            <input type="text" on:input={e => changeName(e)} bind:value={currentStudent.name}/>
          </label>
          <label>
            <p>Student ID</p>
            <input type="number" on:input={e => changeUSN(e)} bind:value={currentStudent.usn}/>
          </label>
        </form>

        <form>
          <div>
            <p>Course</p>
            <CourseCard name={currentStudent.course}/>
          </div>
        </form>

      </div>
      <div class="button-container">
        <button class="delete-button" on:click|preventDefault={() => deleteActive = true}>Drop Student</button>
      </div>

      {:else if tabState == 0}
        <GradesTable/>
      {:else}
        <Subjects/>
      {/if}
    {:else}
      <div class="text-container">
        Please select a student first
      </div>
    {/if}
    </div>
  </div>
</div>

{#if unsavedChanges}
<SaveChanges
  on:save-changes={saveChanges}
  on:reset={reset}/>
{/if}

<style>

.form-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
}

.delete-button {
  color: white;
  background-color: #c20202ea;
  cursor: pointer;
  transition: 300ms;
}

.delete-button:hover {
  background-color: #ff3535ea;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 36px;
  font-weight: bold;
}

.panel {
  overflow-x: hidden;
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
  border-radius: 5px;
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  appearance: textfield;
}

</style>