<script lang="ts">
  import { fly } from "svelte/transition";
  import IoMdTrash from 'svelte-icons/io/IoMdTrash.svelte'
  import Checkbox from "../Checkbox/Checkbox.svelte";
  import { sineIn } from "svelte/easing";
  import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, type Unsubscribe, orderBy, query } from "firebase/firestore";
  import { FirestoreApp } from "../../firebase";
  import { todos, type Todo } from "../../composables/todoStore";
  import { onDestroy, onMount } from "svelte";

  let inputText: string = "";

  const todoCollection = query(collection(FirestoreApp, "todo"), orderBy("createdAt", "asc"));

  async function addItem() {
    const calendar = new Date();
    const createdAt = Date.now();
    const year = calendar.getUTCFullYear();
    const month = calendar.getUTCMonth();
    const day = calendar.getUTCDate();

    let monthLetter = "";
    switch (month) {
      case 0: 
        monthLetter = "January";
        break;
      case 1: 
        monthLetter = "February";
        break;
      case 2: 
        monthLetter = "March";
        break;
      case 3: 
        monthLetter = "April";
        break;
      case 4: 
        monthLetter = "May";
        break;
      case 5: 
        monthLetter = "June";
        break;
      case 6: 
        monthLetter = "July";
        break;
      case 7: 
        monthLetter = "August";
        break;
      case 8: 
        monthLetter = "September";
        break;
      case 9: 
        monthLetter = "October";
        break;
      case 10: 
        monthLetter = "November";
        break;
      case 11: 
        monthLetter = "December";
        break;
    }

    const todo: Todo = {
      name: inputText,
      description: "",
      createdAt: createdAt,
      date: `${monthLetter} ${day}, ${year}`,
      isDone: false
    };

    await addDoc(collection(FirestoreApp, "todo"), todo);
    inputText = "";
  }

  async function deleteItem(todo: Todo) {
    let todoc = doc(FirestoreApp, "todo/" + todo.id);

    await deleteDoc(todoc);
  }

  async function onChecked(check: boolean, todo: Todo) {
    let todoc = doc(FirestoreApp, "todo/" + todo.id);
    const newTodo: Todo = {
      ...todo,
      isDone: check
    }
    await updateDoc(todoc, newTodo);
  }

  let snapshotUnsubscriber: Unsubscribe

  onMount(() => {
    snapshotUnsubscriber = onSnapshot(todoCollection, querySnapshot => {
      let todoList: Todo[] = [];
      querySnapshot.forEach((doc) => {
        const todo: Todo = { ...doc.data(), id: doc.id } as Todo;
        todoList = [todo, ...todoList];
      })
      $todos = todoList;
    })
  })

  onDestroy(() => {
    snapshotUnsubscriber();
  })

</script>

<div class="todo">
  <h2>To-Do List</h2>

  <input type="text" id="inputText" placeholder="Enter Task" bind:value={inputText}/>
  <button class="create-button" on:click|preventDefault={addItem}>Create</button>

  <ul class="todo-list" id="todoList">
{#each $todos as todo}
  <li transition:fly={{duration: 120, easing: sineIn}}>
    <div class="todo-card">
      <Checkbox checked={todo.isDone} on:click={(e) => {
        onChecked(e.detail, todo);
      }}>{todo.name}</Checkbox>
      <div class="container">
        <div class="date">
          <p>{todo.date}</p>
        </div>
        <div class="trash">
          <button class="trash-button" on:click={() => deleteItem(todo)}>
            <IoMdTrash/>
          </button>
        </div>
      </div>
    </div>
  </li>
{/each}
  </ul>
</div>


<style>
.trash {
  display: flex;
  justify-content: end;
}

.trash-button {
  cursor: pointer;
  width: 30px;
  height: 30px;
  padding: 0;
  background-color: transparent;
  box-shadow: none;
  color: white;
  transition: 300ms;
}

.trash-button:hover {
  color: rgb(156, 156, 156);
}

.container {
  display: flex;
  justify-content: space-between;
  height: 48px;
}

.date {
  display: flex;
  font-size: 16px;
  color: gray;
  font-weight: bold;
}

.create-button {
  background-color: rgb(61, 139, 74);
  color: white;
  transition: 300ms;
  cursor: pointer;
}

.create-button:hover {
  background-color: rgb(95, 209, 114);
}

.todo {
  padding-top: 50px;
  flex-direction: column;
  display: flex;
  align-items: center;
}

.todo-list {
  list-style-type: none;
  padding: 0px;
  width: 400px;
  height: 300px;
  border: 1px solid rgb((45, 98, 89), 17, 17);
  background-color: rgb(29, 29, 29);
  padding: 10px;
  border-radius: 10px;
  overflow-y: auto;
 }

 .todo-card {
  text-align: center;
  font-size: 18px;
  background-color: rgb(66, 66, 66);
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 0px 0px rgb(61, 139, 74);
  margin-bottom: 5px;
  padding-bottom: 0;
 }


 input[type=text] {
    width: 30%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    text-align: center;

 }
</style>