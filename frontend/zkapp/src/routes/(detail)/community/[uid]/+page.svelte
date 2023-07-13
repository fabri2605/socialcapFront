<DetailPageHeader items={[
  { href: '/', text: 'Home'},
  { href: '', text: data.name}
]}/>

<DetailPageContent>
  <Section class="section-xl pb-4">
    <div class="d-flex justify-content-start align-items-center">
      <img width="80px" class="img-thumbnail rounded-circle me-2" src={data.image} crossorigin/>
      <div>
        <h3 class="text-black m-0 p-0">{data.name}</h3>
        <p class="fs-sm mt-1">
          <b>{data.countMembers}</b> members
          | <span class="fs-4"> 🎉 </span>
          &nbsp; <b>{data.countCredentials}</b> credentials issued !
        </p>
      </div>
    </div>

    <p class="">{@html data.description}</p>    
    
    <div class="d-flex justify-content-start">
      <p class="">
        <span class="fs-xs">Start Date</span>
        <br/><b class="fs-sm">{data.createdUTC}</b>
      </p>
      <p class="px-4">
        <span class="fs-xs">Approved Date</span>
        <br/><b class="fs-sm">{data.approvedUTC}/b>
      </p>
      <p class="px-0">
        <span class="fs-xs">Updated</span>
        <br/><b class="fs-sm">{data.updatedUTC}</b>
      </p>
    </div>

    <p class="mt-4">
      <b>Claim your credential</b>
    </p>
    <div>
        {#each data.claimables as plan}
          <CanClaimNow uid={plan.uid} data={plan}/>
        {/each}
    </div>

    <div class="mt-3">
      <p class="fs-sm">
        <a href={'#'}>Become a validator</a> for this community
      </p>
      <p class="fs-sm mt-1">
        Do you <a href={`/admined/${data.uid}`}>administer this</a> ? 
      </p>
    </div>
  </Section>

</DetailPageContent>

<script>
  import { onMount } from "svelte";
  import { Button } from "sveltestrap";
  import Filler from "$lib/components/Filler.svelte";
  import CanClaimNow from "@components/CanClaimNow.svelte";
  import Section from "@components/Section.svelte";
  import DetailPageContent from "@components/DetailPageContent.svelte";
  import DetailPageHeader from "@components/DetailPageHeader.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
	
  export let data;

  let user = getCurrentUser();

  onMount(() => {
    user = getCurrentUser();
  })
</script>