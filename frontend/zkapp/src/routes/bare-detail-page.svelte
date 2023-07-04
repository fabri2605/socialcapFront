<div>
  <Sidenote>
    <hr/>
    <p>::: USER CAN CLAIM A CREDENTIAL OF SOME COMMUNITY WHERE HE/SHE IS A MEMBER :::</p>
    <p>This is a form where he will claim a new credential, and this form is controlled by the MasterPlan.</p>
    <p>We only arrive here if the user already is a member of at least one community.</p>
  </Sidenote>

  <Section class="section-md">
    <div class="header">
      <h3 class="text-black d-flex justify-content-between align-items-center">
        <span>Title</span>
        <span class="fs-xs">
          <Badge color="success">ACTIVE</Badge>
        </span>
      </h3>
      <p class="fs-sm text-secondary lh-base">{@html "Description..."}</p>
    </div>
  </Section>

  <Section form>
    <Form>
    </Form>
  </Section>

  <!-- <Filler n=40/> -->
</div>

<script>
  import { onMount } from "svelte";
  import { Icon, Badge, Form, FormGroup, FormText, Label, Input, Button } from 'sveltestrap';
  import Filler from "$lib/components/Filler.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import { getCurrentUser } from "$lib/models/current-user";

  export let data; // this is the data for this MasterPlan and empty Claim

  let 
    user = getCurrentUser();

  onMount(() => {
    user = getCurrentUser()
  })
</script>