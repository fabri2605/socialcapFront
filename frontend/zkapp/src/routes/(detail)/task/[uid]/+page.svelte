

<DetailPageHeader items={[
    { href: "/", text: 'Home'},
    { href: "/", text: 'Submit your vote'},
  ]} />

<DetailPageContent>
  <Section class="section-md">

    <div class="p-4 d-flex justify-content-start border-sc border border-1 border-gray rounded-4 bg-white">
      <!-- <img src={data.image} alt="Badge" width="22.5%" crossorigin/> -->
      <div class="w-25">

        <img src="/img/vars/BadgeGenerico.png" alt="Badge" width="100%" crossorigin/>
      </div>

      <div class="ps-4 w-100">
        <div class="header">
          <h3 class="text-black d-flex justify-content-between align-items-center">
            <span>{data.type}</span>
            <span class="fs-3">
              <Badge color="warning">{data.state}</Badge>
            </span>
          </h3>
          <div class="text-start">

            <p class="fs-sm text-secondary lh-lg">
              {@html data.description}
              <br>
              <b class="">{data.community}</b>
            </p>
            <p class="fs-6">
              Claimed by <b class="d-inline-block py-1 border border-2 border-black px-2 rounded-2 fs-6">{data.alias}</b>
            </p>
          </div>
        </div>
  
        <div class="d-flex justify-content-start w-100">
          <p class="pe-2">
            <span class="fs-xs">Started</span>
            <br/><b class="fs-sm">{data.assignedUTC}</b>
          </p>
          <p class="pe-4">
            <span class="fs-xs">Ends</span>
            <br/><b class="fs-sm">{data.dueUTC}</b>
          </p>
          <p class="pe-4">
            <span class="fs-xs">Voting ...</span>
            <br/><b class="fs-sm">{data.currentVotes}/{data.requiredVotes}</b>
          </p>
        </div>
      </div>
    </div>

    
  </Section>

  <Section class="section-sm m-auto  text-center rounded-4 mt-4">
    <Form>
      <div class="flex justify-content-center rounded-4">
        <FormGroup class="p-4 text-center">
          <Label for="alias"class="fs-1 text-black ps-1 mb-4">Your vote</Label>


          <FormGroup>
            
            <div class=" d-flex justify-content-center gap-3">

              <div class="vote-container">
              
                <input type="radio" class="btn-check" name="vote" id="positive" autocomplete="off">

                  <label class="btn bg-white p-5 d-flex flex-column text-primary" for="positive">
                    <Icon name="plus-circle-fill" class='fs-1' /> <span>Positive</span>
                  </label>
                  
              
              </div>

              <div class="vote-container">

              <input type="radio" class="btn-check" name="vote" id="negative" autocomplete="off">
              <label class="btn bg-white p-5 d-flex flex-column text-primary" for="negative">
                <Icon name="dash-circle-fill" class='fs-1' /> Negative
              </label>
              </div>
              
              <input type="radio" class="btn-check" name="vote" id="abstain" autocomplete="off">
              <label class="btn bg-white p-5 d-flex flex-column text-primary" for="abstain">
                <Icon name="slash-circle-fill" class='fs-1' /> Abstain
              </label>




            <!-- <Input
              class="radio-button"
              id="r1"
              type="radio"
              bind:group={radioGroup}
              value="positive"
              label="Positive"
            />
            <div class="ratio-btn">
              <label for="Negative" class="radio-btn-label">Negative</label>

            </div> -->
            </div>



            
          </FormGroup>

          <!-- <Input 
            bind:value={vote} 
            type="select" name="vote" id="vote" 
            class="rounded-2 p-3 mb-1 w-100">
            <option value="Y">Positive</option>
            <option value="N">Negative</option>
            <option value="A">Abstain</option>
           <option value="ND">Will not do</option>
          </Input>           --> 

          <FormText color="ps-1 text-white">
            Please submit your vote before ({data.dueUTC}).
          </FormText>
        </FormGroup>
        <!-- {#if vote}
          <SubmitButton 
            on:click={() => submitVote()}
            color="primary" label="Submit it !" />
        {/if} -->
      </div>

      {#if vote==="N" || vote==="A" || vote==="ND"}
      <div class="d-flex justify-content-center bg-black rounded-4">
        
        <FormGroup class="mt-3 d-flex flex-column justify-content-center p-4">
          <Label for="alias" class="fs-1 text-white ps-1 mb-1">Why?</Label>
          <Input 
          bind:value={data.reason} 
          type="select" name="vote" id="vote" 
          class="rounded-2 p-3 mb-1 w-100">
          <option value="N1">Does not match requirements</option>
          <option value="N2">Not enough evidence</option>
          <option value="A1">Conflict of interests</option>
          <option value="A2">Can not evaluate</option>
          <option value="A2">Not my area</option>
          <option value="A4">Not enough time</option>
          <option value="A5">Not enough rewards</option>
          <option value="A6">Other</option>
        </Input>          
        <FormText color="muted ps-1">
          Please select the reason why you are voting in this way.
        </FormText>
      </FormGroup>
    </div>
      {/if}
    </Form>
  </Section>

  <Section class="section-sm mb-4 pb-4">
      <div class="mt-4 mb-4 pt-2 hl-base">
        <h2>

          Here you can find the evidence provided by the claimer. 
        </h2>
        <p>

          This evidence will be deleted as soon as the claim has been approved.
        </p>
      </div>
      {#each data.evidence as field}
        <div class="d-flex justify-content-center align-items-center border-bottom m-auto pt-3 pb-0 w-50 text-center">
          <p class="ps-0 py-0 fw-bold fs-sm w-25 text-start">{field.label}</p>
          <p class="px-2 py-0 fs-6 w-75 text-start">{field.value}</p>
        </div>
      {/each}

      <div class="position-fixed bottom-0 end-0 bg-white w-100 p-4">

      <div class=" d-flex justify-content-end align-items-end">
          <!-- <SubmitButton 
            on:click={() => saveDraft()}
            color="secondary" label="Save draft ..."/>
          &nbsp;&nbsp; -->

          

          {#if vote}
       
         <SubmitButton             
            on:click={() => submitVote()}
            color="primary" label="Submit your vote" />
            {:else}
            <SubmitButton             
            on:click={() => submitVote()}
            class="bg-black" label="Submit your vote" />
            {/if}
      </div>
    </div>
  </Section>        

  <!-- <Filler n=40/> -->
</DetailPageContent>

<script>
  import { onMount } from "svelte";
  import { Breadcrumb, BreadcrumbItem, Icon, Badge, Form, FormGroup, FormText, Label, Input, Button } from 'sveltestrap';
  import DetailPageHeader from "@components/DetailPageHeader.svelte";
  import DetailPageContent from "@components/DetailPageContent.svelte";
  import Filler from "@components/Filler.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import CloseButton from "@components/CloseButton.svelte";
  import SubmitButton from "@components/SubmitButton.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";

  export let data; // this is the data for this MasterPlan and empty Claim

  let user = getCurrentUser();
  let vote = null;

  onMount(() => {
    user = getCurrentUser();
  })

  async function submitVote() {
    let confirmed = window.confirm("are you sure ? Once submited it can not be changed !");
    if (confirmed) 
      alert(JSON.stringify({vote: vote}, null, 4));
  }
  let radioGroup;

</script>




