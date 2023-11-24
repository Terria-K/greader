<script lang="ts">
  export let id: string = "";
  export let name: string = "";
  export let checked = false;
</script>

<label class="container">
  <input type="checkbox" {id} {name} bind:checked={checked}/>
  <div>
    <slot/>
  </div>
</label>

<style>
div {
  margin-left: 6px;
}
.container {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  border: 0.2em solid rgb(139, 139, 139);
  border-radius: 4px;
  padding: 4px;
  background-color: transparent;
  transition: 300ms;
  cursor: pointer;
  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em rgb(95, 209, 114);

  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="checkbox"]:focus {
  transition: 0ms;
  outline: max(2px, 0.15em) solid rgb(173, 173, 173);
  outline-offset: max(2px, 0.15em);
}


</style>