<script lang="ts">
  export let open: boolean;
</script>

<div class="fade" class:open={open}>
</div>

<style>
.fade {
  pointer-events: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.0);
  transition: 300ms;
}

.open {
  pointer-events: all;
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>