<div style="margin:auto;">
  <!-- <Sidenote>
    <hr/>
    <p>::: FIRST TIME USER - HAS NOT JOINED ANY COMMUNITY YET :::</p>
  </Sidenote> -->
  <Section>
    {#if user && isFirstTimeUser(user)}
      <EmptyFirstTime {user}/>   
    {/if}
  </Section>
  
  <!-- <Sidenote>
    <hr>
    <p>::: NOT FIRST TIME :::
    <br>Shows all communities the you have joined and all available communities in a grid or list:
    </p>
  </Sidenote> -->
  <Section class="section-xl">
    <div class="ps-2 pb-4 d-flex align-items-center justify-content-start">
      <!-- <p class="mt-2 pe-2"><a href="/">Home</a></p>
      <p class="mt-2 pe-2">/</p>
      <p class="mt-2 pe-2">Credentials</p>
      <p class="mt-2 pe-2">/</p> -->
      {#if view === "joined"}
        <h4>Your communities</h4>
      {/if}
      {#if view === "all"}
        <h4>All registered communities</h4>
      {/if}
    </div>

    <div class="ps-2 fs-sm --text-bg-light">
      Show <InlineTab current={view} items={[
        { value: "joined", text: "Your communities", href:"/communities/joined"},
        { value: "all", text: "All", href:"/communities/all"},
      ]}/>
      &nbsp;|&nbsp;
      Sort by <select class="ms-2 py-1 px-2 rounded-1 border">
        <option>Newest</option>
        <option>Popular</option>
      </select>
    </div>

    <div class="mt-2 pt-1">
      {#if view === "joined"}
        <div class="mt-3">
          {#if user && isFirstTimeUser(user)}
            <EmptyFirstTime {user}/>   
          {:else}
            {#each data.joined as org}
              <CommunityCard uid={org.uid} data={org} joined={true}/>
            {/each}
          {/if}
        </div>
      {/if}

      {#if view === "all"}
        <div class="mt-3">
          {#each data.all as org}
            <CommunityCard uid={org.uid} data={org}/>
          {/each}
        </div>
      {/if}
    </div>
  </Section>
</div>

<script>
  import { onMount } from "svelte";
  import Filler from "$lib/components/Filler.svelte";
  import InlineTab from "@components/InlineTab.svelte";
  import EmptyFirstTime from "$lib/components/EmptyFirstTime.svelte";
  import EmptyCredentials from "$lib/components/EmptyCredentials.svelte";
  import CommunityCard from "@components/CommunityCard.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
	
  export let data; // this is the data for the lists

  let user = getCurrentUser();

  $: view = data.view || "joined"; 
  
  onMount(() => {
    user = getCurrentUser();
  })
</script>