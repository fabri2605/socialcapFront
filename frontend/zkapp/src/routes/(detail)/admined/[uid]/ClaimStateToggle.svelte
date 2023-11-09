<Dropdown autoClose={true} size="sm">
  <DropdownToggle class="bg-light border-0" caret>
    <StateBadge state={state} />
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem on:click={() => changeState(DRAFT)}>
      Draft
    </DropdownItem>  
    <DropdownItem on:click={() => changeState(CLAIMED)}>
      Claimed
    </DropdownItem>  
    <DropdownItem on:click={() => changeState(IGNORED)}>
      Ignored
    </DropdownItem>  
  </DropdownMenu>
</Dropdown>    

<script>
  import { IGNORED, DRAFT, CLAIMED } from "@socialcap/contracts";
  import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "sveltestrap";
  import StateBadge from "@components/StateBadge.svelte";

  export let state;

  async function changeState(newState) {
    console.log("Change to", newState);
    state = newState;
  }
</script>
