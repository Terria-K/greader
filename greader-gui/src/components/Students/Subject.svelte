<script lang="ts">
  import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte'

  let open = false;
  export let subjectName: string;
</script>

<button class="box" on:click={() => open = !open}>
  <div class="header">
    <p class="subject-name">{subjectName}</p>
    <button class="icon" class:open={open} class:close={!open} on:click={() => open = !open}>
      <FaChevronDown/>
    </button>
  </div>
</button>

<div class="inside-box" class:box-open={open}>
  {#each {length: 4} as _, i}
  <form class="category" on:submit|preventDefault>
    <p class="act-name">Activity {i + 1}</p>
    <label>
      Score:
      <input type="number">
      / 20
    </label>
  </form>
  {/each}
</div>

<style>
.category {
  height: auto;
  background-color: rgb(31, 31, 31);
  padding: 20px;
}

.category:nth-child(even) {
  background-color: rgb(19, 19, 19);
}

p {
  font-size: 24px;
  font-weight: bold;
}

.act-name {
  margin: 0;
  margin-bottom: 20px;
}

.inside-box {
  background-color: rgb(24, 24, 24);
  max-height: 0;
  transition: 300ms ease-in;
  overflow: hidden;
}

.inside-box.box-open {
  max-height: 100%;
  transition: 300ms ease-out;
}

.box {
  color: white;
  padding: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(46, 46, 46);
  border-radius: 4px;
  display: flex;
  align-items: center;
  border: 2px solid white;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  cursor: pointer;
}

.box:focus{
  background-color: rgb(46, 46, 46);
}

.header {
  margin: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.icon {
  margin-top: 15px;
  width: 32px;
  height: 32px;
  padding: 0;
  color: white;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
  transition: 300ms;
}

.icon:hover {
  background-color: inherit;
}

.subject-name {
  font-weight: bold;
  font-size: 20px;
}

.open {
  animation-name: Open;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.close {
  animation-name: Close;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: backwards;
}

@keyframes Open {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

@keyframes Close {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  text-align: center;
  appearance: textfield;
  width: 30px
}
</style>