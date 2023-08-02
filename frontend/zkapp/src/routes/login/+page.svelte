<HubPageContent>
  <Section class="section-sm">
    <h1>Socialcap</h1>

    {#if status === 1}
    <Form>
      <p>
        Please enter your email and we will send you a code to start a new session.
      </p>
      <FormGroup class="mt-3">
        <Label for="email" class="fw-bold fs-6 text-secondary ps-1 mb-1">Your email</Label>
        <Input 
          bind:value={data.email} 
          type="input" name="email" id="email" 
          class="rounded-1 p-2 mb-1"/>
      </FormGroup>

      <div class="mt-1 mb-5 px-2 d-flex justify-content-start align-items-start">
          <SubmitButton on:click={() => getOTP()}
            color="primary" label="Send me the code !" />
      </div>
    </Form>
    {/if}

    {#if status === 3}
    <Form>
      <p>
        Please input the OTP code we sent you
      </p>
      <FormGroup class="mt-3">
        <Label for="otp" class="fw-bold fs-6 text-secondary ps-1 mb-1">Th OTP code</Label>
        <Input 
          bind:value={data.otp} 
          type="input" name="email" id="email" 
          class="rounded-1 p-2 mb-1"/>
      </FormGroup>

      <div class="mt-1 mb-5 px-2 d-flex justify-content-start align-items-start">
          <SubmitButton on:click={() => loginNow()}
            color="primary" label="Login now !" />
      </div>
    </Form>
    {/if}

    {#if status === 4}
      <p>
        Congrats ! You are in ... going to Home page
      </p>
    {/if}
  </Section>        

  <!-- <Filler n=40/> -->
</HubPageContent>

<script>
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  import { Form, FormGroup, Input, Label } from "sveltestrap";
  import Section from "@components/Section.svelte";
  import BackButton from "@components/BackButton.svelte";
  import SubmitButton from "@components/SubmitButton.svelte";
  import HubPageContent from '@components/HubPageContent.svelte';
  import { getCurrentSession, setActiveSession } from "$lib/models/current-session";
  import { requestOTP, login } from "@apis/mutations";

  export let data; // this is the data for this MasterPlan and empty Claim

  let session ;
  let status = 1; // 1: request OTP, 2: OTP sent, 3: input OTP 

  onMount(async () => {
    session = await getCurrentSession();
  })

  const required = (t) => 
    `<span class="text-warning fw-bold">${t ? `Required` : ``}</span>.`;

  async function getOTP() {
    let rsp = await requestOTP({ 
      email: data.email 
    });
    if (rsp.error) {
      message = "Problem sending OTP request, please try again ..."
      return;
    }
    // success
    session = rsp;
    data.otp = "";
    status = 3; // input OTP now
  } 

  async function loginNow() {
    let rsp = await login({ 
      session_key: session.session_key, 
      otp: data.otp 
    });
    if (rsp.error) {
      message = "The OTP code seems invalid, please try again ..."
      return;
    }
    // success
    session = rsp;
    status = 4; // Ok login

    // save state in currentSession
    setActiveSession({
      host: data.host,
      port: data.port,
      protocol: data.protocol,
      authorization: session.authorization
    });

    // goto home
    setTimeout(() => { goto('/'); }, 500)
  } 
</script>
