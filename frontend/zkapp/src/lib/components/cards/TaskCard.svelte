<div class="w-100 px-4">
  <Card class="border-0 border-bottom">
    <CardBody class="ps-4">
      <div class="d-flex justify-content-start align-items-center pt-0">
        <img src={data.plan.image} width="92px" crossorigin alt="Credential logo" />
        <div class="w-100 ms-4 text-left">
            <p class="fs-sm text-secondary lh-base mt-2 mb-0">
              <b>{data.community.name}</b>
            </p>
            <h5 class="mt-0">{data.plan.name}
              <span class="fs-6 ms-2">
                <StateBadge state={data.state} />
              </span>
            </h5>
            <p class="fs-sm text-secondary lh-base mt-2 mb-0">
              {data.plan.description}
            </p>
            {#if data.state === ASSIGNED}
              <div class="d-flex justify-content-start m-0 p-0">
                <p class="p-0 m-0">
                  <span class="fs-xs">Assigned</span>
                  <b class="fs-sm">{prettyDate(data.assignedUTC)}</b>
                  &nbsp;
                  <span class="fs-xs">Due</span>
                  <b class="fs-sm">{prettyDate(data.dueUTC)}</b>
                  &nbsp;
                  <span class="fs-xs">Voting</span>
                  <b class="fs-sm">
                    {data.claim.positiveVotes+data.claim.negativeVotes+data.claim.ignoredVotes} 
                    / {data.claim.requiredVotes}
                  </b>
                </p>
              </div>
              <p class="fs-xs mt-1">Claim: <b>{claimIdn}</b></p>
              <p class="mt-2">
                <Button color="primary" size="sm" class="rounded-5 px-3 py-1">
                  <a href={`/task/${data.uid}`} class="text-white text-decoration-none">
                    Vote !
                  </a>
                </Button>
              </p>
            {/if}          
        </div>
      </div>
    </CardBody>
  </Card>
</div>

<script>
  import { Badge, Button, Card, CardBody, CardHeader } from "sveltestrap";
  import StateBadge from "../badges/StateBadge.svelte";
  import { ASSIGNED } from "@models/states";
  import { prettyDate } from "@utilities/datetime";

  export let data;

  let claimIdn = data.claim.uid.slice(0,6)+'...'+data.claim.uid.slice(-6);
</script>
