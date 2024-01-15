<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ModalForm from "../Modal/ModalForm.svelte";
  import type { SubjectType } from "../../composables/stores";

  const close = createEventDispatcher<{close: string}>();

  export let active: {active: boolean, subject: SubjectType};

  let textAreaRef: HTMLTextAreaElement | null;

  function tab(e: KeyboardEvent) {
    if (e.key == "Tab") {
      e.preventDefault();

      var start = textAreaRef!.selectionStart;
      var end = textAreaRef!.selectionEnd;

      textAreaRef!.value = textAreaRef!.value.substring(0, start) + "\t" + textAreaRef!.value.substring(end);

      textAreaRef!.selectionStart = textAreaRef!.selectionEnd = start + 1;
    }
  }
</script>

<ModalForm bind:active={active.active} on:close={() => close('close', active.subject.script)}>
  <div class="flex w-full h-full">
    <textarea bind:this={textAreaRef} bind:value={active.subject.script} 
    on:keydown={tab}
    spellcheck="false" class="w-full resize-none m-12 bg-std-dark rounded text-white text-lg"/>
  </div>
</ModalForm>
