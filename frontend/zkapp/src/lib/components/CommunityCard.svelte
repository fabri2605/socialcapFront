<div class="card-container">
  <Card class="card-options">
    <a href={`/community/${uid}`} class="text-decoration-none text-dark">
      <FullviewButton />

      <CardHeader>
        <div class="d-flex justify-content-start align-items-center mt-2">
          <img src={data.image} width="30%" crossorigin alt="Community logo" />
          <div class="ms-3 mt-3">
            <h6>{data.name}</h6>
            <span class="fs-6">
              <Badge color={stateColors[data.state]}>{data.state}</Badge>
            </span>
          </div>
          <p>
        </div>
        <p class="fs-sm lh-base mt-3 text-left mb-0 text-secondary">
          {@html data.description}
          <br><b>{data.countMembers}</b> members
          | <span class="fs-5"> 🎉 </span>
          &nbsp; <b>{data.countCredentials}</b> credentials issued !
        </p>
      </CardHeader>
    </a>

    <CardBody class="fs-sm">
        <div class="d-flex justify-content-start">
          <p class="p-0">
            <span class="fs-xs">Registered</span>
            <br/><b class="fs-sm">{data.createdUTC}</b>
          </p>
          <p class="ps-4 pe-0">
            <span class="fs-xs">Approved</span>
            <br/><b class="fs-sm">{data.approvedUTC || "---"}</b>
          </p>
          <p class="ps-4 pe-0">
            <span class="fs-xs">Updated</span>
            <br/><b class="fs-sm">{data.updatedUTC}</b>
          </p>
        </div>
        {#if !joined}
          <p>
            <Button color="primary" size="sm" class="rounded-5 px-3 py-1">
              Join it !
            </Button>
          </p>
        {/if}
        {#if joined}
          <p>
            <Button outline color="primary" size="sm" class="rounded-5 px-3 py-1">
              Become a validator
            </Button>
          </p>
        {/if}
    </CardBody>
  </Card>
</div>

<script>
    import { Badge, Button, Card, CardBody, CardHeader } from "sveltestrap";
    import FullviewButton
     from "./FullviewButton.svelte";
    export let uid = 0, data, joined = false;

    const stateColors = {
      'DRAFT': 'warning',
      'APPROVED': 'success',
      'PAUSED': 'secondary',
      'REJECTED': 'danger'
    } 
</script>
