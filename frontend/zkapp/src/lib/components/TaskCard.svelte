<div class="w-100 px-4">
  <Card class="border-0 border-bottom">
    <CardBody class="ps-4">
      <div class="d-flex justify-content-start align-items-center pt-0">
        <img src={data.image} width="92px" crossorigin alt="Credential logo" />
        <div class="w-100 ms-4 text-left">
            <p class="fs-sm text-secondary lh-base mt-2 mb-0">
              <b>{data.community}</b>
            </p>
            <h5 class="mt-0">{data.type}
              <span class="fs-6 ms-2">
                <Badge pill color={ data.state === 'COMPLETED' ? "success" : "danger" }>
                  { data.state }
                </Badge>
              </span>
            </h5>
            <p class="fs-sm text-secondary lh-base mt-2 mb-0">
              {data.description}
            </p>
            {#if data.state==='PENDING'}
              <div class="d-flex justify-content-start m-0 p-0">
                <p class="p-0 m-0">
                  <span class="fs-xs">Assigned</span>
                  <b class="fs-sm">{data.assignedUTC}</b>
                  &nbsp;
                  <span class="fs-xs">Due</span>
                  <b class="fs-sm">{data.dueUTC || "---"}</b>
                  &nbsp;
                  <span class="fs-xs">Voting</span>
                  <b class="fs-sm">{data.currentVotes} / {data.requiredVotes}</b>
                </p>
              </div>
              <p class="mt-2">
                <Button color="primary" size="sm" class="rounded-5 px-3 py-1">
                  <a href={`/task/${uid}`} class="text-white text-decoration-none">
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
    export let uid, data;
</script>
