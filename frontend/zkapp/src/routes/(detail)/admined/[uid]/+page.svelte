<DetailPageHeader items={[
  { href: '/', text: 'Home'},
  { href: '', text: "Admin: "+data.name}
]}/>

<DetailPageContent>
  <Section class="section-lg pb-4">
    <div class="d-flex justify-content-start align-items-center">
      <img width="22.5%" style="max-width:160px;" class="img-thumbnail rounded-circle me-2" src={data.image} crossorigin/>
      <div class="w-100 ms-4">
        <span class="text-secondary">ADMINISTERING  THIS COMMUNITY ...</span>
        <h2 class="text-black m-0 p-0 w-100 d-flex align-items-center justify-content-between">
          {data.name}
          <span class="fs-5">
            <Badge size="sm">
              {data.state}
            </Badge>
          </span>
        </h2>
        <p class="fs-sm mt-1">
          <b>{data.countMembers}</b> members
          | <span class="fs-4"> 🎉 </span>
          &nbsp; <b>{data.countCredentials}</b> credentials issued !
        </p>

        <p class="">{@html data.description}</p>    

        <div class="d-flex justify-content-start">
          <p class="">
            <span class="fs-xs">Start Date</span>
            <br/><b class="fs-sm">{data.createdUTC}</b>
          </p>
          <p class="px-4">
            <span class="fs-xs">Approved Date</span>
            <br/><b class="fs-sm">{data.approvedUTC}</b>
          </p>
          <p class="px-0">
            <span class="fs-xs">Updated</span>
            <br/><b class="fs-sm">{data.updatedUTC}</b>
          </p>
        </div>
      </div>
    </div>
    <hr/>
  </Section>
  
  <Section class="section-lg">
    <TabContent>
      <span style="width:1rem;">&nbsp;</span>
      <TabPane tabId="name" tab="General">
        <FormGroup>
          <Label>Name</Label>
          <Input type="text" bind:value={data.name} />
        </FormGroup>
        <FormGroup>
          <Label>Brief description</Label>
          <Input type="textarea" bind:value={data.description} />
        </FormGroup>
      </TabPane>

      <TabPane tabId="plans" tab="Master Plans" active>
        {#each data.plans as plan}
          <MasterPlanItem plan={plan} />
        {/each}
        <MasterPlanAddButton 
          community={data}  
          bind:plans={data.plans} />
      </TabPane>

      <TabPane tabId="admins" tab="Admins">
        Admins
      </TabPane>

      <TabPane tabId="validators" tab="Validators">
        {#each data.validators as p}
          <MemberItem p={p} />
        {/each}
      </TabPane>

      <TabPane tabId="auditors" tab="Auditors">
      </TabPane>
    </TabContent>

    <!-- <p class="mt-4">
      <b>Claim your credential</b>
    </p>
    <div>
        {#each data.plans as plan}
          <CanClaimNow uid={plan.uid} data={plan}/>
        {/each}
    </div> -->
    <div class="text-center mt-4 mb-5">
      <Button color="primary" class="rounded-5 px-3">
        Update data !
      </Button>
    </div>
  </Section>

</DetailPageContent>

<script>
  import { onMount } from "svelte";
  import { Button, Badge } from "sveltestrap";
  import { TabContent, TabPane } from 'sveltestrap';  
  import { FormGroup, Label, Input } from "sveltestrap";
  // import { Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';
  import Filler from "@components/Filler.svelte";
  import CanClaimNow from "@components/CanClaimNow.svelte";
  import Section from "@components/Section.svelte";
  import DetailPageContent from "@components/DetailPageContent.svelte";
  import DetailPageHeader from "@components/DetailPageHeader.svelte";
  import MemberItem from "@components/MemberItem.svelte";
  import MasterPlanItem from "@components/MasterPlanItem.svelte";
  import MasterPlanAddButton from "@components/MasterPlanAddButton.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";

  export let data;

  let user = getCurrentUser();
  let openDlg = false;

  let stateColors = {
    "APPLIED": "warning",
    "APPROVED": "success",
    "DENIED": "danger"
  }

  onMount(() => {
    user = getCurrentUser();
  })

  const toggle = () => {
    openDlg = !openDlg;
  };

  function changeValidatorState(p) {
    //alert("clicked p "+p.uid)
    toggle();
  }
</script>