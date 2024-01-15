<script lang="ts">
  import Navbar from "./components/Navbar/Navbar.svelte";
  import { AuthApp } from './firebase';
  import { authStore } from './composables/authStore';
  import Sidebar from "./components/Sidebar/Sidebar.svelte";
  import Home from "./components/Home/Home.svelte";
  import Login from "./components/Login/Login.svelte";
  import { onMount } from "svelte";
  import { Route, Router } from "svelte-routing"
  import Fade from "./components/Fade.svelte";
  import Todo from "./components/Todo/Todo.svelte";
  import Toast from "./components/Toast/Toast.svelte";
  import { toasts } from "./composables/toast";
  import { fly } from "svelte/transition";
  import Subjects from "./components/Subjects/Subjects.svelte";

  $: active = false;
  export let url = "";


  onMount(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      window.document.body.classList.toggle("dark-mode");
    }

    const unsubscribe = AuthApp.onAuthStateChanged((user) => {
      if (user) {
        authStore.update(x => {
          return { ...x, isLoading: false, currentUser: user }
        });
      }
      else {
        authStore.update(x => {
          return { ...x, isLoading: false, currentUser: null }
        });
      }

      if (!$authStore.currentUser && !$authStore.isLoading && window.location.pathname !== "/") {
        window.location.href = "/";
      }
    });

    return unsubscribe;
  });
</script>

<main class="main">
  <Router {url}>
    <Fade open={active}/>
    <div class="toast-handler">
    {#each $toasts as toast}
    {#if toast.show}
    <div out:fly={{duration: 400, x: 100}}>
    <Toast prop={toast}/>	
    </div>
    {/if}
    {/each}
    </div>

{#if $authStore.currentUser}
    <Navbar onClick={() => {
      active = !active;
    }}/>
    <Sidebar active={active}/>
{/if}
    <Route path="/">
      <Login/>
    </Route>
    <Route path="home">
      <Home/>
    </Route>
    <Route path="subjects">
      <Subjects/>
    </Route>
    <Route path="todo">
      <Todo/>
    </Route>
    <Route path="grades">
      <Grades/>
    </Route>
  </Router>
</main>

<style>
.toast-handler {
  position: fixed;
  z-index: 10;
  right: 10px;
  top: 10px;
}


/* @media (prefers-color-scheme: dark) { */
:global(body.dark-mode) {
    color: #f6f6f6;
    background-color: #242424;
    transition: 300ms;
  }

:global(body.dark-mode) :global(a:hover) {
    color: #24c8db;
  }

:global(body.dark-mode) :global(button:active) {
    background-color: #0f0f0f69;
  }
/* } */
</style>