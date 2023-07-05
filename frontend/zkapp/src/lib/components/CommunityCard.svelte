<div class="card-container col-sm-12 col-md-5 col-lg-3">
  <Card class="card-options">

    <CardHeader>
      <a href={`/community/${uid}`} class="text-dark text-decoration-none">
         <div class="d-flex justify-content-start align-items-center mt-2">
          <img src={data.image} width="80px" crossorigin alt="Community logo" />
          <div class="ms-3">
            <h6>{data.name}</h6>
            <span class="fs-sm">
              <Badge pill color={stateColors[data.state]}>{data.state}</Badge>
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
      </a>
    </CardHeader>

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
    export let uid = 0, data, joined = false;

    const stateColors = {
      'DRAFT': 'warning',
      'APPROVED': 'success',
      'PAUSED': 'secondary',
      'REJECTED': 'danger'
    } 
</script>

<style>
  .card-container {
    max-width: 22rem;
    min-width: 22rem;
    margin-right: 0.25rem;
    margin-bottom: 0.50rem;
    display: inline-block;
  }
</style>
<!--
<div class="card-container">
  <Card class="px-3 border-0 shadow">
  <CardHeader class="bg-white d-flex justify-content-between align-items-center py-0 my-0 pt-4 fs-xs border-0">
    <div>
      <p class="mt-1 mb-0 py-0">
        <a class="fs-6 text-dark fw-bold text-decoration-none" href={`/community/${uid}`}>Community tittle</a>
      </p>
      <p class="mt-1">
        <Badge class="rounded-1 fs-xs me-2 py-1 px-2" color="success">APPROVED</Badge>
        <b>96</b> members
      </p>
    </div>
    <p>
      <Button class="rounded-4 px-3 fs-sm" outline color="primary" size="sm">Join now !</Button>
    </p>
  </CardHeader>
  <CardBody class="my-0 pt-1">
    <p class="fs-xs text-secondary">
      Description of this awesome community which you want to join. Description of this awesome community which you want to join. Description of this awesome community which you want to join.</p>
    <div class="d-flex justify-content-start">
      <p class="">
        <span class="fs-xs">Start Date</span>
        <br/><b class="fs-sm">26 Dec 2019</b>
      </p>
      <p class="px-4">
        <span class="fs-xs">Approved Date</span>
        <br/><b class="fs-sm">26 Dec 2022</b>
      </p>
    </div>
    <p class="fs-sm">
      <a href={'#'}>Become a validator</a> for this community
    </p>
    <p>

    </p>
  </CardBody>
</Card>
</div>

<script>
    import { Badge, Button, Card, CardBody, CardHeader } from "sveltestrap";
    export 
      let uid;
</script>

<style>
  .card-container {
    width:30.5%;
    /* max-width: 24rem;
    min-width: 24rem; */
    display: inline-block;
    margin-right: 2rem;
    margin-bottom: 2rem;;
  }
</style>
-->