
<Modal body scrollable
  header="Select your credential" 
  isOpen={open} 
  toggle={toggle}>
  {#each claimables as claimable}
    <div class="mb-4 px-4">
      <CanClaimNow data={claimable} />
    </div>
  {/each}
</Modal>

<script>
  import { Modal } from "sveltestrap";
  import CanClaimNow from "@components/cards/CanClaimNow.svelte";

  export let open = false, claimables = [];

  const toggle = () => (open = !open);
</script>