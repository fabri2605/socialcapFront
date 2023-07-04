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
	import { Spinner, Icon } from 'sveltestrap';
  import RootHeader from '@components/RootHeader.svelte'; 
  import HubPageContent from '@components/HubPageContent.svelte';
  import EmptyCredentials from '@components/EmptyCredentials.svelte';
  import EmptyFirstTime from '@components/EmptyFirstTime.svelte';
  import { getCurrentUser, isFirstTimeUser } from "@models/current-user";
  import Sidenote from '@components/Sidenote.svelte';
  import CanClaimNow from '@components/CanClaimNow.svelte';
  import Section from '@components/Section.svelte';
  import HomeAdminsCard from '@components/HomeAdminsCard.svelte';
  import HomeCredentialsCard from '@components/HomeCredentialsCard.svelte';
  import HomeCommunitiesCard from '@components/HomeCommunitiesCard.svelte';
  import HomeValidatorsCard from '@components/HomeValidatorsCard.svelte';

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
    <Section class="section-xl px-5">
      {#if user && isFirstTimeUser(user)}
        <div class="mb-4">
          <EmptyFirstTime {user}/>   
        </div>
      {/if}

      <div class="row">
        <div class="col">
          <HomeCredentialsCard {data}/>
        </div>  
        <div class="col">
          <HomeCommunitiesCard {data}/>
        </div>  
      </div>
      <div class="row pt-4">
        <div class="col">
          <HomeValidatorsCard {data}/>
        </div>  
        <div class="col">
          <HomeAdminsCard {data}/>
        </div>  
      </div>
    </Section>

</HubPageContent>
