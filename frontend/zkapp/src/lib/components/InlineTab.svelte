{#if current && items.length}
<div class="d-inline-block">
  {#each items as item}
    <a href={'#'} 
      on:click={(ev) => { current = item.value; }} 
      class={"mx-1 "+isActive(item.value, current)}
      >{item.text}</a>
  {/each}
</div>
{/if}

<script>
  import { onMount } from "svelte";

  export let 
    current = null,
    items = []; // [{ value: text: }, ...]

  function isActive(state, current) {
    if (state === current) {
      return "bg-secondary rounded-1 text-white py-1 px-2 text-decoration-none fs-6";
    }
    else {
      return " fs-6";
    }
  }
</script>
