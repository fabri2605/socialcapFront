<div class="card-container">
  <Card class="card-options">
  <CardHeader>
    <a href="/credentials/issued/1234">Credential #{uid}</a>
  </CardHeader>
  <CardBody>
    <p>Description</p>
    <p>State | Due date </p>
  </CardBody>
</Card>
</div>

<script>
    import { Button, Card, CardBody, CardHeader } from "sveltestrap";
    export let uid = 0;
</script>

<style>
  .card-container {
    max-width: 18rem;
    min-width: 18rem;
    display: inline-block;
  }
</style>