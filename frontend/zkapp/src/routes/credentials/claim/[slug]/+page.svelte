<div style="margin:auto;">
  <!-- <Sidenote>
    <hr/>
    <p>::: USER CAN CLAIM A CREDENTIAL OF SOME COMMUNITY WHERE HE/SHE IS A MEMBER :::</p>
    <p>This is a form where he will claim a new credential, and this form is controlled by the MasterPlan.</p>
    <p>We only arrive here if the user already is a member of at least one community.</p>
  </Sidenote> -->
  <Section form>
    <h3 class="text-black d-flex justify-content-between align-items-center">
      <span>{data.plan.name}</span>
      <span class="fs-xs">
        <Badge color="success">ACTIVE</Badge>
      </span>
    </h3>
    <p class="fs-sm text-secondary lh-base">{@html data.plan.description}</p>
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

    <Form>
      <FormGroup class="mt-4">
        <Label for="alias" class="fw-bold fs-6 text-secondary ps-1 mb-1">Name or alias</Label>
        <Input 
          bind:value={data.claim.alias} 
          type="input" name="alias" id="alias" 
          class="rounded-1 p-2 mb-1"/>
        <FormText color="muted ps-1">
          Name or alias you would like to show in the final credential. 
          &nbsp;{@html required(true)}
        </FormText>
      </FormGroup>

      {#each data.plan.evidence as field, index}
        <FormGroup class="mt-4">
          <Label for="exampleText" class="fw-bold fs-6 text-secondary ps-1 mb-1">
            {field.label}
          </Label>

          {#if field.type === "text"}
            <Input 
              bind:value={data.claim.evidence[index].value}
              type="text" name={field.sid} id={field.sid} 
              class="rounded-1 p-2 mb-1"/>
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
              class="rounded-1 px-2 mb-1"/>
          {/if}

          <FormText color="muted ps-1">
            {field.description}
            &nbsp;{@html required(field.required)}
          </FormText>
        </FormGroup>
      {/each}

      <div class="mt-5 mb-5 px-2 d-flex justify-content-between align-items-center">
        <BackButton size="fs-1" label="Cancel" color="danger"/>
        <div>
          <SubmitButton on:click={() => saveDraft()}
            color="secondary" label="Save draft ..."/>
          &nbsp;
          <SubmitButton on:click={() => saveDraft()}
            color="primary" label="Claim now !" />
        </div>
      </div>
    </Form>
  </Section>

  <!-- <Filler n=40/> -->
</div>

<script>
  import { onMount } from "svelte";
  import { Icon, Badge, Form, FormGroup, FormText, Label, Input, Button } from 'sveltestrap';
  import Filler from "$lib/components/Filler.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import BackButton from "@components/BackButton.svelte";
  import SubmitButton from "@components/SubmitButton.svelte";
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