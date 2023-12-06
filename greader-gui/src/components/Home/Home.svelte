<script>
  import Documents from "./Documents.svelte";


</script>
<div class="home">
  <p>GREADER</p>
  <div class="sections">
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