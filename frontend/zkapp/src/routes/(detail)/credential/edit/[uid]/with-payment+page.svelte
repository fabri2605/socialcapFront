<DetailPageHeader items={[
  { href: '/', text: 'Home'},
  { href: '', text: `Claim your credential`}
]}/>

<DetailPageContent>
  <!-- <Sidenote>
    <hr/>
    <p>::: USER CAN CLAIM A CREDENTIAL OF SOME COMMUNITY WHERE HE/SHE IS A MEMBER :::</p>
    <p>This is a form where he will claim a new credential, and this form is controlled by the MasterPlan.</p>
    <p>We only arrive here if the user already is a member of at least one community.</p>
  </Sidenote> -->
  <Section class="section-md border-2 rounded-2 p-4 shadow">
    <div class="d-flex align-items-center justify-content-between pt-4">
      <div class="w-25 me-4 pe-2 rounded-2">
        <img 
          src={data?.plan.image} crossorigin 
          alt="Badge" 
          width="22.5%" 
          style="min-width:120px;min-height:120px;max-width:120px;" 
          class="img-thumbnail rounded-4 me-2 mt-2" 
          />
      </div>

      <div class="w-100 ps-2">
        <h3 class="text-black d-flex justify-content-between align-items-center">
          <span>{data.plan.name}</span>
          <span class="fs-5">
            <StateBadge state={data.claim.state} />
          </span>
        </h3>

        <p class="fs-sm text-secondary lh-lg text-start">
          {@html data.plan.description}
          <br><b>{data.community.name}</b>
        </p>

        <div class="d-flex justify-content-start">
          <p class="">
            <span class="fs-xs">Start Date</span>
            <br/><b class="fs-sm">{prettyDate(data.plan.startsUTC)}</b>
          </p>
          <p class="px-4">
            <span class="fs-xs">Ends Date</span>
            <br/><b class="fs-sm">{prettyDate(data.plan.endsUTC)}</b>
          </p>
          <p class="px-5">
            <span class="fs-xs">Credential Fee</span>
            <br/><b class="fs-sm">{data.plan.fee} MINA</b>
          </p>
        </div>
      </div>
    </div>
  </Section>
  
  <Section class="section-md px-5 text-start">
    <EvidenceForm 
      evidenceForm={data.plan.evidence}
      bind:data={data.claim.evidenceData}
    />
    <div class="mt-5 mb-5 px-2 d-flex justify-content-center align-items-center">
      <SubmitButton 
        on:click={() => saveDraft()}
        color="secondary" 
        label={loading ? "Saving" : "Save draft ..."}
        disabled={loading}
        />
      &nbsp;&nbsp;
      <SubmitButton 
        on:click={() => saveDraftAndSubmit()}
        color="primary" 
        label={loading ? "Submitting ..." : "Claim now !"}
        />
    </div>
  </Section>        

  <!-- <Filler n=40/> -->
</DetailPageContent>


<script>
  import { onMount, tick } from "svelte";
  import { get } from "svelte/store";
  import BackButton from "@components/buttons/BackButton.svelte";
  import SubmitButton from "@components/buttons/SubmitButton.svelte";
  import DetailPageContent from "@components/DetailPageContent.svelte";
  import DetailPageHeader from "@components/DetailPageHeader.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
  import StateBadge from "@components/badges/StateBadge.svelte";
  import { prettyDate } from "@utilities/datetime";
  import { AppStatus } from "@utilities/app-status";
  import { addClaim, updateClaim, updateProfile, submitClaim } from "@apis/mutations";
  import { DRAFT, CANCELED, CLAIMED } from "@models/states";
  import EvidenceForm from "./EvidenceForm.svelte";
  import { isAllValid } from "./validations";
	
  export let data; // this is the data for this MasterPlan and empty Claim

  let user = getCurrentUser(), firstTime = false;

  let open = false;
  const toggle = () => (open = !open);
  
  let openNoWalletDlg = false;
  const toggleNoWalletDlg = () => (openNoWalletDlg = !openNoWalletDlg);

  let paymentMessage = "", paymentStatus = 0, canPayNow = false;
  let pendingTxn;

  onMount(() => {
    user = getCurrentUser();
    firstTime = false; //isFirstTimeUser(user); 
  })

  let loading = false;

  /** Data validation **/

  const required = (t) => 
    `<span class="text-warning fw-bold">${t ? `Required` : ``}</span>.`;

  function dataIsOk(data) {
    return isAllValid(
      data.plan.evidence, 
      data.claim.evidenceData
    )
  }

  /**
   * Updates the Claim before doing any other action, such as 
   * paying and then submiting the claim.
   */
  async function updateTheDraft() {
    if (!dataIsOk(data)) {
      AppStatus.error("Please fill all required fields !")
      return false;
    }

    let updated;
    if (data.isNew) {
      updated = await addClaim(data.claim);
    }
    else {
      updated = await updateClaim(data.claim);
    }

    return updated;
  }

  /**
   * This just saves the claim draft to the server and goes
   * bak to the previous page.
   */
  async function saveDraft() {
    loading = true;
    let updated = await updateTheDraft();
    loading = false;
    if (updated) 
      history.back();
  }

  /**
   * First saves the draft and then asks for payment before submiting 
   * the claim to the API and starting the MINA transaction.
   * The Payer is the logged user who needs to pay for the Credential, and
   * is transfered to the Socialcap (main) account.
   * The new Claim deployment is payed by the SocialcapFeePayer account.
   */
  async function saveDraftAndSubmit() {
    let updated = await updateTheDraft();
    if (! updated)
      return ; // saving the draft failed, we can not continue ...

    // await ready for payment
    canPayNow = await isReadyForPayment();

    // save draft again with the accountId == sender public key
    let sender = get(auroWallet$)?.sender?.toBase58();
    await updateProfileAccountId(sender);
  }

  async function isReadyForPayment() {
    paymentStatus = 0;
    toggle(); // open dialog

    let isSnarkyLoaded = get(deployedSocialcap$) ;
    if (!isSnarkyLoaded) {
      isSnarkyLoaded = await loadSocialcapContract();
    }

    let hasWallet = false;
    if (isSnarkyLoaded) {
      hasWallet = await connectWallet();
    }

    if (!hasWallet) {
      toggleNoWalletDlg();
    }

    return (hasWallet && isSnarkyLoaded) ;
  }

  async function payNow() {
    paymentMessage = "Starting payment transaction ..."; await tick();
    paymentStatus = 1; // started

    let result = await payForCredentialClaim(data.plan.fee);

    if (!result.success) {
      paymentMessage= "Payment was not done: "+result.error; await tick();
      return;
    }
    pendingTxn = result.pendingTxn;
    paymentStatus = 2; // sent ;
    await tick();

    // we can now submit the Claim and start the voting process
    // the server will wait till the transaction si finished
  }

  async function updateProfileAccountId(sender) {
    if (! sender) return;
    let user = await getCurrentUser();
    await updateProfile({ uid: user.uid, accountId: sender });
  }

  async function submitClaimNow() {
    let params = data.claim;
    params.extras = {
      transaction: JSON.stringify(pendingTxn)
    };
    let updated = await submitClaim(params);
    if (updated) 
      history.back();
  }
</script>