<script lang="ts">
  export let title = "1ST Year";
  export let name = "BSIT11E";
</script>

<div class="documents">
  <div class="documents-holder">
    <h1>{title}</h1>
    <p class="documents-title">{name}</p>
    <button>View</button>
  </div>
</div>

<style>
button {
  padding: 10px;
  border-radius: 10px;
  color: white;
  background-color: rgb(61, 139, 74);
  transition: 300ms;
  cursor: pointer;
  margin-bottom: 10px;
}

button:hover {
  background-color: rgb(95, 209, 114);
}

.documents {
  background-color: rgb(238, 238, 238);
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  width: auto;
  height: auto;
  margin-left: 6px;
  margin-bottom: 10px;
  min-width: 220px;
  min-height: 120px;
}

:global(body.dark-mode) .documents {
  background-color: rgb(66, 66, 66);
}


.documents-title {
  font-size: 20px;
  font-weight: 600;
  margin-top: 1px;
}

.documents-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>