<div>
  <!-- <Sidenote>
    <hr>
    <p>::: FIRST TIME USER :::</p>
  </Sidenote> -->
  <Section>
    {#if user && isFirstTimeUser(user)}
      <EmptyFirstTime {user}/>   
    {/if}
  </Section>

  <!-- <Sidenote>
    <hr>
    <p>::: IS NOT FIRST TIME USER BUT HAS NOT CLAIMED ANY CREDENTIAL YET :::</p>
  </Sidenote> -->
  <Section>
    {#if user && !isFirstTimeUser(user) && !user.hasCredentials}
      <!-- <EmptyCredentials {user} /> -->
    {/if}
  </Section>
  
  <!-- <Sidenote>
    <hr>
    <p>::: HAS CLAIMS OR CREDENTIALS :::
      <br>Shows all the obtained credentials OR all pending claims
    </p>
  </Sidenote> -->
  <Section class="section-xl">
    <div class="ps-2 pb-4 d-flex align-items-center justify-content-start">
      <!-- <p class="mt-2 pe-2"><a href="/">Home</a></p>
      <p class="mt-2 pe-2">/</p>
      <p class="mt-2 pe-2">Credentials</p>
      <p class="mt-2 pe-2">/</p> -->
      {#if view === "issued"}
        <h4>My owned credentials ...</h4>
      {/if}
      {#if view === "canclaim"}
        <h4>You can claim this ones now ...</h4>
      {/if}
      {#if view === "submited"}
        <h4>Submited claims in review</h4>
      {/if}
    </div>

    <div class="ps-2 fs-sm --text-bg-light">
      Show <InlineTab current={view} items={[
        { value: "issued", text: "My credentials", href:"/credentials/issued" },
        { value: "canclaim", text: "Can claim", href:"/credentials/canclaim" },
        { value: "submited", text: "Submited", href:"/credentials/submited" },
      ]}/>
      &nbsp;|&nbsp;
      Sort by <select class="ms-2 py-1 px-2 rounded-1 border">
        <option>Newest</option>
        <option>Due date</option>
      </select>
    </div>

    <div class="mt-2 pt-1">
      {#if view === "issued"}
        <div class="mt-3">
          {#if user && !isFirstTimeUser(user) && !user.hasCredentials}
            <EmptyCredentials {user} />
          {:else}
            {#each data.credentials as credential}
              <CredentialCard uid={credential.uid} data={credential}/>
            {/each}
          {/if}
        </div>
      {/if}

      {#if view === "canclaim"}
        <div class="mt-3">
          {#each data.claimables as claimable}
            <CanClaimNow uid={claimable.uid} data={claimable}/>
          {/each}
        </div>
      {/if}

      {#if view === "submited"}
        <div class="mt-3">
          {#each data.submited as submited}
            <ClaimCard data={submited}/>
          {/each}
        </div>
      {/if}
    </div>
  </Section>

  <br><br>
  <!-- <Filler n=40/> -->
</div>

<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores"
  import Filler from "$lib/components/Filler.svelte";
  import EmptyFirstTime from "$lib/components/EmptyFirstTime.svelte";
  import EmptyCredentials from "$lib/components/EmptyCredentials.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import Empty from "@components/Empty.svelte";
  import InlineTab from "@components/InlineTab.svelte";
  import CredentialCard from "@components/CredentialCard.svelte";
  import ClaimCard from "@components/ClaimCard.svelte";
  import CanClaimNow from "@components/CanClaimNow.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";

  export let data; // this is the data for the lists

  const url = $page.url;
  let user = getCurrentUser();

  $: view = data.view || "issued"; // url.searchParams.get('view') || "issued";
  
  onMount(() => {
    user = getCurrentUser();
  })
</script>