<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import ModalForm from "../Modal/ModalForm.svelte";
  import type { SubjectType } from "../../composables/stores";

  const close = createEventDispatcher<{close: string}>();

  export let active: {active: boolean, subject: SubjectType};

  let textAreaRef: HTMLTextAreaElement | null;
  let value = "";

  onMount(() => {
    textAreaRef?.addEventListener('keydown', function(e: KeyboardEvent) {
      if (e.key == "Tab") {
        e.preventDefault();

        var start = this.selectionStart;
        var end = this.selectionEnd;

        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

        this.selectionStart = this.selectionEnd = start + 1;
      }
    })
  });

</script>

<ModalForm bind:active={active.active} on:close={() => close('close', value)}>
  <div class="flex w-full h-full">
    <textarea bind:this={textAreaRef} bind:value={value} spellcheck="false" class="w-full resize-none m-12 bg-std-dark rounded text-white text-lg"/>
  </div>
</ModalForm>
