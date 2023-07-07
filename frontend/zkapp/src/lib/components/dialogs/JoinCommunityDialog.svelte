
<Modal body scrollable
  header="Select the community" 
  isOpen={open} 
  toggle={toggle}>
  {#each all as joinable}
    <div class="mb-4 px-4">
      <CanJoinNow data={joinable} />
    </div>
  {/each}
</Modal>

<script>
  import { Modal } from "sveltestrap";
  import CanJoinNow from "@components/cards/CanJoinNow.svelte";

  export let open = false, joined = [], all = [];

  const toggle = () => (open = !open);
</script>