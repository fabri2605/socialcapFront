<div class="card-container">
  <Card class="ps-3 pe-1 border-1 border-light shadow">
  <CardHeader class="bg-white d-flex justify-content-between align-items-center py-0 my-0 pt-4 fs-xs border-0">
    <div>
      <p class="mt-1 mb-0 py-0">
        <a class="fs-6 text-dark fw-bold text-decoration-none" 
          href={`/canclaim/${uid}`}
          >{data.title}</a>
        </p>
        <p class="fs-6">
          <Badge color="warning" pill>3</Badge><span class="fs-sm"> 
            &nbsp; still available.</span>
          </p>
      </div>
      <p class="lh-1">
        <Badge class="rounded-1 fs-xs mx-2 py-2" color="success">AVAILABLE</Badge>
      </p>
  </CardHeader>
  <CardBody class="my-0 pt-1">
    <p class="fs-xs text-body">{@html data.description}</p>
    <div class="d-flex justify-content-start">
      <p class="">
        <span class="fs-xs">Start Date</span>
        <br/><b class="fs-sm">26 Dec 2019</b>
      </p>
      <p class="px-4">
        <span class="fs-xs">Ends Date</span>
        <br/><b class="fs-sm">2 Aug 2023</b>
      </p>
    </div>
    <p>
      <Button class="rounded-4 px-3 fs-sm" color="primary" size="sm">Claim it now !</Button>
    </p>
  </CardBody>
</Card>
</div>

<script>
    import { Badge, Button, Card, CardBody, CardHeader } from "sveltestrap";
    export let uid, data={};
</script>

<style>
  .card-container {
    max-width: 18rem;
    min-width: 18rem;
    display: inline-block;
    margin-right: 2rem;
    margin-bottom: 2rem;;
  }
</style>