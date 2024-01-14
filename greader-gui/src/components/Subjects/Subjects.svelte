<script lang="ts">
  import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
  import FormulaScript from "./FormulaScript.svelte";
  import Subject from "./Subject.svelte";
  import { FirestoreApp } from "../../firebase";
  import type { Unsubscribe } from "firebase/auth";
  import { onDestroy, onMount } from "svelte";
  import type { SubjectType } from "../../composables/stores";

  let customFormulaActive: { active: boolean, subject: SubjectType} = {
    active: false,
    subject: null!
  };

  let subCol = query(
    collection(FirestoreApp, "subjects"), 
    orderBy("name", "desc"));
  
  let subjects: SubjectType[] = [];
  
  let snapshotUnsubscriber: Unsubscribe;

  onMount(() => {
    snapshotUnsubscriber = onSnapshot(subCol, querySnapshot => {
      let subjectsSnap: SubjectType[] = []
      querySnapshot.forEach((doc) => {
          const sub: SubjectType = { ...doc.data(), id: doc.id } as SubjectType;
          subjectsSnap = [sub, ...subjectsSnap];
      });
      subjects = subjectsSnap;
    })
  });

  onDestroy(() => {
    snapshotUnsubscriber();
  });

  async function scriptClose(e: CustomEvent<string>) {
    let script = e.detail;
    let docRef = doc(FirestoreApp, "subjects/" + customFormulaActive.subject.id);
    let subjectUpdate: SubjectType = { 
      name: customFormulaActive.subject.name,
      id: customFormulaActive.subject.id,
      script: script,
      formula: "Customized",
      categories: []
    };
    await updateDoc(docRef, subjectUpdate);
  }
</script>

<FormulaScript bind:active={customFormulaActive} on:close={scriptClose}/>

<div class="justify-center pt-16 w-full">
  <div class="flex justify-center mt-10">
    <button class="transition-all duration-300 cursor-pointer bg-green text-white hover:bg-light-green">+ Add Subject</button>
  </div>
  <div class="h-[450px] bg-std-dark rounded-lg m-5">
    <div class="h-full overflow-y-auto">
      {#each subjects as subject}
      <Subject subject={subject} bind:customFormulaActive={customFormulaActive}/>
      {/each}
    </div>
  </div>
</div>