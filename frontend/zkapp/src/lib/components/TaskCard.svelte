<div class="card-container">
  <Card class="card-options">

    <CardHeader class="d-flex justify-content-between">
      <p>
        <a href="/tasks/1234">Task #{uid}</a>
      </p>
      <p>
        <Badge pill color={ state === 'F' ? "success" : "danger" }>
          { state === 'F' ? "Completed" : "Pending" }
        </Badge>
      </p>
    </CardHeader>

    <CardBody class="fs-sm">
      <p class="fs-sm">Description</p>
      {#if state==='P'}
        <p>Due: 12-Jun-2023
          <br>Votes: 3</p>
        <p>
          <Button color="primary" size="sm">Vote !</Button>
        </p>
      {:else}
        <p>Completed: 12-Jun-2023
          <br>Votes: 5</p>
        <p>
      {/if}
    </CardBody>
  </Card>
</div>

<script>
    import { Badge, Button, Card, CardBody, CardHeader } from "sveltestrap";
    export let uid = 0, state = 'F'
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