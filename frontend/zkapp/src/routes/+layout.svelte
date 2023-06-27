<script>
  import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getItem } from '$lib/utility/localStorageController';
	import { page } from '$app/stores';
  
  // local imports ...
	import { Spinner, Icon } from 'sveltestrap';
  import { Container } from 'sveltestrap';
  import { Styles } from 'sveltestrap';
  import Header from '$lib/components/Header.svelte';
  import Filler from '$lib/components/Filler.svelte';

  // Hexui
  let isAuthenticated = getItem('access_token');
	let currentPage = $page.url.pathname;

  onMount(async () => {
		if (isAuthenticated && isAuthenticated !== '') {
  			goto(currentPage);
  		} else {
  			goto(`/signin`);
  		}   
  });
</script>

<!-- MUST include here Bootstrap styling 
-->
<Styles />

<!--
  MINA original not used here
-->
<style global>
  @import '/css/mina-globals.css';
  @import '/css/bootstrap.css';
</style>

<svelte:head>
  <title>Socialcap</title>
</svelte:head>

<!-- Hexui -->
<div style="position:fixed;top:0;left:0;bottom:0;right:0;">
  <Header />
  <div style="position:fixed;top:60px;left:0;bottom:0;right:0;border:0px dotted red;overflow:auto;">
    <Container class="mt-5">
      <slot></slot>
    </Container>
  </div>
</div>
