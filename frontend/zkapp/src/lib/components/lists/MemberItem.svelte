
<div class="row fs-sm mx-0 mb-2 ps-4 py-1 --border-bottom border-0">
  <span class="col-7 text-start">
    <b class="fs-nm">{p.fullName}</b>
    <br><span class="fs-sm">{p.uid}</span>
  </span>
  <span class="col-3 text-start">
    <Badge pill color="light" class="px-2 py-1 fs-xs">
      {allRoles(p.role)}
    </Badge>
  </span>
  <span class="col-2">
    {#if p.state === 'APPLIED'}
    <Button 
      on:click={() => { p = changeState(p); }}
      outline size="sm" color="secondary">
      Accept it
    </Button>
    {/if}
  </span>
</div>

<script>
  import { Badge, Button } from "sveltestrap";

  export let p, admin, xadmins; 

  let stateColors = {
    "APPLIED": "warning",
    "ACCEPTED": "success",
    "DENIED": "danger"
  }

  let roleText = {
    "1": "Member",
    "2": "Validator",
    "3": "Judge"
  }

  function allRoles(role) {
    let s = roleText[role] 
      + ((p.uid === admin || xadmins.includes(p.uid)) ? ", Admin" : "");
    return s
  }

  function changeState(p) {
    p.state = 'ACCEPTED';
    return p;
  }
</script>