
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
        <Alert color='info'>
          Your email is not registered. Please sign up first.
        </Alert>
      </CardText>
      <Form class='w-100 p-4'>
        <FormGroup class='d-flex flex-column w-100 gap-2'>
          <Input 
            class='p-3' 
            type="email" 
            name="email" 
            id="Email" 
            placeholder="Email" 
            bind:value={data.email}
          />

          <Input 
            class='p-3' type="fullname" name="fullname" id="Fullname" placeholder="Full name" 
            bind:value={data.fullName}
            />

          {#if data.message}
            <div class="text-danger text-start p-3 fs-nm border-2 shadow-lg">
              {@html (data.message || "")}
            </div>  
          {/if}

          <Button 
            on:click={signUpNow}
            size="md"
            class="mt-2 px-3 py-3 rounded-3 bg-primary text-white border-0"
            >Sign up
          </Button>
        </FormGroup>
      </Form>
    </CardBody>

    <CardFooter 
      class='border-0 bg-white fs-2'>
      Already have an account ? <a href="/login">Login</a>
    </CardFooter>

  </Card>
</Section>

<script>
  import {
    onMount
  } from "svelte";
  import {
    Spinner,
    Icon,
    TabContent,
    TabPane,
    Button,
    Form,
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    NavbarBrand,
    Alert,
  } from 'sveltestrap';
  import Section from '@components/Section.svelte';
  import { signUp } from "@apis/mutations";

  export let data = { 
    email: "", 
    fullName: "", 
    message: "", 
    otp: "", 
    session: "" 
  }; 

  async function signUpNow() {
    let rsp = await signUp({
      email: data.email,
      full_name: data.fullName
    })

    if (rsp.error && rsp.error.code === 404) {
      // No valid email, remain here !
      goto("/signup")
      return;
    }

    if (rsp.error) {
      data.message = `Problem sending your Sign Up request.
        <br>${rsp.error.message}.
        <br>Please correct it and try again !`;
      return;
    }

    // success
    data.session = rsp;
    data.otp = "";
    data.message = "Done. We send a code to your email ...";
    setTimeout(() => {
      goto("/login")
    }, 2000)
  }

</script>
