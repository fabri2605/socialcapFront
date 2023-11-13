<Badge pill color={COLORS[state+""]} class="fs-sm lh-base px-3">
  {#if ALL_VOTES[state+""]}
    <Icon name={ICONS[state+""]} class="fs-nm"/>
  {/if}
  {ALL_VOTES[state+""] || ""}
</Badge>

<script>
  import { Badge, Icon } from "sveltestrap";
  import { ALL_VOTES } from "@models/votes";

  export let state; 

  const COLORS = {
    "0": "secondary",
    "1": "success",
    "-1": "danger", 
    "7": "warning"
  }

  const ICONS = {
    "0": "question-circle",
    "1": "patch-check-fill",
    "-1": "hand-thumbs-down-fill", 
    "7": "" // No result yet
  }
</script>
