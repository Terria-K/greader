<script lang="ts">
  import { writable } from "svelte/store";
  import type { SubjectType } from "../../composables/stores";
  import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.svelte";
  import Crumbs from "../Breadcrumbs/Crumbs.svelte";
  import ModalForm from "../Modal/ModalForm.svelte";

  export let categoryActive: {active: boolean, subject: SubjectType};

  let state = writable(0);
</script>
<ModalForm bind:active={categoryActive.active}>
  <p>Create Category</p>
  <Breadcrumbs {state}>
    <Crumbs title="Set Information"/>
    <Crumbs title="Add Activities"/>
  </Breadcrumbs>
</ModalForm>