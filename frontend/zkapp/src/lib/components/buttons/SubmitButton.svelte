{#if !disabled}
  <Button 
    on:click {disabled}
    type="button"
    color={!disabled ? color : "light"} 
    class="rounded-3 py-3 px-4">
    {label}
  </Button>
{/if}

<script>
  import { Button, Icon } from "sveltestrap";
  export 
    let label = "", 
    color="secondary", 
    disabled = null;
</script>
