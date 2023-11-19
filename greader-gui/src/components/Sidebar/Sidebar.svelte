<script lang="ts">
  import FaHome from "svelte-icons/fa/FaHome.svelte";
  import FaRegEdit from 'svelte-icons/fa/FaRegEdit.svelte';
  import FaCog from 'svelte-icons/fa/FaCog.svelte';
  import IoMdLogOut from 'svelte-icons/io/IoMdLogOut.svelte'
  import SideButton from "./SideButton.svelte";
  import { authHandlers } from "../../composables/stores";
  export let active: boolean;

  async function logout() {
    await authHandlers.logout();
  }
</script>

<div class="sidebar" class:open={active}>
  <div class="menus">
    <SideButton text="Home">
      <FaHome/>
    </SideButton>
    <SideButton text="Grades">
      <FaRegEdit/>
    </SideButton>
    <SideButton text="Settings">
      <FaCog/>
    </SideButton>
    <SideButton text="Logout" onClick={logout}>
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