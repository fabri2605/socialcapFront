<script>
  // MINA original imports
  import { isReady, Mina, PublicKey } from 'snarkyjs'
  
  // Ui components
  import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { getItem } from '$lib/utility/localStorageController';
	import { Spinner, Icon } from 'sveltestrap';
  import EmptyCredentials from '$lib/components/EmptyCredentials.svelte';
  import EmptyFirstTime from '$lib/components/EmptyFirstTime.svelte';
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";

  import { 
    loadSnarky, 
    berkeleyMinaStore, 
    deployedZkAppStore, 
	  getWalletAccount,
	  updateAdd
  } from '$lib/zkapp/helpers';

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
</div>
