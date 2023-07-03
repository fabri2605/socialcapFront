<DetailPageHeader items={[
  { href: '/', text: 'Home'},
  { href: '/communities', text: 'Communities'},
  { href: '', text: 'The community'}
]}/>

<DetailPageContent>
  <Section class="mw-lg">
    <div class="d-flex justify-content-between align-items-center p-0 m-0">
      <div>
        <h2 class="text-black">{data.fullName}</h2>
        <p class="fs-sm mt-2">
          <b>{data.count}</b> members
          | <span class="fs-4"> 🎉 </span>
          &nbsp; <b>300</b> credentials issued !
        </p>
      </div>
      <p class="bg-body-secondary p-3">
        <img height="42px" src="/img/vars/zk_dao_logo.svg" />
      </p>
    </div>
    <p class="w-50">{@html data.description}</p>    

    <div class="d-flex justify-content-start">
      <p class="">
        <span class="fs-xs">Start Date</span>
        <br/><b class="fs-sm">26 Dec 2019</b>
      </p>
      <p class="px-4">
        <span class="fs-xs">Approved Date</span>
        <br/><b class="fs-sm">26 Dec 2022</b>
      </p>
      <p class="px-0">
        <span class="fs-xs">Updated</span>
        <br/><b class="fs-sm">Today</b>
      </p>
    </div>

    <p class="mt-4">
      <b>Claim your credential !</b>
    </p>
    <div>
        {#each data.plans as plan}
          <CanClaimNow uid={plan.uid} data={plan}/>
        {/each}
    </div>

    <div class="mt-3">
      <p class="fs-sm">
        <a href={'#'}>Become a validator</a> for this community
      </p>
      <p class="fs-sm mt-1">
        Do you <a href={'/admins/123'}>administer this</a> ? 
      </p>
    </div>
  </Section>

  <Filler n=40/>
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