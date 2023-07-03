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

  export let data; // this is the data for the lists

  let 
    isAuthenticated = getItem('access_token'),
    user = null;

  onMount(async () => {
    if (isAuthenticated) user = getCurrentUser();

    await loadSnarky();

    // let [ok, publicKey, accountExists] = await getWalletAccount();

    // const res = await updateAdd();
  })
</script>

<RootHeader />

<HubPageContent>
  <div class="text-center">
    <h1>
      <Spinner color="danger" size="lg" type="grow"/>
      Welcome to the zkApp <Icon name="globe2" /> !
      <br/>
    </h1>
  </div>

  <div>
    {#if user && isFirstTimeUser(user)}
      <EmptyFirstTime {user}/>   
    {:else}
      {#if user && !user.hasCredentials}
        <EmptyCredentials {user} />
      {/if}
    {/if}

    <!-- <Sidenote>
      <hr>
      ::: Here we can show all available credentials he/she can claim from the communities he belongs:::
    </Sidenote> -->
    <p class="mt-4">
      <!-- <b>Claim your credential !</b> -->
    </p>
    <div>
        {#each data.claimables as plan}
          <CanClaimNow uid={plan.uid} data={plan}/>
        {/each}
    </div>

  </div>
</HubPageContent>
