<div class="w-100">
  <Card class="border-0 no-border-bottom bg-secondary" style="height: 180px;">
    <div class="position-absolute bottom-0 end-0 m-4 p-2 " style="opacity:0.8;">
      <img class="svg" alt="" width="auto" src={'img/svg/maintenance.svg'} style="max-height: 120px;"/>
    </div>
    <div class="d-flex justify-content-center position-relative">
      <CardBody class="w-100 m-4 d-flex flex-column gap-4">
        <h1 class="text-white m-0 p-0" style="font-size: 28px;">Own a community?</h1>
        <a href={"/admined/new"} class="text-decoration-none text-dark">
          <Button size="md" color="light" class="px-3 py-2 rounded-2 bg-black border-0 text-white">
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
