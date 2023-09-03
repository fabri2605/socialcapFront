<Button 
  on:click
  type="button"
  color={color} class="rounded-5 py-2 px-3">
  {label}
</Button>

<script>
  import { Button, Icon } from "sveltestrap";
  export let label = "", color="secondary";
</script>
