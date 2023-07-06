<div class="row fs-sm mx-0 mb-2 ps-4 pt-2 pb-3 border-bottom border-1">
  <span class="col-1">
    &nbsp;
  </span>
  <div class="col lh-base">
    <Button outline class="px-3 py-2 rounded-2" color="dark" size="sm" on:click={addMasterPlan}>
      <b>+</b> Add a new Claim Master Plan ...
    </Button>
  </div>
</div>

<script>
  import { Badge, Button } from "sveltestrap";
  import { MasterPlan } from "@models/master-plan";

  export let plans, community; 

  function addMasterPlan() {
    let plan = new MasterPlan();
    plan.communityUid = community.uid;
    plan.name = "";
    plan.description = "" ;
    plans = [].concat(plans).concat(plan);    
  }
</script>
