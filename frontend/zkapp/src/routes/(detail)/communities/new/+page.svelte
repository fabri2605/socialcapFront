<DetailPageHeader items={[
  { href: '/', text: 'Home'},
  { href: '/communities', text: 'Communities'},
  { href: '', text: 'Register your community'}
  ]} />

<DetailPageContent>
  <Section class="mw-lg">
    <h4>Register your community</h4>
 
      <!-- <Alert color="nolight mb-4"> -->
      <div>
        <!-- <h4 class="alert-heading text-capitalize">
            Caution
          </h4> -->
        <p class="lh-lg mt-4">
          Are you one of the Administrators of this community ?
          <br>
          We <a href="#todo" class="alert-link text-danger">will check this before approving</a>
          the community registration.
        </p>
      </div>
      <!-- </Alert>   -->

      <Form>
        <FormGroup class="mt-4">
          <Label>Community name</Label>
          <Input bind:value={data.name} invalid={!data.name.trim()} type="text" class="form-control" placeholder=""
            feedback="Provide a name for this community." />
        </FormGroup>
        <FormGroup class="mt-5">
          <Input bind:value={data.description} type="textarea" class="form-control" id="exampleFormControlTextarea1"
            rows="3" placeholder="Describe its goals, membership rules, etc here ..." invalid={!data.description.trim()}
            feedback="Provide a description for this community." />
        </FormGroup>
        <FormGroup class="mt-5">
          <Input bind:checked={data.accepted} class="checkbox" type="checkbox" id="check-grp-2"
            label="I agree with the Terms and Conditions" />
          {#if !data.accepted}
            <p class="py-1 ">
              <!--Before submiting this, please note that in order to avoid spurious registrations we will latter require you to <b>deposit two (2) MINA tokens</b> to complete the registration. 
                Please note that to complete the registration you will need to <b>deposit two (2) MINAs</b>.
              -->
              <small>Please accept the <a href="/terms-and-conditions">Terms and 
                Conditions</a> for registering communities.</small>
              </p>
          {/if}
        </FormGroup>

        <div class="button-group d-flex pt-3">
          {#if dataIsOk(data)}
            <Button color="primary" size="lg"
              class="fs-6 btn-rounded squared text-capitalize"
              on:click={registerIt}
              disabled={!dataIsOk(data)}>
              Register it now !
            </Button>
            &nbsp;
          {/if}

          <Button color="light" size="default" type="link"
            class="btn-squared fs-15 fw-400 text-capitalize text-danger b-light btn-transparent-light"
            on:click={cancelIt}>
            Cancel
          </Button>
        </div>

      </Form>
  </Section>
</DetailPageContent>

<script>
  import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Input,
    Label,
    Alert
  } from 'sveltestrap';
  import { onMount } from "svelte";
  import Filler from "$lib/components/Filler.svelte";
  import EmptyFirstTime from "$lib/components/EmptyFirstTime.svelte";
  import EmptyCredentials from "$lib/components/EmptyCredentials.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
  import Section from '@components/Section.svelte';
  import DetailPageContent from '@components/DetailPageContent.svelte';
  import DetailPageHeader from '@components/DetailPageHeader.svelte';
	
  let user = null;

  let data = {
    name: "",
    description: "",
    accepted: false
  }

  onMount(() => {
    user = getCurrentUser();
  })

	function cancelIt() { history.back() };

  function dataIsOk(data) {
    return (data.name.trim() && data.description.trim() && data.accepted);
  }

  function registerIt() {
    if (!dataIsOk(data)) alert("All fields are required !")
    alert("Ready to submit !")
  }
</script>