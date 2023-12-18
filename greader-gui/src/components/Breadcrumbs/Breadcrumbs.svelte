<script lang="ts">
  import { setContext } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import type { CrumbProp } from './Crumbs.svelte';

  let breadIndex = writable(-1);
  export let state: Writable<number>;

  setContext<CrumbProp>('breadIndex', {
    index: () => {
      $breadIndex += 1;
      return $breadIndex;
    },
    count: breadIndex,
    currentState: state
  });
</script>

<div class="bread">
  <slot/>
</div>

<style>
.bread {
  margin-left: 20px;
  display: flex;
  font-weight: 500;
}

</style>
