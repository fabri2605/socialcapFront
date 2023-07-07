<Card class="text-white bg-primary" style="min-height:220px">
  <div class="position-absolute bottom-0 end-0" style="opacity: 0.85;">
    <img class="svg" alt="" width="200px" src={'/img/svg/group3320.svg'} />
  </div>
  <div class="d-flex justify-content-center p-3 position-relative">
    <CardBody>
      <h1 class="fs-2">Claim</h1>
      <p class="fs-6 color-white">
        <b class="fs-6">{data.stats.countClaimables}</b> available credentials
      </p>
      <a href="/credentials/canclaim" class="text-decoration-none">
        <Button size="md" color="light" class="px-3 py-2 rounded-1">
          Claim it now
        </Button>
      </a>
    </CardBody>
  </div>
</Card>

<script>
  import { Card, CardBody, Button } from "sveltestrap";
  export let data;
</script>
