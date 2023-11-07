<div class="mt-4 text-start border-top border-secondary-subtle">
  {#each evidenceData as field}
    {#if field.type !== "remark"}
      <div class="pt-3 pb-0 border-bottom border-secondary-subtle">
        <p class="ps-0 py-0 fw-bold fs-nm text-start">{field.label}</p>
        <p class="px-3 py-0 fs-2 w-100 text-start">
          <EvidenceFieldView 
            field={field}
          />
        </p>
      </div>
    {/if}
  {/each}
</div>

<script>
  import EvidenceFieldView from "./EvidenceFieldView.svelte";

  export let evidenceData = [];
</script>