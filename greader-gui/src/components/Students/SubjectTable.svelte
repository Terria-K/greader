<script lang="ts">

</script>

<div class="grades">
  <table class="table-holder">
    <tr>
      <th>Subject Name</th>
      <th class="hdarker-item">Activity</th>
      <th>Quiz</th>
      <th class="hdarker-item">Exam</th>
      <th>Average</th>
    </tr>
    {#each {length: 15} as _, i}
    <tr>
      <td>Computer Programming</td>
      <td class="darker-item">92.8%</td>
      <td>91.8%</td>
      <td class="darker-item">93.2%</td>
      <td id="average">{((92.8 + 91.8 + 93.2) / 3).toFixed(1)}%</td>
    </tr>
    {/each}
  </table>
</div>


<style>
.grades {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.table-holder {
  height: 100%;
}

#average {
  font-weight: bold;
}

table {
  width: 100%;
  border-spacing: 0;
  z-index: -2;
}

tr {
  height: 40px;
}

th {
  background-color: rgb(49, 49, 49);
}

td {
  padding-left: 10px;
  height: 45px;
  background-color: rgb(36, 36, 36);
  border: 1px solid rgb(78, 78, 78);
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}

.darker-item {
  background-color: rgb(32, 32, 32);
}

.hdarker-item {
  background-color: rgb(44, 44, 44);
}
</style>