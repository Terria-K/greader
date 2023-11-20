<script lang="ts">
  import DocumentButton from "./DocumentButton.svelte";
</script>

<div class="documents">
  <div class="documents-holder">
    <p class="documents-title">Documents</p>
    <div>
      <button>Create</button>
      <button class="import-button">+ Import</button>
    </div>
  </div>

  <div class="documents-list">
    <DocumentButton>Computer Programming</DocumentButton>
    <DocumentButton>Platform Technology</DocumentButton>
    <DocumentButton>Computer Programming</DocumentButton>
    <DocumentButton>Computer Programming</DocumentButton>
    <DocumentButton>Computer Programming</DocumentButton>
    <DocumentButton>Platform Technology</DocumentButton>
    <DocumentButton>Platform Technology</DocumentButton>
    <DocumentButton>Platform Technology</DocumentButton>
  </div>
</div>

<style>
.documents {
  background-color: rgb(66, 66, 66);
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  width: 350px;
  height: 350px;
}

.documents-title {
  font-size: 24px;
  font-weight: bold;
}

.documents-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.documents-holder p {
  margin-bottom: 8px;
}


.import-button {
  background-color: rgb(95, 209, 114) !important;
}

.import-button:hover {
  background-color: rgb(124, 255, 124) !important;
}

.documents-holder button {
  font-weight: bold;
  border-radius: 4px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-bottom: 6px;
  background-color: rgb(126, 126, 126);
  cursor: pointer;
  transition: 300ms;
}

.documents-holder button:hover {
  background-color: rgb(206, 206, 206);
}


.documents-list {
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: 240px;
  background-color: rgb(46, 46, 46);
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}



</style>