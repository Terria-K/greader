<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { collection, addDoc, doc, updateDoc, DocumentReference, getDoc } from 'firebase/firestore';
  import IoMdClose from 'svelte-icons/io/IoMdClose.svelte'
  import { studentsRefreshed, type Activity } from '../../composables/stores';
  import { FirestoreApp } from '../../firebase';
  import { fade, scale } from 'svelte/transition';
  import { sineOut } from 'svelte/easing';

  const close = createEventDispatcher();

  let formSubjectName: string = "";
  let formActivities: {[key: string]: Activity}[] = []
  export let currentStudentID: string = "";

  async function createSubject() {
    try {
      const subjectRef = collection(FirestoreApp, 'subjects');
      formActivities.push({
        "Quiz 1": { maxScore: 20, percentage: 0.2 },
        "Quiz 2": { maxScore: 20, percentage: 0.2 }
      });
      const subject = await addDoc(subjectRef, {
        name: formSubjectName,
        activities: formActivities
      });
      addSubjectToStudent(subject);
    }
    catch (e) {
      console.log("Something went wrong!");
      console.log(e);
      return;
    }

    formSubjectName = "";
    formActivities = [];
    $studentsRefreshed = false;
    close('close');
  }

  async function addSubjectToStudent(subjectRef: DocumentReference) {
    const docRef = doc(FirestoreApp, "students/" + currentStudentID);

    const activities: {[key: string]: number} = {};
    for (let x in formActivities[0]) {
      activities[x] = 20;
    }

    const subjectDoc = (await getDoc(docRef)).data();
    await updateDoc(docRef, { subjects: [...subjectDoc!.subjects, {
      activityScore: activities,
      subject: subjectRef
    }]})
  }
</script>

<div class="fade-modal" transition:fade={{ duration: 230, easing: sineOut }}>
  <div class="modal" transition:scale={{ duration: 230, easing: sineOut }}>
    <div class="corner">
      <button class="close-button" on:click={() => {
        close('close');
      }}>
        <IoMdClose/>
      </button>
    </div>
    <p>Create Subject</p>

    <form on:submit|preventDefault>
      <label>
        <p>Subject Name</p>
        <input type="text" name="Subject Name" placeholder="Enter Subject Name" bind:value={formSubjectName}/>
      </label>
      <label>
        <p>Activities</p>
        <button class="add-button" on:click|preventDefault>+ Add</button>
      </label>
    </form>
    <div class="button-holder">
      {#if formSubjectName.length > 2}
        <button class="create-button" on:click={createSubject}>Create</button>
      {:else}
        <button class="create-button" disabled>Create</button>
      {/if}
    </div>
  </div>
</div>

<style lang="less">
.button-holder {
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 30px;
  display: flex;
  justify-content: end;

  button {
    margin-right: 40px;
  }
}

.fade-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.603);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  position: relative;
  background-color: rgb(66, 66, 66);
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  width: 580px;
  height: 480px;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
}

.close-button {
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  color: white;
  box-shadow: none;
  cursor: pointer;
  transition: 300ms;
  border-radius: 50%;
}

.close-button:hover {
  background-color: rgb(97, 97, 97);
}

.corner {
  position: absolute;
  margin: 10px;
}

form {
  margin: 20px;
  display: flex;
  align-items: baseline;
  flex-direction: column;
}

label p {
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

.add-button {
  padding: 6px;
  font-size: 20px;
  cursor: pointer;
  background-color: rgb(61, 139, 74);
  color: white;
  transition: 300ms;
}

.add-button:hover {
  background-color: rgb(95, 209, 114);
}

.create-button {
  padding: 6px;
  font-size: 20px;
  cursor: pointer;
  background-color: rgb(61, 139, 74);
  color: white;
  transition: 300ms;
}
.create-button:hover {
  background-color: rgb(95, 209, 114);
}

.create-button:disabled {
  color: rgb(131, 131, 131);
  background-color: rgb(68, 80, 69);
}
</style>