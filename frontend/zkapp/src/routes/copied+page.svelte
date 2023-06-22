<script>
  // MINA original imports
  import heroMinaLogo from '$lib/assets/HeroMinaLogo.svg'
  import arrowRightSmall from '$lib/assets/arrow-right-small.svg'
  import GradientBG from './GradientBG.svelte'
  import { isReady, Mina, PublicKey } from 'snarkyjs'

  // Hexui
  import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { getItem } from '$lib/utility/localStorageController';
	// import { inlineSvg } from '$lib/components/utilities/utilities';
  
  // mixin imports ...
	import { Spinner, Icon } from 'sveltestrap';
  import { Container } from 'sveltestrap';
  import { Styles } from 'sveltestrap';
  import Header from '$lib/components/Header.svelte';
  import Filler from '$lib/components/Filler.svelte';
  import EmptyCredentials from '$lib/components/EmptyCredentials.svelte';
  import EmptyFirstTime from '$lib/components/EmptyFirstTime.svelte';
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";

  // Hexui
  let 
    isAuthenticated = getItem('access_token'),
    user = null;

  onMount(async () => {
    if (isAuthenticated) user = getCurrentUser();

    /*
    // Update this to use the address (public key) for your zkApp account.
    // To try it out, you can try this address for an example "Add" smart contract that we've deployed to
    // Berkeley Testnet B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA .
    const zkAppAddress = 'B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA';

    // This should be removed once the zkAppAddress is updated.
    if (!zkAppAddress) {
      console.error(
        'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA',
      )
    }
    
    // load Snarkyjs
    console.log('getWorkerClient Loading SnarkyJS...');
    await isReady;

    // we will be using Berkeley 
    console.log('getWorkerClient use Berkeley');
    const Berkeley = Mina.Network(
      'https://proxy.berkeley.minaexplorer.com/graphql'
    );
    Mina.setActiveInstance(Berkeley);    
    console.log('getWorkerClient done');

    // load and compile the contract
    console.log('getWorkerClient loading zkApp contract');
    const CONTRACT_PATH = '../../../contracts/build/src';
    const { Add } = await import(CONTRACT_PATH);
    // const { Add } = await import('../../../contracts/build/src/')

    console.log('getWorkerClient compiling zkApp contract');
    await Add.compile();
    console.log('getWorkerClient zkApp compiled');

    // init the instance
    const zkappPublicKeyBase58 = 'B62qohp4zipB5jHp2r8tZyCX1j65H37aQjn4vh9uyHskn3jfnSxbeRu';
    const zkappPublicKey = PublicKey.fromBase58(zkappPublicKeyBase58);
    console.log('initZkapp zkappPublickKey=', zkappPublicKeyBase58);

    // this is the Smart contract app
    const zkApp = new Add(PublicKey.fromBase58(zkAppAddress))

    // get the zkappAccount   
    console.log('initZkapp fetch zkApp account ...');
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    let result = await fetchAccount({ publicKey });    
    console.log(`initZkapp fetchAccount(${zkappPublicKeyBase58}) result=`, result);
    console.log('initZkapp done'); 
   
    // Hexui
		// if (isAuthenticated) {
		// 	goto(`/home-one`);
		// } else {
		// 	goto(`/signin`);
		// }
  })

  // Hexui
	afterUpdate(() => {
		// inlineSvg();
	});  
</script>

<!--
  MINA original not used here
  <style global>
    @import '../styles/Home.module.css';
  </style>
-->

<!-- Use bootstrap styling 
  <Styles />
-->
<!-- 
<style lang="scss">
  /* Hexui */
	.preloader-wrap {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
 -->

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

<!-- MINA original
<GradientBG>
  <main class="main">
    <div class="center">
      <a
        href="https://minaprotocol.com/"
        target="_blank"
        rel="noopener noreferrer">
        <img
          class="logo"
          src={heroMinaLogo}
          alt="Mina Logo"
          width="191"
          height="174"
          priority />
      </a>
      <p class="tagline">
        built with
        <code class="code">SnarkyJS</code>
      </p>
    </div>
    <p class="start">
      Get started by editing
      <code class="code">src/routes/+page.svelte</code>
    </p>
    <div class="grid">
      <a
        href="https://docs.minaprotocol.com/zkapps"
        class="card"
        target="_blank"
        rel="noopener noreferrer">
        <h2>
          <span>DOCS</span>
          <div>
            <img
              src={arrowRightSmall}
              alt="Mina Logo"
              width={16}
              height={16}
              priority />
          </div>
        </h2>
        <p>Explore zkApps, how to build one, and in-depth references</p>
      </a>
      <a
        href="https://docs.minaprotocol.com/zkapps/tutorials/hello-world"
        class="card"
        target="_blank"
        rel="noopener noreferrer">
        <h2>
          <span>TUTORIALS</span>
          <div>
            <img
              src={arrowRightSmall}
              alt="Mina Logo"
              width={16}
              height={16}
              priority />
          </div>
        </h2>
        <p>Learn with step-by-step SnarkyJS tutorials</p>
      </a>
      <a
        href="https://discord.gg/minaprotocol"
        class="card"
        target="_blank"
        rel="noopener noreferrer">
        <h2>
          <span>QUESTIONS</span>
          <div>
            <img
              src={arrowRightSmall}
              alt="Mina Logo"
              width={16}
              height={16}
              priority />
          </div>
        </h2>
        <p>Ask questions on our Discord server</p>
      </a>
      <a
        href="https://docs.minaprotocol.com/zkapps/how-to-deploy-a-zkapp"
        class="card"
        target="_blank"
        rel="noopener noreferrer">
        <h2>
          <span>DEPLOY</span>
          <div>
            <img
              src={arrowRightSmall}
              alt="Mina Logo"
              width={16}
              height={16}
              priority />
          </div>
        </h2>
        <p>Deploy a zkApp to Berkeley Testnet</p>
      </a>
    </div>
  </main>
</GradientBG>
-->
