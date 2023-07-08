<Card class="text-white bg-secondary" --style="min-height:220px;">
  <div class="position-absolute bottom-0 end-0" style="opacity: 1;">
    <img class="svg" alt="" width="200px" src={'img/svg/maintenance.svg'} />
  </div>
  <div class="d-flex justify-content-center p-3 position-relative">
    <CardBody class="">
      <h1 class="fs-3">Admin</h1>
      <p class="">Do you admin a community ?</p>
      <a href={"/admined/new"} class="text-decoration-none text-dark">
        <Button size="md" color="light" class="px-3 py-2 rounded-1">
          Register it
        </Button>
      </a>
    </CardBody>
  </div>
</Card>

<script>
  import { Card, CardBody, Button } from "sveltestrap";
</script>
