<div class="d-inline-block">
    <Button 
      on:click={toggle}
      outline color="secondary" size="sm">
      <!-- show the inverse of the current icon -->
      <Icon name={icon} class="fs-sm text-dark" />
    </Button>
</div>

<script>
  import { onMount } from "svelte";
  import { Button, Icon } from "sveltestrap";

  export let 
    current = null,
    options = []; // [{ value: icon: }, ...]

  $: option = (options[0] === current) ? 0 : 1;
  $: icon = options[option === 0 ? 1 : 0];

  function toggle() {
    current = (option===0) ? options[1] : options[0];
  } 
</script>
