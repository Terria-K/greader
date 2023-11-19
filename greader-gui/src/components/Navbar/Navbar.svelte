<script lang="ts">
  import FaAlignJustify from 'svelte-icons/fa/FaAlignJustify.svelte'
  import NavbarButton from './NavbarButton.svelte';
  import MdAccountCircle from 'svelte-icons/md/MdAccountCircle.svelte'
  import WiMoonAltWaxingCrescent3 from 'svelte-icons/wi/WiMoonAltWaxingCrescent3.svelte'

  export let onClick: () => void;
</script>

<div class="navbar">
  <div class="left-container">
    <NavbarButton on:click={onClick}>
      <FaAlignJustify/>
    </NavbarButton>
    <NavbarButton link="/home">
      <span class="navbar-text">Home</span>
    </NavbarButton>
    <NavbarButton link="/faq">
      <span class="navbar-text">FAQ</span>
    </NavbarButton>
    <NavbarButton link="/support">
      <span class="navbar-text">Support</span>
    </NavbarButton>
  </div>

  <div class="right-container">
    <NavbarButton>
      <WiMoonAltWaxingCrescent3/>
    </NavbarButton>
    <NavbarButton>
      <MdAccountCircle/>
    </NavbarButton>
  </div>
</div>

<style>
.navbar {
  position: fixed;
  width: 100%;
  display: flex;
  height: 50px;
  background-color: rgb(61, 61, 61);
  padding: 2px 2px 2px 2px;
}

.left-container {
  width: 100%;
  display: flex;
  padding-left: 8px;
  transition: 300ms;
}

.right-container {
  width: 100%;
  display: flex;
  justify-content: end;
  padding-right: 8px;
}

.navbar-text {
  font-weight: bold;
}
</style>