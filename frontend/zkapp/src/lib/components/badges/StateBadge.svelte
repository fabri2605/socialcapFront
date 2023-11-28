<Badge pill color={COLORS[state]}>
  {ALL_STATES[state] || ""}
</Badge>

<script>
  import { Badge } from "sveltestrap";
  import { ALL_STATES } from "@models/states";

  export let state; 

  const COLORS = {
    0: "white", // NONE",
    1: "dark", // DRAFT",   
    2: "gray", // CANCELED",   
    3: "danger", // REVISION",    
    4: "info", // CLAIMED",   
    6: "warning", // VOTING",
    7: "warning", // ASSIGNED",
    8: "success", // ACTIVE",
    9: "warning", // WAITING",
    10: "primary", // DONE",
    11: "light", // IGNORED", // will not do this 
    12: "danger", // UNPAID
    19: "danger", // REJECTED",   
    20: "success", // APPROVED"
  }
</script>
