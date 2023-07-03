<DetailPageHeader items={[
  { href: '/', text: 'Home'},
  { href: '/credentials', text: 'Credentials'},
  { href: '', text: `Claimed #${data.uid}`}
]}/>

<DetailPageContent>
  <!-- <Sidenote>
    <hr/>
    <p>::: DETAIL INFO OF A RUNNING CLAIM :::</p>
    <p>This is the detail view of an existing running Claim. Once submited it can not be modified !</p>
    <p>We only arrive here if the user has made a Claim as member of some community.</p>
  </Sidenote> -->

  <Section class="mw-lg">
    <div class="header">

      <h3 class="text-black d-flex justify-content-between align-items-center">
        <span>{data.name}</span>
        <span class="fs-sm">
          <Badge color="warning">VOTING</Badge>
        </span>
      </h3>
      <p class="fs-sm text-secondary lh-base">{@html data.description}</p>
    </div>

    <div class="d-flex justify-content-start">
      <p class="">
        <span class="fs-xs">Submited Date</span>
        <br/><b class="fs-sm">{data.createdUTC}</b>
      </p>
      <p class="px-4">
        <span class="fs-xs">Approved Date</span>
        <br/><b class="fs-sm">{data.votedUTC || "---"}</b>
      </p>
      <p class="px-4">
        <span class="fs-xs">Issued Date</span>
        <br/><b class="fs-sm">{data.issuedUTC || "---"}</b>
      </p>
      <p class="px-4">
        <span class="fs-xs">Due Date</span>
        <br/><b class="fs-sm">{data.dueUTC || "---"}</b>
      </p>
    </div>
  </Section>

  <Section class="mw-lg">
    <h6 class="mt-1">Votes</h6>
    <div class="d-flex justify-content-between">
      <p>Required: {data.totalVotes}</p>
      <p>Positive: {data.positiveVotes}</p>
      <p>Negative: {data.negativeVotes}</p>
      <p>Ignored: {data.ignoredVotes}</p>
    </div>
  </Section>

  <Section class="mw-lg">
    <h6 class="mt-3">Your provided evidence</h6>
    {#each data.evidence as field}
      <div class="d-flex justify-content-start align-items-start border-top pt-3 pb-0">
        <p class="ps-0 py-0 fw-bold fs-sm w-25 text-start">{field.label}</p>
        <p class="px-2 py-0 fs-6 w-75 text-start">{field.value}</p>
      </div>
    {/each}
    <div class="border-top"></div>
  </Section>

  <Section class="mw-lg">
    <p class="ps-2"><BackButton size="fs-1"/></p>  
  </Section>

  <!-- <Filler n=40/> -->
</DetailPageContent>

<script>
  import { onMount } from "svelte";
  import { Icon, Badge, Form, FormGroup, FormText, Label, Input, Button } from 'sveltestrap';
  import Filler from "@components/Filler.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import BackButton from "@components/BackButton.svelte";
  import { getCurrentUser } from "@models/current-user";
  import DetailPageContent from "@components/DetailPageContent.svelte";
  import DetailPageHeader from "@components/DetailPageHeader.svelte";

  export let data; // this is the data for this MasterPlan and empty Claim

  let 
    user = getCurrentUser();

  onMount(() => {
    user = getCurrentUser()
  })
</script>