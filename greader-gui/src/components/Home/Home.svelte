<script>
  import CreateDocumentModal from "../Document/CreateDocumentModal.svelte";
  import Documents from "../Document/Documents.svelte";
  import EmptyDocument from "../Document/EmptyDocument.svelte";

  let createActive = false;

</script>

<CreateDocumentModal bind:active={createActive}/>

<div class="home">
  <p>EVA-GRADE</p>
  <div class="sections">
    <EmptyDocument on:click={() => createActive = true}/>
    <Documents/>
    <Documents/>
    <Documents/>
    <Documents/>
    <Documents/>
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
  width: 90%;
  flex-wrap: wrap;
  display: flex;
}

</style>