<script lang="ts">
  import { addDoc, collection } from "firebase/firestore";
  import ModalForm from "../Modal/ModalForm.svelte";
  import { FirestoreApp } from "../../firebase";
  import type { Todo } from "../../composables/todoStore";

  let inputText = "";
  let descText = "";

  export let active = false;

  async function addItem() {
    const calendar = new Date();
    const createdAt = Date.now();
    const year = calendar.getUTCFullYear();
    const month = calendar.getUTCMonth();
    const day = calendar.getUTCDate();

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
    await addDoc(collection(FirestoreApp, "todo"), todo);
    active = false;
  }
</script>

<ModalForm bind:active={active}>
  <p>Create Todo</p>
  <form>
    <label>
      <p>Task Name</p>
      <input type="text" name="todoName" placeholder="Enter task here" bind:value={inputText}/>
    </label>
    <label>
      <p>Task Description</p>
      <textarea name="todoDesc" rows="8" cols="35" placeholder="Enter description here" bind:value={descText}></textarea>
    </label>

  </form>

  <button on:click={addItem} disabled={inputText == ""}>Create</button>
</ModalForm>

<style>
form {
  margin: 20px;
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
  background-color: rgb(18, 94, 22);
  color: gray;
}
</style>
