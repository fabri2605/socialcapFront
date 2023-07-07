<div class="w-100 px-4">
  <Card class="border-0 no-border-bottom" style="background-color: var(--bs-gray-300);">
    <div class="position-absolute bottom-0 end-0" style="opacity:0.8;">
      <img class="svg" alt="" width="180px" src={'img/svg/maintenance.svg'} />
    </div>
    <div class="d-flex justify-content-center position-relative">
      <CardBody class="ps-0 ms-4">
        <p class="fw-bold">Do you admin a community ?</p>
        <a href={"/admined/new"} class="text-decoration-none text-dark">
          <Button size="md" color="light" class="px-3 py-2 rounded-2">
            Register it
          </Button>
        </a>
      </CardBody>
    </div>
  </Card>
</div>

<script>
  import { Card, CardBody, Button } from "sveltestrap";
</script>
