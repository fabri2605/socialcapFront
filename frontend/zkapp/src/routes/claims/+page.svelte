<div>
  {#if user && isFirstTimeUser(user)}
    <EmptyFirstTime {user}/>   
  {/if}

  {#if user && !isFirstTimeUser(user) && !user.hasCredentials}
    <EmptyCredentials {user} />
  {/if}

  <!-- <Filler n=40 filler="- . - . - . -" /> -->
</div>

<script>
  import { onMount } from "svelte";
  import Filler from "$lib/components/Filler.svelte";
  import EmptyFirstTime from "$lib/components/EmptyFirstTime.svelte";
  import EmptyCredentials from "$lib/components/EmptyCredentials.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
	
  let user = null;

  onMount(() => {
    user = getCurrentUser();
  })
</script>