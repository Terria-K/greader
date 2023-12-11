<script lang="ts">
  import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'
  import type { ToastProp } from '../../composables/toast';

  export let prop: ToastProp; 
</script>

<div class="toast" class:error={prop.isError} >
  <button class="close" on:click={() => { 
        prop.close()
      }
    }>
    <IoIosClose/>
  </button>
  <p class="title">{prop.title}</p>
  <p class="content">{prop.content}</p>
</div>

<style>
.toast {
  margin-top: 10px;
  width: 320px;
  min-width: 320px;
  min-height: 110px;
  background-color: transparent;
  border-radius: 10px;
  transition: 300ms;
  animation-name: Fade;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.toast:hover {
  background-color: rgb(95, 209, 114, 0.918) !important;
}

.toast.error {
  animation-name: ErrorFade;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.toast.error:hover {
  background-color: rgb(255, 53, 53, 0.918) !important;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-top: -10px;
}

.content {
  padding: 0;
}

p {
  margin: 0;
  margin-left: 20px;
  margin-bottom: 8px;
  margin-right: 20px;
}

.close {
  display: inline-block;
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: transparent;
  color: white;
  box-shadow: none;
}

.close:hover {
  background-color: transparent;
}

@keyframes Fade {
  0% {
    background-color: transparent;
  }
  100% {
    background-color: rgba(61, 139, 74, 0.918);
  }
}

@keyframes ErrorFade {
  0% {
    background-color: transparent;
  }
  100% {
    background-color: rgb(194, 2, 2, 0.918);
  }
}
</style>