<div class="card-container">
  <Card class="card-options">
    <CardHeader class="d-flex justify-content-between">
      <p>
        <a href={`/admins/${uid}`}>Community tittle</a>
      </p>
      <p>
        <Badge pill color="success">Approved</Badge>
      </p>
    </CardHeader>
    <CardBody>
      <p>Description</p>
      <p>Members count</p>
      <p>Claim types:
        <a href={"/plans/1234"}>Claim A</a> | 
        <a href={"/plans/1234"}>Claim B</a> | 
        <a href={"/plans/1234"}>Claim C</a> | 
        <a href={"/plans/1234"}>Claim D</a> | 
        <a href={"/plans/1234"}>Claim E</a> | 
      </CardBody>
  </Card>
</div>

<script>
    import { Badge, Card, CardBody, CardHeader } from "sveltestrap";
    export 
      let uid;
</script>

<style>
  .card-container {
    max-width: 18rem;
    display: inline-block;
  }
</style>