<div class="w-100">
  <Card class="border-1 shadow-sm">
    <CardHeader>
      <div class="d-flex justify-content-start align-items-center position-relative">
        <img src={data.image} width="110px" class="mt-0" alt="..." crossorigin>  
        <div class="ps-4 pt-4 mt-2">
          <p class="lh-base fs-xs text-secondary p-0 m-0">
            <b class="text-secondary">{data.community}</b>
          </p>
          <h6 class="mt-1 mb-2 py-0 fw-bold">{data.name}</h6>
          <p class="text-secondary fs-xs">{data.description}</p>
        </div>
        <div class="d-inline-block position-absolute top-0 end-0">
          <p class="d-inline-block rounded-5 border border-1 pe-2 mt-2">
            <Badge color="danger" pill class="fs-6">3</Badge>
            <span class="fs-xs d-inline-block m-0 p-0 lh-1">Available</span>
          </p>
        </div>
      </div>
    </CardHeader>

    <CardBody class="my-0 pt-1 d-flex justify-content-between align-items-center">
      <div class="d-flex justify-content-start">
        <p class="">
          <span class="fs-xs">Start Date</span>
          <br/><b class="fs-sm">{data.startsUTC}</b>
        </p>
        <p class="px-4">
          <span class="fs-xs">Ends Date</span>
          <br/><b class="fs-sm">{data.endsUTC}</b>
        </p>
      </div>

      <div class="d-inline-block rounded-4 border border-2 border-white">
        <a href={`/credential/new/${uid}`} class="text-white text-decoration-none fs-sm">
          <Button class="rounded-5 px-3 py-2 fs-sm" color="primary" size="sm">
            Claim it now !
          </Button>
        </a>
      </div>
    </CardBody>
  </Card>
</div>

<script>
  import { Badge, Button, Card, CardBody, CardHeader } from "sveltestrap";

  export let uid, data={};
</script>
