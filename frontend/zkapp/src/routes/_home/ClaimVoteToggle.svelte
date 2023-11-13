<Dropdown autoClose={true} size="sm">
  <DropdownToggle class="bg-light border-0" caret>
    {#if updating}
      <Spinner size="sm" />
    {:else}
      <VoteBadge state={state} />
    {/if}
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem on:click={() => changeState("1")}>
      Positive
    </DropdownItem>  
    <DropdownItem on:click={() => changeState("-1")}>
      Negative
    </DropdownItem>  
    <DropdownItem on:click={() => changeState("0")}>
      Abstained
    </DropdownItem>  
    <DropdownItem on:click={() => changeState("7")}>
      Not voted
    </DropdownItem>  
  </DropdownMenu>
</Dropdown>

<script>
  import { tick } from "svelte";
  import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "sveltestrap";
  import { Spinner } from "sveltestrap";
  import VoteBadge from "@components/badges/VoteBadge.svelte";
  import { changeClaimState } from "@apis/mutations";

  export let uid, state;

  let updating = false;

  async function changeState(newState) {
    updating = true;
    await tick();

    // let rs = await changeClaimState({
    //   uid: uid,
    //   state: newState
    // })

    updating = false;
    await tick();

    // if (rs.error) 
    //   return;

    state = newState;
  }
</script>
