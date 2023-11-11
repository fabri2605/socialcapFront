<tr class="text-start">
  <td class="p-2 pe-1">
    <ClaimStateToggle 
      uid={claim.uid} 
      bind:state={claim.state} 
    />
  </td>

  <td class="p-2 pe-3">
    <!-- href={`${api.baseUrl}/credential/claimed/${claim.uid}`} -->
    <a 
      href={'#'}
      class="text-link fs-nm  d-flex justify-content-between align-items-center"
      on:click={(ev) => { 
        goto(`/credential/claimed/${claim.uid}`); 
        ev.preventDefault();
        ev.stopPropagation();
      }}
      target="_blank"
      >
      <b>{claim.applicant.fullName}</b>
      <!-- on:click={() => goto(href)} -->
    </a>
    <!-- <span class="fs-xs">{claim.uid}</span> -->
  </td>

  {#each columns as col}
    <td class="fs-sm ps-3 pb-2">
      {valueToString(claim.evidenceData[col])}
    </td>
  {/each}
</tr>

<script>
  import { goto } from "$app/navigation";
  import { Input } from "sveltestrap";
  import Markdown from "svelte-exmarkdown";
  import StateBadge from "@components/StateBadge.svelte";
  import EvidenceFieldView from "@components/claims/EvidenceFieldView.svelte";
  import ClaimStateToggle from "./ClaimStateToggle.svelte";
  import { getAPIConfig } from "$lib/globals"

  export let claim, columns=[];

  const api = getAPIConfig();


  /**
   * Convert the field value to a safe text representation
   * @param field
   * @returns string
   */
  function valueToString(field) {
    if (!field) return "";

    if (['text','note','radio'].includes(field.type))
      return (field.value?.substring(0, 600) || "");

    if (['links','files','images','checks'].includes(field.type))
      return (field.value || []).filter(t => t.trim() !== "").join(',');

    if (field.type === 'remark')
      return "";

    return "";
  }
</script>