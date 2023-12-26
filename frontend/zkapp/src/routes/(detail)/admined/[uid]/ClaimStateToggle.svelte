<Dropdown autoClose={true} size="sm">
  <DropdownToggle class="bg-light border-0" caret>
    {#if updating}
      <Spinner  type="border" size="sm" class="m-1"/>
    {:else}
      <StateBadge state={state} />
    {/if}
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem on:click={() => changeState(DRAFT)}>
      {ALL_STATES[DRAFT]}
    </DropdownItem>  
    <DropdownItem on:click={() => changeState(CLAIMED)}>
      {ALL_STATES[CLAIMED]}
    </DropdownItem>  
    <DropdownItem on:click={() => changeState(IGNORED)}>
      {ALL_STATES[IGNORED]}
    </DropdownItem>  
  </DropdownMenu>
</Dropdown>    

<script>
  import { tick } from "svelte";
  import { IGNORED, DRAFT, CLAIMED } from "@socialcap/contracts";
  import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "sveltestrap";
  import { Spinner } from "sveltestrap";
  import StateBadge from "@components/StateBadge.svelte";
  import { ALL_STATES } from "@models/states";
  import { changeClaimState } from "@apis/mutations";

  export let uid, state;

  let updating = false;

  async function changeState(newState) {
    updating = true;
    await tick();

    let rs = await changeClaimState({
      uid: uid,
      state: newState
    })

    updating = false;
    await tick();

    if (rs.error) 
      return;

    state = newState;
  }
</script>
