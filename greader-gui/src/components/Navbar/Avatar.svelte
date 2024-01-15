<script lang="ts">
  import MdAccountCircle from "svelte-icons/md/MdAccountCircle.svelte";

  export let url: string | null;
</script>

{#if url}
<div class="flex justify-center items-center">
  <img class="w-[30px] h-[30px] rounded-[50%]" src={url} alt="avatar"/>
</div>
{:else}
<div class="flex justify-center items-center">
  <MdAccountCircle/>
</div>
{/if}