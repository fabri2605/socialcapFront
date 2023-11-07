
<Modal body scrollable
size="lg"
  header="Select your credential" 
  isOpen={open} 
  toggle={toggle}>
  
  <div class="mt-4">
    {#if (claimables || []).length === 0}
      <div class="px-4">
        <p>
          There are no claimable credentials in your communities.
        </p>
        <p>
          <b>Please join a community before claiming its credentials.</b>
        </p>
      </div>
    {/if}

    {#each claimables as claimable}
      <div class="mb-4 px-4">
        <CanClaimNow data={claimable} />
      </div>
    {/each}
  </div>
</Modal>

<script>
  import { Modal } from "sveltestrap";
  import CanClaimNow from "@components/cards/CanClaimNow.svelte";
	import { now } from "svelte/internal";
	import { CommunitiesContract } from "@socialcap/contracts";

  export let open = false, claimables = [];

  const toggle = () => (open = !open);
</script>