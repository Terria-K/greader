<script lang="ts">
  import { onMount } from "svelte";
  import type { Activity } from "../../composables/activityStore";

  export let subject: string;

  export let activities: Activity[];

  $: totalGrade = 0;

  onMount(() => {
    updateTotalGrade();
  })

  function updateTotalGrade() {
    totalGrade = 0;
    const activityLength = activities.length;
    activities.forEach(x => {
      totalGrade += +x.score;
    })

    totalGrade /= activityLength;
  }

</script>

<div class="component">
  <div>
    <p>{subject}</p>
    <table>
      <tr>
  {#each activities as activity}
        <th>{activity.name}</th>
  {/each}
      </tr>
      <tr>
  {#each activities as activity}
        <td>
          <input type="number" placeholder="0.00" bind:value={activity.score}/>
        </td>
  {/each}
      </tr>
    </table>
    <p class="average">Average: {totalGrade.toFixed(2)}%</p>
    <button on:click={updateTotalGrade}>Update</button>
  </div>

</div>

<style>
p {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  height: 10px;
}
input {
  width: 50px;
  height: 20px;
  box-shadow: none;
  background-color: transparent;
  color: white;
  border-radius: 2px;
  padding-left: 0.2em;
  padding-right: 0.2em;
  transition: 300ms;
}

button {
  background-color: rgb(189, 189, 189);
  cursor: pointer;
  font-weight: bold;
}

input:focus {
  outline: none;
  background-color: rgb(53, 53, 53);
}

.component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.2em 0.4em 0.2em;
  min-width: 200px;
  min-height: 80px;
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  background-color: rgb(66, 66, 66);
  margin-bottom: 5px;
}

.component div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
}


td {
  text-align: center;
}

tr {
  text-align: center;
}

table, th, td, tr {
  border: 2px solid rgb(29, 29, 29);
  border-radius: 10px;
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  appearance: textfield;
}
</style>