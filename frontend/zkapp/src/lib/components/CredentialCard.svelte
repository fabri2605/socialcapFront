<div class="card-container">
  <Card on:click={() => goto(`/credentials/issued/${data.uid}`)}>
    <FullviewButton />

    <CardHeader>
      <div class="d-flex justify-content-between align-items-center pt-2">
        <img src={data.image} width="120px" crossorigin alt="Credential logo" />
        <div class="ms-3">
          <Badge color="success" class="fs-sm">AWARDED</Badge>
          <h6 class="mt-2">{data.type}</h6>
        </div>
      </div>
      <p class="fs-sm text-center lh-base mx-2 mt-2 mb-0">
        <b class="d-inline-block --py-2">{data.issuedBy}</b>
        <br>{data.description}
      </p>
    </CardHeader>

    <CardBody class="fs-sm">
        <div class="d-flex justify-content-start">
          <p class="p-0">
            <span class="fs-xs">Issued</span>
            <br/><b class="fs-sm">{data.issuedUTC}</b>
          </p>
          <p class="ps-4 pe-4">
            <span class="fs-xs">Valid</span>
            <br/><b class="fs-sm">{data.dueUTC || "Forever"}</b>
          </p>
        </div>
    </CardBody>
  </Card>
</div>

<script>
  import { goto } from "$app/navigation";
  import { Icon, Badge, Button, Card, CardBody, CardHeader } from "sveltestrap";
  import FullviewButton from "./FullviewButton.svelte";
  export let data;
</script>

<style>
  .card-container {
    max-width: 18rem;
    min-width: 18rem;
    margin-right: 0.25rem;
    margin-bottom: 0.50rem;
    display: inline-block;
  }
</style>
