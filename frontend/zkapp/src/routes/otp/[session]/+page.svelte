<section 
  class='bg-image z-n1 position-absolute opacity-50'  
  style="background-image: url('/img/svg/socialcap-bg-signin.svg');height: 100vh; width: 100vw; backgroundRepeat: no-repeat; backgroundSize: auto;"
  >
</section>
  
<Section class='w-100 px-2 section-sm text-center h-100 d-flex flex-column justify-content-center'>

  <NavbarBrand class="w-auto m-4" href="/">
    <img alt="Socialcap logo" src="/img/socialcap/socialcap-logo-blue.svg" />
  </NavbarBrand>

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

          {#if data.message}
            <div class="text-danger text-start p-3 fs-nm border-2 shadow-lg">
              {@html (data.message || "")}
            </div>  
          {/if}

          <Button 
            on:click={() => loginNow()}
            size="md"
            class="px-3 py-2 rounded-3 bg-primary text-white border-0">Sign in
          </Button>
        </FormGroup>
      </Form>
    </CardBody>

    <CardFooter 
      class='border-0 bg-white fs-2'>
      Need to change your email? <a href="/login">Login</a>
    </CardFooter>

  </Card>
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

  onMount(async () => {
    session = await getCurrentSession();
  })

  const required = (t) => 
    `<span class="text-warning fw-bold">${t ? `Required` : ``}</span>.`;

  async function loginNow() {
    let rsp = await login({ 
      session_key: data.sessionKey, 
      otp: data.otp 
    });

    if (rsp.error) {
      data.message = "The OTP code seems invalid, please try again !"
      return;
    }

    // success
    session = rsp;
    data.message = "Done. Going to Home ..."

    // save state in currentSession
    setActiveSession({
      host: data.api.host,
      port: data.api.port,
      protocol: data.api.protocol,
      authorization: session.authorization
    });

    // goto home
    setTimeout(() => { 
      goto('/'); 
    }, 500)
  } 
</script>
