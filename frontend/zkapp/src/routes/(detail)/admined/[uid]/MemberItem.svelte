
<div class="row fs-sm mx-0 mb-2 ps-4 py-1 --border-bottom border-0">
  <span class="col-7 text-start">
    <b class="fs-nm">{p.fullName}</b>
    <br><span class="fs-sm">{p.uid}</span>
  </span>
  <span class="col-3 text-start">
    <MemberRoleToggle 
      personUid={p.uid}
      communityUid={communityUid}
      bind:role={p.role}
    />
  </span>
  <!-- <span class="col-2">
    {#if p.state === 'APPLIED'}
    <Button 
      on:click={() => { p = changeState(p); }}
      outline size="sm" color="secondary">
      Accept it
    </Button>
    {/if}
  </span> -->
</div>

<script>
  import { Badge, Button } from "sveltestrap";
  import MemberRoleToggle from "./MemberRoleToggle.svelte";
  
  export let p, communityUid, admin, xadmins; 

  let stateColors = {
    "APPLIED": "warning",
    "ACCEPTED": "success",
    "DENIED": "danger"
  }

  function changeState(p) {
    p.state = 'ACCEPTED';
    return p;
  }
</script>