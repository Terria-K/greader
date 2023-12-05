<script lang="ts">
  import { doc, getDoc } from "firebase/firestore";
  import { FirestoreApp } from "../../firebase";
  import { students, studentsRefreshed, type Students, type Subjects, type SubjectsCollection } from "../../composables/stores";
  import GradeComponent from "./GradeComponent.svelte";
  import Checkbox from "../Checkbox/Checkbox.svelte";
  import GradesCreateModal from "./GradesCreateModal.svelte";
  import GradesEditModal from "./GradesEditModal.svelte";

  let showOnlyAssignedSubjects: boolean = false;
  let showCreateModal: boolean = false;
  let showEditModal: boolean = false;
  let currentStudentID = "fZ4BPg09Ra1z8iK7eF8D"


  async function getSubjectsFromStudent() {
    if ($students && $studentsRefreshed) {
      return $students;
    }
    $students = null;
    const studentDocRef = doc(FirestoreApp, "students/" + currentStudentID);
    const studentDoc = await getDoc(studentDocRef);
    const data = studentDoc.data();

    if (data) {
      const studentsData: Students = {
        name: data.name,
        usn: data.usn,
        subjects: [],
        id: data.id
      };

      for (let i = 0; i < data.subjects.length; i++) {
        const map = new Map<string, number>();
        const sub: SubjectsCollection = data.subjects[i];
        for (const [key, value] of Object.entries(sub.activityScore)) {
          map.set(key, value as number);
        }
        const subjectDoc = await getDoc(sub.subject as any); // Cannot do it without any

        studentsData.subjects.push({
          activityScore: map,
          subject: subjectDoc.data() as Subjects
        })
      }

      $students = studentsData;
    }

    $studentsRefreshed = true;

    return $students!;
  }
</script>

{#if showCreateModal}
<GradesCreateModal on:close={() => showCreateModal = false} {currentStudentID}/>
{/if}
{#if showEditModal}
<GradesEditModal on:close={() => showEditModal = false}/>
{/if}

<div class="grades">
  <div class="middle">
    <div class="buttons">
      <button on:click={() => showCreateModal = true}>Create</button>
      <button on:click={() => showEditModal = true} id="edit">Edit</button>
    </div>
{#key $studentsRefreshed}
{#await getSubjectsFromStudent()}
    <div>
      Loading..
    </div>
{:then students} 
    <Checkbox id="assigned-subjects" name="assigned-subjects" bind:checked={showOnlyAssignedSubjects}>
      Show only assigned subjects
    </Checkbox>
    <div class="component-lists">
    {#each students.subjects as subject}
      <GradeComponent data={subject.subject} subject={subject.subject.name} activities={subject.activityScore }/>
    {/each}
    </div>
{/await}
{/key}
  </div>
</div>


<style lang="less">
#edit {
  background-color: rgb(61, 139, 74);
}

#edit:hover {
  background-color: rgb(95, 209, 114);
}

.buttons {
  display: flex;
  justify-content: center;
  width: 100%;

  button {
    min-width: 60px;
    padding: 8px 8px;
    border-radius: 4px;
    color: white;
    margin-left: 5px;
    margin-right: 5px;
    background-color: rgb(114, 114, 114);
    cursor: pointer;
    font-weight: bold;
  }

  button:hover {
    background-color: rgb(173, 173, 173);
  }
}
.grades {
  padding: 66px 16px;
  display: flex;
  justify-content: center;
}

.middle {
  font-weight: bold;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.component-lists {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>