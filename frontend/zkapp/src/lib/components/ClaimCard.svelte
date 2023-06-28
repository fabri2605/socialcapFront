<div class="card-container">
  <Card class="card-options">
  <CardHeader>
    <a href="/credentials/claimed/1234">Claim #{uid}</a>
  </CardHeader>
  <CardBody>
    <p>Description</p>
    <p>State | Date submited </p>
    <a href="credentials/claimed/1234">Claim Link</a>
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