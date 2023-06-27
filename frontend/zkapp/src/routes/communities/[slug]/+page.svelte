<div style="background-color: #FaFaFa;">
  <Section>
    <h4 class="d-flex justify-content-between align-items-center">
      <span>{data.fullName}</span>
      <img height="42px" src="/img/vars/LongHash-Ventures-White-Logo-Transparent.png" />
    </h4>
    <p><b>{data.count}</b> members</p>
    <p>{@html data.description}</p>    

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
    <p class="fs-sm">
      <a href={'#'}>Become a validator</a> for this community
    </p>
    <p class="fs-sm mt-1">
      Do you <a href={'/admins/123'}>administer this</a> ? 
    </p>

    <p class="mt-5">
      Claim your credential !
    </p>
    <div>
        {#each data.plans as plan}
          <CanClaimNow uid={plan.uid} data={plan}/>
        {/each}
    </div>
  </Section>

  <Filler n=40/>
</div>

<script>
  import { onMount } from "svelte";
  import { Button } from "sveltestrap";
  import Filler from "$lib/components/Filler.svelte";
  import CanClaimNow from "@components/CanClaimNow.svelte";
  import Section from "@components/Section.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
	
  export let data;

  let user = getCurrentUser();

  onMount(() => {
    user = getCurrentUser();
  })
</script>