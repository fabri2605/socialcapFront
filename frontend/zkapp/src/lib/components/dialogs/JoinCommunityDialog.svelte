
<Modal body scrollable
  header={all?.length ? "Select the community" : "Congrats !"}
  isOpen={open} 
  toggle={toggle}>
  {#if all && all.length === 0}
    <p class="">
      You have already joined all existent communities
    </p>
  {/if}  
  {#each all as joinable}
    <div class="mb-4 px-4">
      <CanJoinNow 
        data={joinable} 
        on:clicked_join_community={(ev) => handleJoinCommunityEvent(ev)}
        />
    </div>
  {/each}
</Modal>

<script>
	import { goto } from "$app/navigation";
  import { Modal } from "sveltestrap";
  import CanJoinNow from "@components/cards/CanJoinNow.svelte";
  import { joinCommunity } from "@apis/mutations";

  export let open = false, all = [];

  const toggle = () => (open = !open);

  async function handleJoinCommunityEvent(ev) {
    open = false;

    console.log(ev.detail);

    let communityUid = ev.detail.communityUid;
    let personUid = ev.detail.personUid;

    console.log(ev.detail, communityUid, personUid);

    const done = await joinCommunity({
      communityUid: ev.detail.communityUid,
      personUid: ev.detail.personUid
    })

    // reload page ...
    if (done) {
      // we need this one to reload page !
      window.location.reload()
    }
  }
</script>