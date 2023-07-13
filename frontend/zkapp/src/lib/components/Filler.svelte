<script>
  export let 
    n,
    filler = "..."
  
  const lines = [];
  for (let j=0; j < n; j++) lines[j] = filler;
</script>

<div>
  {#each lines as line}
    <p style="text-align:center;">{line}
      - . - . - . -- . - . - . -- . - . - . -- . - . - . -
    </p>
  {/each}
</div>
