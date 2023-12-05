<script lang="ts">
  let inputText: string = "";
  let todos: string[] = [];

  function addItem() {
    todos.push(inputText);
    todos = todos; // Svelte won't rerender if I didn't reassign the state to itself XD
    inputText = "";
  }

</script>

<div class="todo">
  <h2>To-Do List</h2>

  <input type="text" id="inputText" placeholder="Enter Task" bind:value={inputText}/>
  <button on:click|preventDefault={addItem}>Add</button>

  <ul class="todo-list" id="todoList">
{#each todos as todo}
  <li>
    <a href="/">{todo}</a>
  </li>
{/each}
  </ul>
</div>


<style>
.todo {
  padding-top: 100px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-list {
    list-style-type: none;
    padding: 0px;
    width: 200px;
    border: 1px solid rgb((45, 98, 89), 17, 17);
 }

 .todo-list li a {
    color: #000;
    padding: 12px 16px;
    display: block;
 }

 .todo-list li a:hover {
    background-color: #da5e5edd;
 }

 input[type=text] {
    width: 30%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    text-align: center;

 }
</style>