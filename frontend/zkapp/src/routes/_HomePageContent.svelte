<script>
  import { onMount } from 'svelte';
  import { isFirstTimeUser } from "@models/current-user";
  
  // Ui components
	import { Spinner, Icon, TabContent, TabPane, Button } from 'sveltestrap';
  import RootHeader from '@components/HubPageHeader.svelte'; 
  import HubPageContent from '@components/HubPageContent.svelte';
  import EmptyCredentials from '@components/EmptyCredentials.svelte';
  import EmptyFirstTime from '@components/EmptyFirstTime.svelte';
  import Sidenote from '@components/Sidenote.svelte';
  import CanClaimNow from '@components/CanClaimNow.svelte';
  import Section from '@components/Section.svelte';
  import HomeAdminsCard from '@components/home/HomeAdminsCard.svelte';
  import HomeCredentialsCard from '@components/home/HomeCredentialsCard.svelte';
  import HomeCommunitiesCard from '@components/home/HomeCommunitiesCard.svelte';
  import HomeValidatorsCard from '@components/home/HomeValidatorsCard.svelte';
  import CredentialCard from '@components/cards/CredentialCard.svelte';
  import ClaimCard from "@components/ClaimCard.svelte";
  import CommunityCard from '@components/CommunityCard.svelte';
  import TaskCard from '@components/cards/TaskCard.svelte';

  export let data, user; // this is the data for the lists
</script>

<RootHeader />

<HubPageContent>
    <Section class="section-fluid px-0">
      {#if user && isFirstTimeUser(user)}
        <div class="mb-4">
          <EmptyFirstTime {user}/>   
        </div>
      {/if}

      <div class="row p-0">
          <div class="col-12 col-md-6">
            <HomeCredentialsCard {data}/>
          </div>  
          <div class="col-12 mt-3 col-md-6 mt-md-0">
            <HomeCommunitiesCard {data}/>
          </div>  
        <!-- <div class="col-12 col-md-3 m-0 px-0">
          <div class="col-12 m-0 px-0">
            <HomeAdminsCard {data}/>
          </div>  
        </div> -->
      </div>
    </Section>

    <Section class="section-fluid mt-4 pt-4 bg-white rounded-2">
      <TabContent class="">
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TabPane class="pb-5" tabId="creds" tab="My credentials" active>
          {#each data.credentials as credential}
            <CredentialCard uid={credential.uid} data={credential}/>
          {/each}
          <br>
        </TabPane>
        <TabPane class="pb-5" tabId="claims" tab="My claims">
          {#each data.submited as submited}
            <ClaimCard data={submited}/>
          {/each}
        </TabPane>
        <TabPane class="pb-5" tabId="comns" tab="My communities" on:click={() => alert()}>
          {#each data.joined as org}
            <CommunityCard uid={org.uid} data={org} joined={true}/>
          {/each}
          <div class="p-4 m-0 px-4">
            <HomeAdminsCard />
          </div>
        </TabPane>

        {#if user && user.hasTasks}
        <TabPane class="pb-5" tabId="tasks" tab="My tasks">
          {#each data.assigned as task}
            <TaskCard uid={task.uid} data={task}/>
          {/each}
        </TabPane>
        {/if}
      </TabContent>      
    </Section>

</HubPageContent>
