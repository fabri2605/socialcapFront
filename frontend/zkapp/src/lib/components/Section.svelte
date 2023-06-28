<div class="no-border no-border-dark rounded-1 pb-3">
  <div class={"p-0 no-border mx-auto "+mw}>
    <slot></slot>
  </div>
</div>

<script>
  export let 
    readable = false,
    form = false,
    fluid = true;

  $: mw = (readable ? "mw-readable" : "") || (form ? "mw-form": "") || "";  
</script>