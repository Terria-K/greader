<script lang="ts">
  import { onMount } from "svelte";
  import type { Subjects } from "../../composables/stores";

  export let subject: string;
  export let data: Subjects;

  export let activities: Map<string, number>; 

  $: totalGrade = 0;

  onMount(() => {
    updateTotalGrade();
  })

  function updateTotalGrade() {
    totalGrade = 0;
    const activityLength = activities.size;
    activities.forEach((x, k) => {
      const maxScore = data.activities[0][k].maxScore;
      let grade = x / maxScore;
      totalGrade += grade* 100;
    })

    totalGrade /= activityLength;
  }

</script>

<div class="component">
  <div>
    <p>{subject}</p>
    <div class="table-holder">
      <table>
        <tr>
    {#each [...activities] as [key, _]}
          <th>{key}</th>
    {/each}
        </tr>
        <tr>
    {#each [...activities] as [key, value]}
          <td>
            <p class="value">{value}/{data.activities[0][key].maxScore}</p>
          </td>
    {/each}
        </tr>
      </table>
    </div>
  </div>
  <div class="button-holder">
    <p class="average">Average: {totalGrade.toFixed(2)}%</p>
  </div>
</div>

<style>
.table-holder {
  width: 100%;
  overflow-x: auto;
}

p {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  height: 10px;
}

.button-holder {
  display: flex;
  width: 100%;
  align-items: center;
}

.value {
  font-size: 16px;
  font-weight: 200;
  margin-top: 0.5rem;
}

.component {
  display: flex;
  flex-direction: column;
  padding: 0.2em 0.4em 0.2em;

  width: 400px;
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  background-color: rgb(66, 66, 66);
  margin-bottom: 5px;
}

.component div {
  display: flex;
  flex-direction: column;
}


tr {
  text-align: center;
}

table, th, td, tr {
  border: 2px solid rgb(29, 29, 29);
  border-collapse: collapse;
}

.average {
  text-align: start;
  color: rgb(161, 161, 161);
  font-size: 15px;
  padding: 0;
  margin-top: 1px;
  margin-bottom: 16px;
}

</style>