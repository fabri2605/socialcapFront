<script>
  // MINA original imports
  import { isReady, Mina, PublicKey } from 'snarkyjs'
  
  // Ui components
  import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
  import { 
    loadSnarky, 
    berkeleyMinaStore, 
    deployedZkAppStore, 
	  getWalletAccount,
	  updateAdd
  } from '$lib/zkapp/helpers';
	import { getItem } from '$lib/utility/localStorageController';
	import { Spinner, Icon, TabContent, TabPane, Button,
  Form,
  Input,
  FormGroup,
  Label,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    NavbarBrand
  
  } from 'sveltestrap';
  import RootHeader from '@components/RootHeader.svelte'; 
  import HubPageContent from '@components/HubPageContent.svelte';
  import EmptyCredentials from '@components/EmptyCredentials.svelte';
  import EmptyFirstTime from '@components/EmptyFirstTime.svelte';
  import { getCurrentUser, isFirstTimeUser } from "@models/current-user";
  import Sidenote from '@components/Sidenote.svelte';
  import CanClaimNow from '@components/CanClaimNow.svelte';
  import Section from '@components/Section.svelte';
  import HomeAdminsCard from '@components/home/HomeAdminsCard.svelte';
  import HomeCredentialsCard from '@components/home/HomeCredentialsCard.svelte';
  import HomeCommunitiesCard from '@components/home/HomeCommunitiesCard.svelte';
  import HomeValidatorsCard from '@components/home/HomeValidatorsCard.svelte';
  import CredentialCard from '@components/CredentialCard.svelte';
  import ClaimCard from "@components/ClaimCard.svelte";
  import CommunityCard from '@components/CommunityCard.svelte';
  import TaskCard from '@components/TaskCard.svelte';

  export let data; // this is the data for the lists

  let 
    isAuthenticated = getItem('access_token'),
    user = null;

  onMount(async () => {
    if (isAuthenticated) user = getCurrentUser();
    user = getCurrentUser();
    // await loadSnarky();

    // let [ok, publicKey, accountExists] = await getWalletAccount();

    // const res = await updateAdd();
  })
</script>

<RootHeader />

<HubPageContent>
  <!-- <div class="text-center">
    <h1>
      <Spinner color="danger" size="lg" type="grow"/>
      Welcome to the zkApp <Icon name="globe2" /> !
      <br/>
    </h1>
  </div> -->

  <!-- <div>
    {#if user && isFirstTimeUser(user)}
      <EmptyFirstTime {user}/>   
    {:else}
      {#if user && !user.hasCredentials}
        <EmptyCredentials {user} />
        <div id="claimables">
          <Section class="section-fluid mt-5">
            <div class="mx-auto text-center">
              <p class="pt-4 pb-4 fs-6">
                <b>You can claim this credentials from your communities</b>
              </p>
              <div class="mt-2">
                {#each data.claimables as plan}
                  <CanClaimNow uid={plan.uid} data={plan}/>
                {/each}
              </div>
            </div>
          </Section>
        </div>
      {/if}
    {/if} -->

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





    <Section class="m-0 p-0 section-fluid mt-4 pt-4 bg-light">
        <TabContent>
           
          <TabPane tabId="creds" tab="My credentials" active >
            {#each data.credentials as credential}
            <CredentialCard uid={credential.uid} data={credential}/>
            {/each}
            <br>
          </TabPane>
          <TabPane tabId="claims" tab="My claims">
            {#each data.submited as submited}
            <ClaimCard data={submited}/>
            {/each}
          </TabPane>
          <TabPane tabId="comns" tab="My communities" on:click={() => alert()}>
            {#each data.joined as org}
            <CommunityCard uid={org.uid} data={org} joined={true}/>
            {/each}
            <div class="p-4 m-0 px-4">
              <HomeAdminsCard />
            </div>
          </TabPane>
          
          {#if user && user.hasTasks}
          <TabPane tabId="tasks" tab="My tasks">
            {#each data.assigned as task}
            <TaskCard uid={task.uid} data={task}/>
            {/each}
          </TabPane>
          {/if}
        </TabContent>      
      
    </Section>


      
    </HubPageContent>
