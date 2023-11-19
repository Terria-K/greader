<script lang="ts">
  import DocumentButton from "./DocumentButton.svelte";
</script>

<div class="documents">
  <div class="documents-holder">
    <p class="documents-title">Previously opened</p>
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