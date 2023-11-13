<div>
  <Modal isOpen={open} {toggle} backdrop="static">
    <ModalHeader {toggle}>
      You need to sign your votes 
    </ModalHeader>

    {#if (tasks || []).length === 0}
      <ModalBody>
          <div class="p-3 fs-lg d-flex align-items-center">
            <p>
              There are no votes to send
            </p>
          </div>
      </ModalBody>
    {/if}

    {#if (tasks || []).length > 0}
      <ModalBody>
        {#if !(tasks || []).length}
          <div class="p-3 fs-lg d-flex align-items-center">
            <p>
              There are no votes to send
            </p>
          </div>
        {/if}

        {#if status === READY}
          {#if !$auroWallet$?.connected}
            <p class="p-1">Connecting the wallet ...</p>
          {/if}

          {#if $auroWallet$?.connected && $auroWallet$?.publicKey}
            <div class="p-3 lh-lg">
              <p>AuroWallet is connected !</p>
              <p>
                Account: <b>{$auroWallet$?.publicKey.slice(0,6)}...{$auroWallet$?.publicKey.slice(-6)}</b>
              </p>
              <p class="fs-lg">
                Are you ready to send your votes ?
              </p>
            </div>
          {/if}
        {/if}

        {#if status === SENDING}
          <div class="p-3 fs-md d-flex align-items-center">
            <p class="fs-lg">
              <Spinner color="black" type="border" class="m-3" />
            </p>
            <p>
              Sending the votes ...
            </p>
          </div>
        {/if}

        {#if status === FAILED}
          <div class="p-3 fs-lg d-flex align-items-center">
            <p class="fs-lg">
              <Icon name="exclamation-diamond-fill" class="text-danger me-4"/>
            </p>
            <p>
              We could not submmit the votes. Please retry again latter 
            </p>
          </div>
        {/if}

        {#if status === SENT}
          <p class="p-3 fs-lg word-break text-wrap d-flex align-items-center">
            <Icon name="check-circle" class="text-success me-4"/>
            <b>Sent all votes ! </b>
          </p>
        {/if}
      </ModalBody>
    {/if}

    <ModalFooter class="text-center">
      {#if status === READY && (tasks || []).length > 0}
        <Button color="primary" on:click={sendThemNow}>Send them now !</Button>
      {/if}
      {#if status !== SENT}
        <Button color="secondary" on:click={exitVoting}>Cancel</Button>
      {/if}
      {#if status === SENT}
        <Button color="primary" on:click={exitVoting}>Done !</Button>
      {/if}
    </ModalFooter>
  </Modal>
</div>

<div>
  <Modal isOpen={openNoWalletDlg} toggle={toggleNoWalletDlg}>
    <ModalHeader toggle={toggleNoWalletDlg}>
      Auro wallet is not installed
    </ModalHeader>
    <ModalBody>
      Please install the Auro wallet for signing your votes.
    </ModalBody>
    <ModalFooter class="text-center">
      <Button color="secondary" on:click={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
</div>


<script>
  import { onMount, tick } from "svelte";
  import { get } from "svelte/store";
  import { Button, Icon, Spinner } from 'sveltestrap';
  import { Modal, ModalBody,ModalFooter,ModalHeader } from 'sveltestrap';
  import { getCurrentUser } from "$lib/models/current-user";
  import { MINAExplorer, auroWallet$, deployedVoting$, deployedBatchVoting$ } from "$lib/contracts/stores";
  //import { connectWallet } from "$lib/contracts/wallet";
  //import { loadPlanVotingContract } from "$lib/contracts/batch-voting/loaders";
  import { submitTasksBatch } from "@apis/mutations";

  export let 
    open, // this opens/closes teh Modal Dialog
    tasks; // this is the data for the Tasks to submit

  let user ;
  let statusMessage = "", status = 0;
  let pendingTxn;

  const READY = 0, SENDING = 2, FAILED = 5, SENT = 3;

  // let open = false;
  const toggle = () => (open = !open);
  
  let openNoWalletDlg = false;
  const toggleNoWalletDlg = () => (openNoWalletDlg = !openNoWalletDlg);


  onMount(async () => {
    user = await getCurrentUser();
    // voterAccountId = user.profile.accountId;
    // console.log("MOUNTED SubmitVotesDlg")
    // await ready for payment
    // canPayNow = await isReadyForPayment();
  })

  async function sendThemNow() {
    statusMessage = "Starting signing ..."; await tick();
    status = READY;

    let wallet = get(auroWallet$);

    let signedData = await wallet.api.signMessage({ 
      message: JSON.stringify(tasks) 
    });
    console.log("signedData", 
      signedData.publicKey, 
      signedData.signature.field, 
      signedData.signature.scalar);
    
    // we can now submit the Votes and continue the voting process
    status = SENDING; // sending ...
    await tick();

    let result = await submitTasksBatch({
      senderAccountId: signedData.publicKey,
      signedData: signedData
    });

    if (result.error) {
      status = FAILED;
      await tick();
      return;
    }

    status = SENT; // sent ;
    await tick();
  }
  
  function exitVoting() {
    toggle(); // close dialog
    status = READY; // get ready for next ...
    setTimeout(() => window.location.reload());
  }
</script>




