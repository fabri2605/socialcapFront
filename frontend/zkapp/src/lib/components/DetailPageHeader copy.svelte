<div class="w-100 m-0 p-0 mt-0 ps-2 pe-2 d-flex justify-content-between align-items-center">

  <Breadcrumb class="fs-sm pt-3">
    {#each items as item, j}
      {#if j<items.length-1}
        <BreadcrumbItem>
          <a href={item.href}>{item.text}</a>
        </BreadcrumbItem>
      {:else}
        <BreadcrumbItem active class="fs-6 text-dark">
          <b>{item.text}</b>
        </BreadcrumbItem>
      {/if}
    {/each}
  </Breadcrumb>

  <CloseButton size="fs-2"/>  
</div>

<script>
  import { Breadcrumb, BreadcrumbItem } from "sveltestrap";
  import CloseButton from "./CloseButton.svelte";

  export let items = []; // [{ href, text }]
  // the last item will allways be the active item
</script>

