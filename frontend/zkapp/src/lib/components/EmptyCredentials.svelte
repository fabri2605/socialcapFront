<div class="py-4 border-0">
  <div class="text-center my-3">
    <div class="mb-4">
      <img src="/img/svg/undraw_no_data_re_kwbl.svg" height="80px" alt="First time here!"/>
    </div>
    <h6 class="lh-lg">Hi {user.fullName} !</h6>
    <p class="fs-4 lh-lg">You have not claimed any credentials yet</p>
    <div>
      <a href={'#'}>Claim your credential now !</a>
    </div>
  </div>
</div>

<script lang="ts">
  import { Card, CardBody, CardText } from 'sveltestrap';
  import type { CurrentUser } from "$lib/models/current-user";

  export let user: CurrentUser;
</script>