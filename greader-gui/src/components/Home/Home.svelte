<script lang="ts">
  import CreateDocumentModal from "../Document/CreateDocumentModal.svelte";
  import Documents from "../Document/Documents.svelte";
  import EmptyDocument from "../Document/EmptyDocument.svelte";
  import Students from "../Students/Students.svelte";
  import ViewModal from "./ViewModal.svelte";

  let createActive = false;
  let viewed = false;

  let subName = "";
  let sectName = "";

  function onView(e: CustomEvent<string[]>) {
    viewed = true;
    subName = e.detail[0];
    sectName = e.detail[1];
  }
</script>


<ViewModal bind:active={viewed} title={subName + '-' + sectName}>
  <Students subjectName={subName} sectionName={sectName}/>
</ViewModal>
<CreateDocumentModal bind:active={createActive}/>

<div class="flex pt-16 flex-col items-center">
  <p class="text-4xl font-bold m-3">EVA-GRADE</p>
  <div class="flex rounded-xl p-3 w-[95%] flex-wrap justify-center bg-std-dark">
    <EmptyDocument on:click={() => createActive = true}/>
    <Documents title="Comprog" on:view={onView}/>
  </div>
</div>