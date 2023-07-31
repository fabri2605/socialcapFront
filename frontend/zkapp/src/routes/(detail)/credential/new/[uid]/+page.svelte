<DetailPageHeader items={[
  { href: '/', text: 'Home'},
  { href: '', text: `Claim your credential`}
]}/>

<DetailPageContent>
  <!-- <Sidenote>
    <hr/>
    <p>::: USER CAN CLAIM A CREDENTIAL OF SOME COMMUNITY WHERE HE/SHE IS A MEMBER :::</p>
    <p>This is a form where he will claim a new credential, and this form is controlled by the MasterPlan.</p>
    <p>We only arrive here if the user already is a member of at least one community.</p>
  </Sidenote> -->
  <Section class="section-md w-75">
    <div class="p-4 d-flex gap-4 align-items-center justify-content-between border-sc bg-white rounded-2 border border-gray border-1">
      <div>
        <!-- <img src={data?.plan.image} alt="Badge" height="180px" crossorigin/> -->
        <img src="/img/vars/BadgeGenerico.png" alt="Badge" height="180px" crossorigin/>
      </div>

      <div class="w-100 ps-2">
        <h3 class="text-black d-flex justify-content-between align-items-center">
          <span>{data.plan.name}</span>
          <span class="fs-5">
            <Badge color="success">ACTIVE</Badge>
          </span>
        </h3>

        <p class="fs-sm text-secondary lh-lg text-start">
          {@html data.plan.description}
          <br><b>{data.plan.community}</b>
        </p>

        <div class="d-flex justify-content-start">
          <p class="">
            <span class="fs-xs">Start Date</span>
            <br/><b class="fs-sm">{data.plan.startsUTC}</b>
          </p>
          <p class="px-4">
            <span class="fs-xs">Ends Date</span>
            <br/><b class="fs-sm">{data.plan.endsUTC}</b>
          </p>
        </div>
      </div>
    </div>
    
  </Section>

  <Section class="section-sm w-75 bg-white p-4 border-sc mt-4 mb-5 pb-4">
    <p class="py-2 hl-base w-75 m-auto">
      Please provide below the required evidence to sustain your claim. This 
      evidence will be deleted as soon as the claim has been approved, so no 
      personal or private data will be stored and kept.
    </p>
    <Form>
      <FormGroup class="mt-3">
        <Label for="alias" class="fs-4 text-secondary d-flex ps-1 mb-1">Name or alias</Label>
        <Input 
          bind:value={data.claim.alias} 
          type="input" name="alias" id="alias" 
          class="rounded-1 p-3 mb-1"/>
          <FormText color="muted ps-1 d-flex">
            Name or alias you would like to show in the final credential. 
          &nbsp;{@html required(true)}
        </FormText>
      </FormGroup>

      {#each data.plan.evidence as field, index}
        <FormGroup class="mt-4">
          <Label for="exampleText" class="fs-4 text-secondary d-flex ps-1 mb-1">
            {field.label}
          </Label>

          {#if field.type === "text"}
            <Input 
              bind:value={data.claim.evidence[index].value}
              type="text" name={field.sid} id={field.sid} 
              class="rounded-1 p-3 mb-1"/>
              {/if}

          {#if field.type === "note"}
            <Input 
              bind:value={data.claim.evidence[index].value}
              type="textarea" name={field.sid} id={field.sid} 
              class="rounded-1 p-2 mb-1"/>
          {/if}

          {#if field.type === "file"}
            <Input 
              bind:value={data.claim.evidence[index].value}
              type="file" name={field.sid} id={field.sid} 
              class="rounded-1 p-3 mb-1"/>
              {/if}

          <FormText color="muted ps-1 d-flex">
            {field.description}
            &nbsp;{@html required(field.required)}
          </FormText>
        </FormGroup>
      {/each}

      
    </Form>
   
  </Section>     
  
  <div class="position-fixed bottom-0 end-0 bg-white w-100 p-4">

    <div class="px-2 d-flex justify-content-end align-items-end">
      <SubmitButton on:click={() => saveDraft()}
        color="secondary" label="Save as draft"/>
        &nbsp;&nbsp;
        <SubmitButton on:click={() => saveDraft()}
          color="primary" label="Claim now" />
        </div>
      </div>

  <!-- <Filler n=40/> -->
</DetailPageContent>

<script>
  import { onMount } from "svelte";
  import { Breadcrumb, BreadcrumbItem, Icon, Badge, Form, FormGroup, FormText, Label, Input, Button } from 'sveltestrap';
  import Filler from "$lib/components/Filler.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import BackButton from "@components/BackButton.svelte";
  import SubmitButton from "@components/SubmitButton.svelte";
  import DetailPageContent from "@components/DetailPageContent.svelte";
  import DetailPageHeader from "@components/DetailPageHeader.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";

  export let data; // this is the data for this MasterPlan and empty Claim

  let 
    user = getCurrentUser(), 
    firstTime = false;

  onMount(() => {
    user = getCurrentUser();
    firstTime = false; //isFirstTimeUser(user); 
  })

  const required = (t) => 
    `<span class="text-warning fw-bold">${t ? `Required` : ``}</span>.`;

  async function saveDraft() {
    alert(JSON.stringify(data.claim, null, 4));
  }
</script>