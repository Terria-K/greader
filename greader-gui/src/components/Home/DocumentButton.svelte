<script lang="ts">
  import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'
</script>

<button>
  <slot/>
  <button class="icon">
    <IoIosClose/>
  </button>
</button>

<style>
.icon {
  padding: 0;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: 300ms;
  border-radius: 50%;
}

.icon:hover {
  background-color: rgb(119, 119, 119);
}

button {
  justify-content: space-between;
  align-items: center;
  display: flex;
  font-weight: bold;
  text-align: left;
  background-color: transparent;
  box-shadow: none;
  color: white;
  border-radius: 0;
  width: 100%;
  text-align: center;
  transition: 300ms;
}

button:hover {
  cursor: pointer;
  background-color: rgba(105, 105, 105, 0.788);
}
</style>