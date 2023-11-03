<div class="w-100">
  <Card class="border border-1 border-sc mb-4 rounded-2 d-flex">
    <CardBody class="w-100">
     <div class="d-flex justify-content-between pt-0 gap-4 ">
        <img src={data.image} width="92px" crossorigin alt="Credential logo" />
        <div class="w-100 d-flex justify-content-between align-items-center">
          <div>

            <p class="fs-sm text-secondary lh-base mt-2 mb-0">
              <b>{data.community}</b>
            </p>
            <h5 class="mt-0">{data.type}
              <span class="fs-2 ms-2">
                <Badge pill color={ data.state === 'COMPLETED' ? "success" : "danger" }>
                  { data.state }
                </Badge>
              </span>
            </h5>
            <p class="fs-sm text-secondary lh-base mt-2 mb-0">
              {data.description}
            </p>
          </div>
            {#if data.state==='PENDING'}
            
              <div class="d-flex justify-content-start m-0 p-0 gap-4">
                
                <div>
                  <p class="fs-xs m-0">Assigned</p>
                  <b class="fs-sm">{data.assignedUTC}</b>
                </div>
                 
                <div>

                  <p class="fs-xs m-0">Due</p>
                  <b class="fs-sm">{data.dueUTC || "---"}</b>
                </div>
               
                <div>
                  <p class="fs-xs m-0">Voting</p>
                  <b class="fs-sm">{data.currentVotes} / {data.requiredVotes}</b>
                </div>
                

              </div>


                <Button color="primary" size="sm" class="rounded-2 px-4 py-2">
                  <a href={`/task/${uid}`} class="text-white text-decoration-none">
                    Vote
                  </a>
                </Button>

              
              
            {/if}   
              
        </div>
      </div>
    </CardBody>
  </Card>

</div>

<script>
    import { Badge, Button, Card, CardBody, CardHeader } from "sveltestrap";
    export let uid, data;
</script>
