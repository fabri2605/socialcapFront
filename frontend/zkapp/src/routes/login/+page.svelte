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

          {#if data.message}
            <div class="text-danger text-start p-3 fs-nm border-2 shadow-lg">
              {@html (data.message || "")}
            </div>  
          {/if}

          <Button  
            on:click={() => getOTP()}
            size="md"
            class="px-3 py-3 rounded-3 bg-primary text-white border-0">
            Send me the code
          </Button>
        </FormGroup>
      </Form>
    </CardBody>

    <CardFooter 
      class='border-0 bg-white fs-2'>
      New to Socialcap? <a href="/signup">Create an account</a>
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

  async function getOTP() {
    let rsp = await requestOTP({ 
      email: data.email 
    });

    if (rsp.error && rsp.error.code === 404) {
      // No valid email, go to signup
      data.message = "Could not find your email. Going to signup ..."
      goto("/signup");
      return;
    }

    if (rsp.error) {
      data.message = "Problem sending OTP request, please try again ..."
      return;
    }

    // success
    session = rsp;
    data.otp = "";

    // goto home
    setTimeout(() => { 
      goto(`/otp/${session.session_key}`); 
    }, 500)
  } 
</script>
