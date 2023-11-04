<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { isFirstTimeUser } from "@models/current-user";
  // import { VotingContract } from "@socialcap/contracts";
  import { ALL_STATES } from "@models/states";

  // Ui components
	import { Spinner, Icon, TabContent, TabPane, Button } from 'sveltestrap';
  import RootHeader from '@components/HubPageHeader.svelte'; 
  import HubPageContent from '@components/HubPageContent.svelte';
  import Section from '@components/Section.svelte';
  import HomeCredentialsCard from '@components/home/HomeCredentialsCard.svelte';
  import HomeCommunitiesCard from '@components/home/HomeCommunitiesCard.svelte';
  //import EmptyFirstTime from '@components/EmptyFirstTime.svelte';
  import HomeAdminsCard from '@components/home/HomeAdminsCard.svelte';
  import CredentialCard from '@components/cards/CredentialCard.svelte';
  import ClaimCard from "@components/cards/ClaimCard.svelte";
  import CommunityCard from '@components/cards/CommunityCard.svelte';
  import TaskCard from '@components/cards/TaskCard.svelte';
  import EmptyItemsCard from "@components/cards/EmptyItemsCard.svelte";

  export let data; // this is the data for the lists

  let currentPage = $page.url.pathname;

  $: isAuthenticated = data.isAuthenticated;
  $: user = data.user;
  
  onMount(async () => {
    console.log("+page.svelte onMount")
    console.log(ALL_STATES);
    
    if (isAuthenticated && user) 
      goto(currentPage)
    else
      goto("/login");

    // setTimeout(async () => {
    //   //console.log("Loading Snarky ...");
    //   // await loadSnarky();
    //   // let [ok, publicKey, accountExists] = await getWalletAccount();
    // }, 100)
  })
</script>

<RootHeader />

<HubPageContent>
    <Section class="section-fluid px-0">
      <!-- {#if user && isFirstTimeUser(user)}
        <div class="mb-4">
          <EmptyFirstTime {user}/>   
        </div>
      {/if} -->

      <div class="row p-0">
          <div class="col-12 col-md-6">
            <HomeCredentialsCard {data}/>
          </div>  
          <div class="col-12 mt-3 col-md-6 mt-md-0">
            <HomeCommunitiesCard {data}/>
          </div>  
      </div>
    </Section>

    <Section class="m-0 p-0 section-fluid mt-4 pt-4 bg-light">
        <TabContent >
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TabPane tabId="creds" tab="My credentials" active>
            {#if !data?.credentials?.length}
              <EmptyItemsCard notice="You have not claimed any credentials" />
            {/if}
            {#each data.credentials as credential}
              <CredentialCard uid={credential.uid} data={credential}/>
            {/each}
            <br>
          </TabPane>

          <TabPane tabId="claims" tab="My claims">
            {#if !data?.claimed?.length}
              <EmptyItemsCard notice="You have no pending claims" />
            {/if}
            {#each data.claimed as claimed}
              <ClaimCard data={claimed}/>
            {/each}
          </TabPane>

          <TabPane tabId="comns" tab="My communities" on:click={() => alert()}>
            {#each data.joined as org}
              <CommunityCard uid={org.uid} data={org} joined={true} user={data.user}/>
            {/each}
            <div class="p-4 m-0 px-4">
              <HomeAdminsCard />
            </div>
          </TabPane>
          
          {#if user && user.hasTasks}
          <TabPane tabId="tasks" tab="My tasks">
            {#if !data?.assigned?.length}
              <EmptyItemsCard notice="You have no pending tasks" />
            {/if}
            {#each data.assigned as task}
              <TaskCard uid={task.uid} data={task}/>
            {/each}
          </TabPane>
          {/if}

        </TabContent>      
    </Section>
</HubPageContent>
