<script lang="ts">
  import { doc, getDoc } from "firebase/firestore";
  import GradeComponent from "./GradeComponent.svelte";
  import { FirestoreApp } from "../../firebase";
  import { students, studentsRefreshed, type Students, type Subjects } from "../../composables/stores";
  import Checkbox from "../Checkbox/Checkbox.svelte";

  let showOnlyAssignedSubjects: boolean = false;

  async function getSubjects() {
    if ($students.length > 0 && $studentsRefreshed) {
      return $students;
    }
    const studentDocRef = doc(FirestoreApp, "students/fZ4BPg09Ra1z8iK7eF8D");
    const studentDoc = await getDoc(studentDocRef);
    const data = studentDoc.data();

    if (data) {
      const map = new Map<string, number>();
      for (const [key, value] of Object.entries(data.subjects[0].activityScore)) {
        map.set(key, value as number);
      }
      const subjectDoc = await getDoc(data.subjects[0].subject);
      const studentsData: Students = {
        name: data.name,
        usn: data.usn,
        subjects: {
          activityScore: map,
          subject: subjectDoc.data() as Subjects
        },
        id: data.id
      };
      $students = [studentsData, ...$students];
    }

    $studentsRefreshed = true;

    return $students;
  }


</script>
<div class="grades">
  <div class="middle">
    <div class="buttons">
      <button>Create</button>
      <button id="edit">Edit</button>
    </div>
{#await getSubjects()}
    <div>
      Loading..
    </div>
{:then subjects} 
    <div>
      <Checkbox id="assigned-subjects" name="assigned-subjects" bind:checked={showOnlyAssignedSubjects}>
        Show only assigned subjects
      </Checkbox>
    </div>
    <div class="component-lists">
    {#each subjects as subject}
      <GradeComponent data={subject.subjects.subject} subject={subject.subjects.subject.name} activities={subject.subjects.activityScore }/>
    {/each}
    </div>
{/await}

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