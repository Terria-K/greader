<script lang="ts">
  import { collection, doc, onSnapshot, orderBy, query, updateDoc, type Unsubscribe, deleteDoc } from "firebase/firestore";
  import { fly } from "svelte/transition";
  import { FirestoreApp } from "../../firebase";
  import { onDestroy, onMount } from "svelte";
  import { students, type Students } from "../../composables/stores";
  import StudentsAdd from "../Document/StudentsAdd.svelte";
  import CreateStudentsModal from "./CreateStudentsModal.svelte";
  import StudentsSelect from "../Document/StudentsSelect.svelte";
  import CourseCard from "../Courses/CourseCard.svelte";
  import ConfirmationDialog from "../Modal/ConfirmationDialog.svelte";
  import SaveChanges from "./SaveChanges.svelte";

  let studentCol = query(
    collection(FirestoreApp, "students"), 
    orderBy("name", "desc"));
  
  let currentStudentSelected: Students | null = null;
  let studentToSelect : Students | null = null;

  let createStudentActive = false;
  let confirmationActive = false;
  let unsavedChanges = false;
  let studentInfo = false;

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
      confirmationActive = true;
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
</script>

<CreateStudentsModal bind:active={createStudentActive}/>
<ConfirmationDialog 
  content="Are you sure you want to discard changes?"
  bind:active={confirmationActive} 
  red="Yes" 
  on:yes={() => {
    reset();
    unsavedChanges = false;
    if (studentToSelect)
      selectStudent(studentToSelect);
    studentToSelect = null;
  }}
/>

<div class="panel">
  <div class="panel-box">
    <div class="students-panel">
      {#each $students as student}
        <StudentsSelect selected={currentStudent?.usn == student.usn} name={student.name} asButton={true} on:click={() => selectStudent(student)}/>
      {/each}
      <StudentsAdd on:click={() => createStudentActive = true}/>
    </div>

    <div class="container">
    {#if currentStudent}
      {#if studentInfo}
      <div class="form-container">
        <form in:fly={{duration: 200, x: 200}}>
          <label>
            <p>Student Name</p>
            <input type="text" on:input={e => changeName(e)} bind:value={currentStudent.name}/>
          </label>
          <label>
            <p>Student ID</p>
            <input type="number" on:input={e => changeUSN(e)} bind:value={currentStudent.usn}/>
          </label>
        </form>
        <form in:fly={{duration: 200, x: 200}}>
          <div>
            <p>Course</p>
            <CourseCard name={currentStudent.course}/>
          </div>
        </form>
      </div>
      {/if}

      <table>
        <tr>
          <th>Subject Name</th>
          <th class="hdarker-item">Activity</th>
          <th>Quiz</th>
          <th class="hdarker-item">Exam</th>
          <th>Average</th>
        </tr>
        <tr>
          <td>Platform Technology</td>
          <td class="darker-item">95.8%</td>
          <td>99.8%</td>
          <td class="darker-item">97.2%</td>
          <td id="average">{((95.8 + 99.8 + 97.2) / 3).toFixed(1)}%</td>
        </tr>
        {#each {length: 6} as _, i}
        <tr>
          <td>Computer Programming</td>
          <td class="darker-item">92.8%</td>
          <td>91.8%</td>
          <td class="darker-item">93.2%</td>
          <td id="average">{((92.8 + 91.8 + 93.2) / 3).toFixed(1)}%</td>
        </tr>
        {/each}
      </table>
    {/if}
    </div>
  </div>
</div>

{#if unsavedChanges}
<SaveChanges
  on:save-changes={() => {
    if (currentStudent && currentStudentSelected) {
      currentStudentSelected.name = currentStudent.name.trim();
      currentStudentSelected.usn = currentStudent.usn;
      currentStudentSelected.course= currentStudent.course;
      updateStudent(currentStudentSelected);
    }
  }}
  on:reset={() => reset()}/>
{/if}

<style>
.form-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
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

#average {
  font-weight: bold;
}

table {
  border-spacing: 0;
  z-index: -2;
}

tr {
  height: 40px;
}

th {
  background-color: rgb(49, 49, 49);
}

td {
  padding-left: 10px;
  background-color: rgb(36, 36, 36);
}

.darker-item {
  background-color: rgb(32, 32, 32);
}

.hdarker-item {
  background-color: rgb(44, 44, 44);
}
</style>