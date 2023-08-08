<div>
  <!-- <Sidenote>
    <hr>
    <p>::: FIRST TIME USER :::</p>
  </Sidenote> -->
  <Section>
  {#if user && isFirstTimeUser(user)}
    <EmptyFirstTime {user}/>   
  {/if}

  <!-- <Sidenote>
    <hr>
    <p>::: IS NOT FIRST TIME USER BUT HAS NOT CLAIMED ANY CREDENTIAL YET :::</p>
  </Sidenote> -->
  <!-- <Section class="section-lg">
    {#if user && !isFirstTimeUser(user) && !user.hasCredentials} -->
      <!-- <EmptyCredentials {user} />
    {/if}
  </Section>
  
  <!-- <Sidenote>
    <hr>
    <p>::: HAS CLAIMS OR CREDENTIALS :::
      <br>Shows all the obtained credentials OR all pending claims
    </p>
  </Sidenote> -->
  {#if user && !isFirstTimeUser(user)}
    <div class="row align-items-center justify-content-between">
      <div class="col-12 col-md-6">
        <h1>{title[view]}</h1>
      </div>
     
      <div class="col-12 text-start col-md-6 text-md-end">
        <div class="fs-sm lh-lg">
          <span class="d-inline-block">
            Show <InlineTab current={view} items={tabs}/>
          </span>
          <span class="ms-2 d-inline-block">
            Sort by<select class="ms-1 py-1 px-2 rounded-1 border">
              <option>Newest</option>
              <option>Due date</option>
            </select>
          </span>
        </div>
      </div>
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
  {/if}
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
  import CredentialCard from "@components/cards/CredentialCard.svelte";
  import ClaimCard from "@components/ClaimCard.svelte";
  import CanClaimNow from "@components/CanClaimNow.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";

  export let data; // this is the data for the lists

  const title = {
    "issued": "Your credentials",
    "canclaim": "Claim a credential",
    "submited": "Your claims"
  };

  const allTabs = [
    { value: "issued", text: title['issued'], href:"/credentials/issued" },
    { value: "canclaim", text: title['canclaim'], href:"/credentials/canclaim" },
    { value: "submited", text: title['submited'], href:"/credentials/submited" },
  ];

  const filterTabs = (view) => {
    return allTabs.filter((t) => {
      return (t.value !== view);
    });        
  };

  const url = $page.url;

  let user = getCurrentUser();

  $: view = data.view || "issued"; // url.searchParams.get('view') || "issued";
  
  $: tabs = filterTabs(view);

  onMount(() => {
    user = getCurrentUser();
  })
</script>