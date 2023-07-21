<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { setApiClient } from "$lib/globals";
  import { CoreAPIClient } from "@apis/core-api-client";
  import { getCurrentSession } from "@models/current-session";
  import { getCurrentUser } from "@models/current-user";
  
  import HomePageContent from './_HomePageContent.svelte';

  export let data; // this is the data for the lists

  let currentPage = $page.url.pathname;

  $: isAuthenticated = data.isAuthenticated;
  $: user = data.user;
  
  onMount(async () => {
    console.log("+page.svelte onMount")

    if (isAuthenticated && user) 
      goto(currentPage)
    else
      goto("/login");

    setTimeout(async () => {
      console.log("Loading Snarky ...");
      // await loadSnarky();
      // let [ok, publicKey, accountExists] = await getWalletAccount();
    }, 500)
  })
</script>

<HomePageContent {data} {user} />
