<Button 
  on:click
  type="button"
  color={color} class="rounded-3 py-3 px-4">
  {label}
</Button>

<script>
  import { Button, Icon } from "sveltestrap";
  export let label = "", color="secondary";
</script>
