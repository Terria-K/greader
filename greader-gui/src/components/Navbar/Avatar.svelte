<script lang="ts">
  import MdAccountCircle from "svelte-icons/md/MdAccountCircle.svelte";

  export let url: string | null;
</script>

{#if url}
<div class="avatar">
  <img src={url} alt="avatar"/>
</div>
{:else}
<div class="avatar">
  <MdAccountCircle/>
</div>
{/if}

<style>
.avatar {
  justify-content: center;
  align-items: center;
  display: flex;
}
img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>