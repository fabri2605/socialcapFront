<div class="card-container">
  <Card class="px-3 border-0 shadow">
  <CardHeader class="bg-white d-flex justify-content-between align-items-center py-0 my-0 pt-4 fs-xs border-0">
    <div>
      <p class="mt-1 mb-0 py-0">
        <a class="fs-6 text-dark fw-bold text-decoration-none" href={`/communities/${uid}`}>Community tittle</a>
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