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

<div class="sidebar" class:open={active}>
  <div class="menus">
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
.sidebar {
  margin-top: 54px;
  position: fixed;
  background-color: rgb(61, 61, 61);
  box-shadow: 3px 0 0 rgba(0, 0, 0, 0.2);
  width: 150px;
  height: 100%;
  transition: 300ms;
  margin-left: -200px;
}

.menus {
  margin-top: 12px;
  padding-left: 8px;
  padding-right: 8px;
}


.sidebar.open {
  margin-left: 0px;
}

</style>