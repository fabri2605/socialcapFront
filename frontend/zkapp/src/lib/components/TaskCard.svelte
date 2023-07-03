<div class="card-container">
  <Card class="card-options">

    <CardHeader>
      <div class="d-flex justify-content-between align-items-center">
        <img src={data.image} width="120px" crossorigin alt="Credential logo" />
        <div class="ms-3">
          <h6>{data.type}</h6>
          <Badge pill color={ data.state === 'COMPLETED' ? "success" : "danger" }>
            { data.state }
          </Badge>
        </div>
        <p>
      </div>
      <p class="fs-sm mt-2 text-center mb-0">{data.description}</p>
    </CardHeader>

    <CardBody class="fs-sm">
      {#if data.state==='PENDING'}
        <div class="d-flex justify-content-start">
          <p class="p-0">
            <span class="fs-xs">Assigned</span>
            <br/><b class="fs-sm">{data.assignedUTC}</b>
          </p>
          <p class="ps-4 pe-0">
            <span class="fs-xs">Due</span>
            <br/><b class="fs-sm">{data.dueUTC || "---"}</b>
          </p>
          <p class="ps-4 pe-0">
            <span class="fs-xs">Voting</span>
            <br/><b class="fs-sm">{data.currentVotes} / {data.requiredVotes}</b>
          </p>
        </div>
        <p>
          <Button color="primary" size="sm" class="rounded-5 px-3 py-1">
            <a href={"/tasks/assigned/"+uid} class="text-white text-decoration-none">
              Vote !
            </a>
          </Button>
        </p>
      {:else}
        <div class="d-flex justify-content-start">
          <p class="p-0">
            <span class="fs-xs">Assigned</span>
            <br/><b class="fs-sm">{data.assignedUTC}</b>
          </p>
          <p class="ps-4 pe-0">
            <span class="fs-xs">Completed</span>
            <br/><b class="fs-sm">{data.completedUTC || "---"}</b>
          </p>
          <p class="ps-4 pe-0">
            <span class="fs-xs">Voted</span>
            <br/><b class="fs-sm">{data.currentVotes} / {data.requiredVotes}</b>
          </p>
        </div>
    {/if}
    </CardBody>
  </Card>
</div>

<script>
    import { Badge, Button, Card, CardBody, CardHeader } from "sveltestrap";
    export let uid = 0, data;
</script>

<style>
  .card-container {
    max-width: 18rem;
    min-width: 18rem;
    margin-right: 0.25rem;
    margin-bottom: 0.50rem;
    display: inline-block;
  }
</style>