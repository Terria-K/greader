<script lang="ts">
  import FaHome from "svelte-icons/fa/FaHome.svelte";
  import FaCog from 'svelte-icons/fa/FaCog.svelte';
  import IoMdLogOut from 'svelte-icons/io/IoMdLogOut.svelte'
  import SideButton from "./SideButton.svelte";
  import FaTasks from 'svelte-icons/fa/FaTasks.svelte'
  import FaUser from 'svelte-icons/fa/FaUser.svelte'
  import FaBook from 'svelte-icons/fa/FaBook.svelte'
  import { authHandlers } from "../../composables/authStore";
  export let active: boolean;

  async function logout() {
    await authHandlers.logout();
  }
</script>

<div class={`fixed mt-[54px] shadow bg-std-semidark w-[150px] h-full transition-all duration-300 
  ${active ? 'ml-0' : 'ml-[-200px]'}`}>
  <div class="mt-3 pl-2 pr-2">
    <SideButton text="Home" to="/home">
      <FaHome/>
    </SideButton>
    <SideButton text="Subjects" to="/subjects">
      <FaBook/>
    </SideButton>
    <SideButton text="To-Do" to="/todo">
      <FaTasks/>
    </SideButton>
    <SideButton text="Settings" to="/settings">
      <FaCog/>
    </SideButton>
    <SideButton text="Logout" on:click={logout}>
      <IoMdLogOut/>
    </SideButton>
  </div>
</div>

<style>
.shadow {
  box-shadow: 3px 0 0 rgba(0, 0, 0, 0.2);
}
</style>