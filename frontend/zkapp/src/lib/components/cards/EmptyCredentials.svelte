<Section class="section-fluid pt-5 pb-4 bg-white rounded-3 shadow border">
  <div class="px-4 border-0 ">
    <div class="text-center m-0 mt-3">
      <div class="mb-4">
        <img src="/img/svg/undraw_mornings_re_cofi.svg" height="160px" alt="First time here!"/>
      </div>
      <p class="fs-6 lh-lg">
        Hi <b>{user.fullName}</b>. 
        <br>
        You have not claimed any credentials yet. 
        <a href="/credentials/canclaim">Claim one now !</a>
      </p>
    </div>
  </div>
</Section>

<script lang="ts">
  import { Card, CardBody, CardText, Badge } from 'sveltestrap';
  import Section from '../Section.svelte';
  import type { CurrentUser } from "$lib/models/current-user";

  export let user: CurrentUser;
</script>
