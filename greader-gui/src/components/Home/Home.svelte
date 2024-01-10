<script>
  import CreateDocumentModal from "../Document/CreateDocumentModal.svelte";
  import Documents from "../Document/Documents.svelte";
  import EmptyDocument from "../Document/EmptyDocument.svelte";
  import Students from "../Students/Students.svelte";
  import ViewModal from "./ViewModal.svelte";

  let createActive = false;
  let viewed = false;
</script>


<ViewModal bind:active={viewed}>
  <Students/>
</ViewModal>
<CreateDocumentModal bind:active={createActive}/>

<div class="home">
  <p>EVA-GRADE</p>
  <div class="sections">
    <EmptyDocument on:click={() => createActive = true}/>
    <Documents title="Comprog" on:view={() => viewed = true}/>
  </div>
</div>

<style>
p {
  font-size: 36px;
  font-weight: bold;
  margin: 15px;
}
.home {
  display: flex;
  padding-top: 66px;
  align-items: center;
  flex-direction: column;
}

.sections {
  border-radius: 10px;
  padding: 10px;
  background-color: rgb(29, 29, 29);
  width: 95%;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
}

</style>