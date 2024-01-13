<script lang="ts"></script>

<div class="h-full flex flex-col overflow-y-auto">
  <table class="w-full border-spacing-0 -z-[2] h-full">
    <tr class="h-10">
      <th>Categories</th>
      <th>Score</th>
    </tr>
    {#each {length: 15} as _, i}
    <tr class="h-10">
      <td>Activity</td>
      <td>24.3%</td>
    </tr>
    {/each}
    <tr class="h-10">
      <td class="font-bold">Average</td>
      <td class="font-bold">99.4%</td>
    </tr>
  </table>
</div>


<style>
th {
  background-color: #313131;
}

th:nth-child(even) {
  background-color: #2c2c2c;
}

td {
  padding-left: 10px;
  height: 45px;
  background-color: #242424;
  border: 1px solid #4e4e4e;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}

td:nth-child(even) {
  background-color: #202020;
}
</style>