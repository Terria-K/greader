<script lang="ts">
  import { addDoc, collection } from "firebase/firestore";
  import ModalForm from "../Modal/ModalForm.svelte";
  import { FirestoreApp } from "../../firebase";
  import type { Todo } from "../../composables/todoStore";
  import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.svelte";
  import Crumbs from "../Breadcrumbs/Crumbs.svelte";
  import { writable } from "svelte/store";
    import { error, success } from "../../composables/toast";

  let inputText = "";
  let descText = "";
  let dateText = "";
  let currentBreadState = writable(0);

  export let active = false;
  let exiting = false;

  async function addItem() {
    const calendar = new Date(dateText);
    const createdAt = Date.now();
    const year = calendar.getUTCFullYear();
    const month = calendar.getUTCMonth();
    const day = calendar.getUTCDate();
    exiting = true;

    const monthLetter = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ][month];

    const todo: Todo = {
      name: inputText,
      description: descText,
      createdAt: createdAt,
      date: `${monthLetter} ${day}, ${year}`,
      isDone: false
    };

    inputText = "";
    descText = "";
    dateText = "";
    try {
      await addDoc(collection(FirestoreApp, "todo"), todo);
      success("Success", "Todo has successfully been created!");
    }
    catch (e) {
      console.log(e);
      error("Failed", "Error occurred. Please try again later.");
    }
    finally {
      $currentBreadState = 0;
      active = false;
      exiting = false;
    }
  }

  function maxDate() {
    let today = new Date();

    let month = today.getUTCMonth() + 1;
    let day = today.getUTCDate();
    let year = today.getUTCFullYear();

    let monthText: string;
    if (month < 10)
      monthText = '0' + month.toString();
    else  
      monthText = month.toString();

    let dayText: string;
    if (day < 10)
      dayText = '0' + day.toString();
    else  
      dayText = day.toString();

    return year + '-' + monthText + '-' + dayText;
  }
</script>

<ModalForm bind:active={active} bind:noExit={exiting}>
  <p>Create Todo</p>
  <Breadcrumbs bind:state={currentBreadState}>
    <Crumbs title="Set Information"/>
    <Crumbs title="Set Deadline"/>
  </Breadcrumbs>
  <div class="form-container">
{#if $currentBreadState == 0}
  <form on:submit|preventDefault>
    <label>
      <p>Task Name</p>
      <input type="text" name="todoName" placeholder="Enter task here" bind:value={inputText}/>
    </label>
    <label>
      <p>Task Description</p>
      <textarea name="todoDesc" maxlength="290" rows="8" cols="35" placeholder="Enter description here" bind:value={descText}></textarea>
    </label>
  </form>
{:else}
  <form>
    <label>
      <p>Select a Deadline</p>
      <input type="date" name="todoDeadline" bind:value={dateText} min={maxDate()}/>
    </label>
  </form>
{/if}
  </div>

  <div class="button-container">
    <button on:click={() => $currentBreadState--} 
    disabled={inputText == "" || $currentBreadState == 0}>Back</button>
    <button on:click={async () =>{
        if ($currentBreadState != 1) {
          $currentBreadState++
          return;
        }
        await addItem();
      } 
    } disabled={inputText == "" || ($currentBreadState == 1 && dateText == "")}>
      {$currentBreadState == 1 ? "Create" : "Next"}
    </button>
  </div>
</ModalForm>

<style>
.button-container {
  position: absolute;
  width: 100%;
  justify-content: center;
  display: flex;
  bottom: 10px;
}

.button-container button {
  margin-left: 10px;
  margin-right: 10px;
}

p {
  font-weight: 20px;
  margin-bottom: 10px;
}

.form-container {
  display: flex;
  height: auto;
  margin: 10px 20px 10px 20px;
  padding: 0px 20px 5px 20px;
  border-radius: 10px;
  transition: 300ms;
  min-height: 250px;
}

form {
  width: 100%;
  display: flex;
  align-items: baseline;
  flex-direction: column;
}

label p {
  text-align: start;
  font-size: 20px;
  margin-bottom: 6px;
}

input[type="text"] {
  font-size: 21px;
  padding: 6px;
  color: white;
  background-color: rgb(48, 48, 48);
}

input[type="date"] {
  font-size: 21px;
  padding: 6px;
  color: white;
  background-color: rgb(48, 48, 48);
  color-scheme: dark;
}

textarea {
  resize: none;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  padding: 6px;
  color: white;
  background-color: rgb(48, 48, 48);
}

button {
  cursor: pointer;
  color: white;
  border-radius: 10px;
  padding: 10px;
  background-color: rgb(61, 139, 74);
  transition: 300ms;
}

button:hover {
  background-color: rgb(95, 209, 114);
}

button:disabled {
  cursor: default;
  background-color: rgb(48, 83, 50);
  color: gray;
}
</style>
