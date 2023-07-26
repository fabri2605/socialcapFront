<Card class="rounded-4 border border-4 border-primary text-white bg-primary shadow-sc">
  <div class="position-absolute bottom-0 end-0 opacity-85">
    <img class="svg" alt="" width="auto" src={"/img/svg/ClaimCard.svg"} />
  </div>
  <div class="p-3 position-relative">
    <CardBody
      class="d-flex flex-column align-items-start justify-items-between gap-4"
    >
      <div>
        <h1 class="fs-1">Claim</h1>
        <p class="fs-6 color-white">
          <Badge class="bg-black me-2">
            <b class="fs-6">{data.stats.countClaimables}</b>
          </Badge>available credentials
        </p>
      </div>
      <!-- <a href="/credentials/canclaim" class="text-decoration-none"> -->
      <Button
        size="md"
        class="px-3 py-2 rounded-3 bg-black text-white border-0"
        on:click={() => (open = true)}
      >
        Claim it now
      </Button>
      <!-- </a> -->
    </CardBody>
  </div>
</Card>

<ClaimCredentialDialog bind:open claimables={data.claimables} />


<script>
  import { Card, CardBody, Button, Badge } from "sveltestrap";
  import ClaimCredentialDialog from "@components/dialogs/ClaimCredentialDialog.svelte";

  export let data;

  let open = false;
</script>