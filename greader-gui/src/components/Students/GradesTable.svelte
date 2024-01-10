<script lang="ts"></script>

<div class="grades">
  <table class="table-holder">
    <tr>
      <th>Subject Name</th>
      <th>Activity</th>
      <th>Quiz</th>
      <th>Exam</th>
      <th>Average</th>
    </tr>
    {#each {length: 15} as _, i}
    <tr>
      <td>Computer Programming</td>
      <td>24.3%</td>
      <td>30%</td>
      <td>40%</td>
      <td id="average">{((24.3 + 30 + 40)).toFixed(1)}%</td>
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

th:nth-child(even) {
  background-color: rgb(44, 44, 44);
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

td:nth-child(even) {
  background-color: rgb(32, 32, 32);
}
</style>