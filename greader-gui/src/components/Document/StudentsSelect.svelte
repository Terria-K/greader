<script lang="ts">
  import MdAccountCircle from "svelte-icons/md/MdAccountCircle.svelte";
  import Checkbox from "../Checkbox/Checkbox.svelte";
  import { fly } from "svelte/transition";
  import { sineOut } from "svelte/easing";

  export let selected = false;
  export let name: string;
</script>

<div class="card" in:fly={{duration: 200, easing: sineOut, x:-200}}>
  <div class="checkbox">
    <Checkbox bind:checked={selected}>
      <div class="info">
        <div class="icon">
          <MdAccountCircle/>
        </div>
        {name}
      </div>
    </Checkbox>
  </div>
</div>

<style>
.card {
  width: 100%;
  height: 50px;
  background-color: rgb(31, 31, 31);
  border: 2px solid  rgb(61, 139, 74);
  border-radius: 5px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}

.checkbox {
  margin-left: 15px;
  display: flex;
  height: 100%;
  text-align: center;
  align-items: center;
  font-size: 16px;
}

.info {
  display: flex;
  align-items: center;
}

.icon {
  width: 30px;
  height: 30px;
}
</style>