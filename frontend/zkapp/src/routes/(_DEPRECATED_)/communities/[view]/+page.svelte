<div style="margin:auto;">
  <!-- <Sidenote>
    <hr/>
    <p>::: FIRST TIME USER - HAS NOT JOINED ANY COMMUNITY YET :::</p>
  </Sidenote> -->
  <Section>
    <!-- {#if user && isFirstTimeUser(user)}
      <EmptyFirstTime {user}/>   
    {/if} -->
  
    <!-- <Sidenote>
      <hr>
      <p>::: NOT FIRST TIME :::
      <br>Shows all communities the you have joined and all available communities in a grid or list:
      </p>
    </Sidenote> -->
    <div class="row align-items-center justify-content-between">
      <div class="col-12 col-md-6">
        <h1>{title[view]}</h1>
      </div>
      <div class="col-12 text-start col-md-6 text-md-end">
        <div class="fs-sm d-inline-block">
          <span class="d-inline-block">
            Show <InlineTab current={view} items={tabs} />
          </span>
          <span class="ms-2 d-inline-block">
            Sort by<select class="ms-1 py-1 px-2 rounded-1 border">
              <option>Newest</option>
              <option>Popular</option>
            </select>
          </span>
        </div>
      </div>
    </div>

    <div class="mt-2 pt-1 mx-auto">
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

  const title = {
    "all": "All communities",
    "joined": "Your communities"
  }

  const allTabs = [
    { value: "joined", text: title['joined'], href:"/communities/joined"},
    { value: "all", text: title['all'], href:"/communities/all"},
  ]

  const filterTabs = (view) => {
    return allTabs.filter((t) => {
      return (t.value !== view);
    });        
  }

  let user = getCurrentUser();

  $: view = data.view || "joined"; 
  
  $: tabs = filterTabs(view);

  onMount(() => {
    user = getCurrentUser();
  })
</script>