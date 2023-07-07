<Card class="bg-warning" style="min-height:280px">
  <div class="position-absolute bottom-0 end-0">
    <img class="svg" alt="" width="160px" src={'/img/svg/feature4.svg'} />
  </div>
  <div class="d-flex justify-content-center p-3 position-relative">
    <CardBody>
      <h1 class="fs-2">Validate</h1>
      <p class="banner-feature__para color-white">
        There are {data.stats.countCommunities} communities you can validate.
      </p>
      <Button size="md" color="light" class="px-3 py-2 rounded-1"
        >Become a validator</Button
      >
    </CardBody>
  </div>
</Card>

<script>
  import { Card, CardBody, Button } from "sveltestrap";
  export let data;
</script>
