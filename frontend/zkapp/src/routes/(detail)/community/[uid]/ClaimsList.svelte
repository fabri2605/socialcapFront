<div>
  <div class="d-flex justify-content-between align-items-center p-3">
    <div class="col-2 me-2">
      <Input 
        type="search" 
        class="w-100"
        placeholder="Search ..."
        bind:value={contains} 
      />
    </div>
  </div>
  
  <table class="table table-striped table-hover">
    <thead>
      <ClaimItemHeader fields={fields} columns={columns} />
    </thead>
    <tbody>
      {#each filteredClaims as claim}
        <ClaimItem claim={claim} columns={columns} />
      {/each}
    </tbody>
  </table>
</div>

<script>
  import { Icon, Input, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from "sveltestrap";
  import ClaimItem from "./ClaimItem.svelte";
  import ClaimItemHeader from "./ClaimItemHeader.svelte";
  import { ALL_STATES } from "@models/states";
  import { getAPIConfig } from "$lib/globals"

  export let communityUid, claims = [];

  let 
    columns = [],
    contains = "",
    orderBy = [];
    
  let fields = prepareColumnsSelector(claims);

  let searchableClaims = makeSearchable(claims);

  let downloadLink = setDownloadLink(communityUid);

  $: columns = filterSelected(fields);

  $: filteredClaims = filterClaims(searchableClaims, contains);


  function makeSearchable(claims) {
    if ((claims || []).length === 0) 
      return;

    claims = claims.map((claim) => {
      // let values = JSON.parse(claim.evidenceData);
      // const texts = (values || []).map((t) => "["+t.value+"]").join("");
      claim.searchable = (
        +claim.applicant.fullName
        +ALL_STATES[claim.state])
        .toUpperCase();
      // claim.evidenceData = JSON.parse(claim.evidenceData);
      return claim;
    })

    return claims;
  }


  function prepareColumnsSelector(claims) {
    if ((claims || []).length === 0) 
      return;

    const evidenceData = JSON.parse(claims[0].evidenceData);
    return evidenceData
      .map((t, j) => {
        return {
          label: t.label,
          index: j,
          isRemark: (t.type === 'remark'),
          selected: false
        }
      }) 
  }


  function filterSelected(fields) {
    let cols = fields.filter((t) => t.selected).map((t) => t.index);
    return cols;
  }

  
  function filterClaims(claims, word) {
    if (!contains.trim().length)
      return claims;

    word = word.toUpperCase();
    let filtered = [];
    claims.forEach((claim) => {
      let ok = claim.searchable.includes(word);
      if (ok) filtered.push(claim);
    });

    return filtered;
  }


  function setDownloadLink(communityUid) {
    const api = getAPIConfig();
    return {
      href: (
        `${api.baseUrl}/download/community_claims?uid=${communityUid}`
      ),
      fileName: "claims.txt"
    }
    // const hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:attachment/text,' + encodeURI(content);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'claims.csv';
    // hiddenElement.click();
  }
</script>