<section 
  class='bg-image z-n1 position-absolute opacity-50'  style="background-image: url('/img/svg/socialcap-bg-signin.svg');
  height: 100vh; width: 100vw; backgroundRepeat: no-repeat; backgroundSize: auto;">
  <!-- <img alt="Socialcap logo" src="/img/svg/socialcap-bg-signin.svg" /> -->
</section>
  
<Section class='w-100 px-2 section-sm text-center h-100 d-flex flex-column justify-content-center'>
  <NavbarBrand class="w-auto m-4" href="/">
    <img alt="Socialcap logo" src="/img/socialcap/socialcap-logo-blue.svg" />
  </NavbarBrand>

  {#if status === 1}
  <Card class="mb-3 border-0 p-3 shadow">
    <CardBody>
      <CardText class='fs-2'>
        Enter your email to log in or create an account.
      </CardText>
      <Form class='w-100 p-4'>
        <FormGroup class='d-flex flex-column w-100 gap-3'>
          <Input
            class='p-3'
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            required
            bind:value={data.email} 
            />
          <Button  
            on:click={() => getOTP()}
            size="md"
            class="px-3 py-2 rounded-3 bg-primary text-white border-0">
            Send me the code
          </Button>
        </FormGroup>
      </Form>
    </CardBody>
    <CardFooter class='border-0 bg-white fs-2'>New to socialcap? <a href="/signup">Create an account</a></CardFooter>
  </Card>
  {/if}


  {#if status === 3}
  <Card class="mb-3 border-0 p-3 shadow">
    <CardBody>
      <CardText>
        Check your email for the code
      </CardText>
      <Form class='w-100'>
        <FormGroup class='d-flex flex-column w-100 gap-3'>
          <Input
            bind:value={data.otp} 
            type="text"
            class='p-3'
            maxlength="6" 
            oninput="this.value=this.value.replace(/[^0-9]/g,'');"
            name="code"
            id="Code"
            placeholder="Enter 6 digit code"
            required
            />
          <Button 
            on:click={() => loginNow()}
            size="md"
            class="px-3 py-2 rounded-3 bg-primary text-white border-0">Sign in
          </Button>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
  {/if}

  {#if status === 4}
    <p>
        Congrats ! You are going to Home page
    </p>
  {/if}
</Section>        

<script>
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  import { Form, FormGroup, Input, Label } from "sveltestrap";
  import { Spinner, Icon, TabContent, TabPane, Button, 
    Card, CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    NavbarBrand
  } from 'sveltestrap';
  import Section from "@components/Section.svelte";
  import BackButton from "@components/buttons/BackButton.svelte";
  import SubmitButton from "@components/buttons/SubmitButton.svelte";
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
    if (rsp.error && rsp.error.code === 404) {
      // No valid email, go to signup
      goto("/signup")
      return;
    }
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
