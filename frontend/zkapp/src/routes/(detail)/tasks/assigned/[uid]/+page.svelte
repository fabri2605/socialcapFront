<DetailPageHeader items={[
    { href: "/", text: 'Home'},
    { href: "/tasks", text: 'Tasks'},
    { href: "/", text: 'Submit your vote'},
  ]} />

<DetailPageContent>
  <!-- <Sidenote>
    <hr/>
    <p>::: USER CAN CLAIM A CREDENTIAL OF SOME COMMUNITY WHERE HE/SHE IS A MEMBER :::</p>
    <p>This is a form where he will claim a new credential, and this form is controlled by the MasterPlan.</p>
    <p>We only arrive here if the user already is a member of at least one community.</p>
  </Sidenote> -->
  <Section class="mw-lg">
    <div class="d-flex align-items-center justify-content-between">
      <div class="w-25 me-4" style="--margin-left:-25px;">
        <img src={data.image} alt="Badge" height="180px" crossorigin/>
      </div>

      <div class="w-75">
        <h3 class="text-black d-flex justify-content-between align-items-center">
          <span>{data.type}</span>
          <span class="fs-6">
            <Badge color="success">{data.state}</Badge>
          </span>
        </h3>
        <p class="fs-sm text-secondary lh-base mt-3">{@html data.description}</p>
        <p class="fs-6">
          Claimed by <b class="d-inline-block text-bg-dark py-1 px-2 rounded-2 fs-6">{data.alias}</b>
        </p>
        <div class="d-flex justify-content-start">
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

  <Section class="mw-md">
    <Form>
      <div class="d-flex align-items-center justify-content-between">
        <FormGroup class="mt-3 me-2 w-75">
          <Label for="alias" class="fw-bold fs-6 text-secondary ps-1 mb-1">Your vote</Label>
          <Input 
            bind:value={vote} 
            type="select" name="vote" id="vote" 
            class="rounded-1 p-2 mb-1">
            <option value="Y">Positive</option>
            <option value="N">Negative</option>
            <option value="A">Abstain</option>
            <option value="ND">Will not do</option>
          </Input>          
          <FormText color="muted ps-1">
            Please submit your vote before ({data.dueUTC}).
          </FormText>
        </FormGroup>
        {#if vote}
          <SubmitButton 
            on:click={() => submitVote()}
            color="primary" label="Submit it !" />
        {/if}
      </div>

      {#if vote==="N" || vote==="A" || vote==="ND"}
      <FormGroup class="mt-3">
        <Label for="alias" class="fw-bold fs-6 text-secondary ps-1 mb-1">Why ?</Label>
        <Input 
          bind:value={data.reason} 
          type="select" name="vote" id="vote" 
          class="rounded-1 p-2 mb-1">
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
      {/if}
    </Form>
  </Section>

  <Section class="mw-md">
      <p class="mt-4 mb-2 pt-2 hl-base">
        <b>Here you can find the evidence provided by the claimer</b>. This 
        evidence will be deleted as soon as the claim has been approved.
      </p>
      {#each data.evidence as field}
        <div class="d-flex justify-content-start align-items-start border-top mt-0 pt-3 pb-0">
          <p class="ps-0 py-0 fw-bold fs-sm w-25 text-start">{field.label}</p>
          <p class="px-2 py-0 fs-6 w-75 text-start">{field.value}</p>
        </div>
      {/each}

      <div class="mt-5 mb-5 px-2 d-flex justify-content-center align-items-center">
          <!-- <SubmitButton 
            on:click={() => saveDraft()}
            color="secondary" label="Save draft ..."/>
          &nbsp;&nbsp; -->
          <SubmitButton             
            on:click={() => submitVote()}
            color="primary" label="Submit your vote !" />
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
</script>