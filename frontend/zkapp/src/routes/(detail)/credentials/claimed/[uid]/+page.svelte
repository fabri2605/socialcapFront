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

  <Section class="mw-lg px-4 pt-4 pb-5">
    <div class="header">

      <h3 class="text-black d-flex justify-content-between align-items-center">
        <span>{data.type}</span>
        <span class="fs-6">
          <Badge color="warning">{data.state}</Badge>
        </span>
      </h3>
      <p class="fs-sm text-secondary lh-base">
        <b class="d-inline-block --py-2">{data.community}</b>
        <br>
        {@html data.description}
      </p>
    </div>

    <div class="d-flex justify-content-start">
      <p class="">
        <span class="fs-xs">Submited</span>
        <br/><b class="fs-sm">{data.createdUTC}</b>
      </p>
      <p class="px-4">
        <span class="fs-xs">Ends</span>
        <br/><b class="fs-sm">{data.dueUTC || "---"}</b>
      </p>
      <p class="px-4">
        <span class="fs-xs">Approved</span>
        <br/><b class="fs-sm">{data.votedUTC || "---"}</b>
      </p>
      <p class="px-4">
        <span class="fs-xs">Issued</span>
        <br/><b class="fs-sm">{data.issuedUTC || "---"}</b>
      </p>
    </div>

    <h6 class="mt-1 text-secondary">Votes</h6>
    <div class="d-flex justify-content-between fs-sm">
      <p><Badge color="secondary rounded-5 ms-1 py-1 px-2 fs-6">{data.requiredVotes}</Badge> required</p>
      <p><Badge color="success rounded-5 py-1 px-2 fs-6">{data.positiveVotes}</Badge> positive</p>
      <p><Badge color="danger rounded-5 py-1 px-2 fs-6">{data.negativeVotes}</Badge> negative</p>
      <p><Badge color="warning rounded-5 py-1 px-2 fs-6">{data.ignoredVotes}</Badge> abstained</p>
    </div>

    <h6 class="mt-3 text-secondary">Your provided evidence</h6>
    {#each data.evidence as field}
      <div class="d-flex justify-content-start align-items-start border-top pt-3 pb-0">
        <p class="ps-0 py-0 fw-bold fs-sm w-25 text-start">{field.label}</p>
        <p class="px-2 py-0 fs-6 w-75 text-start">{field.value}</p>
      </div>
    {/each}
    <div class="border-top"></div>
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