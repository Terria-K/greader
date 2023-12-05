<script lang="ts">
  import Navbar from "./components/Navbar/Navbar.svelte";
  import { AuthApp } from './firebase';
  import { authStore } from './composables/authStore';
  import Sidebar from "./components/Sidebar/Sidebar.svelte";
  import Home from "./components/Home/Home.svelte";
  import Login from "./components/Login/Login.svelte";
  import { onMount } from "svelte";
  import { Route, Router } from "svelte-routing"
  import Grades from "./components/Grades/Grades.svelte";
  import Fade from "./components/Fade.svelte";
  import Todo from "./components/Todo/Todo.svelte";

  $: active = false;
  export let url = "";


  onMount(() => {
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
    <Route path="todo">
      <Todo/>
    </Route>
    <Route path="grades">
      <Grades/>
    </Route>
  </Router>
</main>

<style>

</style>