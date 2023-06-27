<div>
  <Sidenote>
    <hr>
    <p>::: FIRST TIME USER :::</p>
  </Sidenote>
  <Section>
  <!-- {#if user && isFirstTimeUser(user)}
    {/if} -->
    <EmptyFirstTime {user}/>   
  </Section>

  <Sidenote>
    <hr>
    <p>::: IS NOT FIRST TIME USER BUT HAS NOT CLAIMED ANY CREDENTIAL YET :::</p>
  </Sidenote>
  <Section>
    <!-- {#if user && !isFirstTimeUser(user) && !user.hasCredentials} -->
    <EmptyCredentials {user} />
  </Section>
  
  <Sidenote>
    <hr>
    <p>::: HAS CLAIMS OR CREDENTIALS :::
      <br>Shows all the obtained credentials OR all pending claims
    </p>
  </Sidenote>
  <Section>
    <div class="pb-3">
      Show <a href={'#'}>My credentials</a> | <a href={'#'}>Submited claims</a> 
      &nbsp; | &nbsp;
      Sort by <select>
        <option>Newest</option>
        <option>Due date</option>
      </select>
    </div>
    <div>
      <CredentialCard uid=1/>
      <CredentialCard uid=2/>
      <CredentialCard uid=3/>
    </div>
    <br/>
    <div>
      <ClaimCard uid=1/>
      <ClaimCard uid=2/>
      <ClaimCard uid=3/>
      <ClaimCard uid=4/>
      <ClaimCard uid=5/>
    </div>
  </Section>

  <Filler n=40/>
</div>

<script>
  import { onMount } from "svelte";
  import Filler from "$lib/components/Filler.svelte";
  import EmptyFirstTime from "$lib/components/EmptyFirstTime.svelte";
  import EmptyCredentials from "$lib/components/EmptyCredentials.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import Empty from "@components/Empty.svelte";
  import CredentialCard from "@components/CredentialCard.svelte";
  import ClaimCard from "@components/ClaimCard.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
	
  let user = getCurrentUser();

  onMount(() => {
    user = getCurrentUser();
  })
</script>