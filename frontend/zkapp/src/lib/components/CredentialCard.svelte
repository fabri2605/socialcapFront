<div class="w-100 px-4">
  <Card class="border-0 border-bottom">
    <a href={`/credential/issued/${uid}`} class="text-decoration-none text-dark">
      <CardBody class="ps-4">
        <div class="d-flex justify-content-start align-items-center pt-0">
          <img src={data.image} width="92px" crossorigin alt="Credential logo" />
          <div class="ms-4 text-left">
            <p class="fs-sm text-secondary lh-base mt-2 mb-0">
              <b>{data.issuedBy}</b>
            </p>
            <h5 class="mt-0">{data.type}</h5>
            <p class="fs-sm text-secondary lh-base mt-2 mb-0">
              {data.description}
            </p>
            <Badge color="success" class="fs-sm">AWARDED</Badge>
          </div>
        </div>
      </CardBody>
    </a>
  </Card>
</div>

<script>
  import { goto } from "$app/navigation";
  import { Icon, Badge, Button, Card, CardBody, CardHeader } from "sveltestrap";
  import FullviewButton from "./FullviewButton.svelte";

  export let uid, data;
</script>

<style>
</style>
