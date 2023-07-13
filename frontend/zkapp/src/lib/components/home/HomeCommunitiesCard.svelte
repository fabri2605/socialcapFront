<Card class="bg-info" style="min-height:220px">
  <div class="position-absolute bottom-0 end-0" style="opacity: 0.85;">
    <img class="svg" alt="" width="200px" src={'/img/svg/banne-group21.svg'} />
  </div>
  <div class="d-flex justify-content-center p-3 position-relative">
    <CardBody>
      <h1 class="fs-2">Join</h1>
      <p class="banner-feature__para color-white">
        <b>{data.stats.countCommunities}</b> awesome communities
      </p>
      <Button size="md" color="light" class="px-3 py-2 rounded-1"
        on:click={() => open = true}
        >Join one</Button
      >
    </CardBody>
  </div>
</Card>

<JoinCommunityDialog 
  bind:open={open}
  joined={data.joined} 
  all={data.allCommunities} />

<script>
  import { Card, CardBody, Button } from "sveltestrap";
  import JoinCommunityDialog from "@components/dialogs/JoinCommunityDialog.svelte";

  export let data;

  let open = false;
</script>
