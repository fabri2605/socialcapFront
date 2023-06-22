<div style="max-width:36rem;margin:auto;" class="p-4">
    <h4>Register your community</h4>

    <div class="new-member-modal">

      <Alert color="warning mb-4">
        <div>
          <h4 class="alert-heading text-capitalize">
            Caution
          </h4>
          <p class="lh-lg">
            Are you one of the real Administrators of this community ?
            <br>
            We <a href="#todo" class="alert-link text-danger">will check this before approving</a>
            the community registration.
          </p>
        </div>
      </Alert>  

      <Form>
        <FormGroup class="mb-4">
          <Label>Community name</Label>
          <Input 
            bind:value={data.name}
            invalid={!data.name.trim()} 
            type="text" class="form-control" placeholder="" 
            feedback="Provide a name for this community."
           />
        </FormGroup>
        <FormGroup class="mb-4">
          <Input
            bind:value={data.description}
            type="textarea"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Describe its goals, membership rules, etc here ..."
            invalid={!data.description.trim()} 
            feedback="Provide a description for this community."
          />
        </FormGroup>
        <FormGroup>
          <Input
          bind:checked={data.accepted}
          class="checkbox"
          type="checkbox"
          id="check-grp-2"
          label="I agree with the Terms and Conditions"
          feedback="You have to accept the Terms and Conditions."
          />
          <p class="py-1">
            <!--Before submiting this, please note that in order to avoid spurious registrations we will latter require you to <b>deposit two (2) MINA tokens</b> to complete the registration. 
              Please note that to complete the registration you will need to <b>deposit two (2) MINAs</b>.
            -->
            Please accept the <a href="/terms-and-conditions">Terms and Conditions</a> for registering communities.
            </p>
        </FormGroup>

        <div class="button-group d-flex pt-3">
          <Button color="primary" size="lg"
            class="fs-15 btn-rounded squared text-capitalize"
            on:click={registerIt}
            disabled={!dataIsOk(data)}>
            Register it now !
          </Button>
          &nbsp;

          <Button color="light" size="default" type="link"
            class="btn-squared fs-15 fw-400 text-capitalize text-danger b-light btn-transparent-light"
            on:click={cancelIt}>
            Cancel
          </Button>
        </div>

      </Form>
    </div>
</div>

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
