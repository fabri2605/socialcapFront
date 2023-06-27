<div class="py-4 border-0 w-100 text-center">
    <div class="mb-4">
      <img src="/img/svg/undraw_mornings_re_cofi.svg" height="80px" alt="First time here!"/>
    </div>
    <h6 class="lh-lg">Hi {user.fullName} !</h6>
    <p class="w-auto fs-4 lh-lg">You have not joined any community yet</p>
    <p class="w-auto">
      <a href={'#'}>Join now one of this communities</a>
    </p>
    <p class="w-auto">
      Are you a community admin ? <a href={'/communities/new'}>Register your community</a>
    </p>
</div>

<script lang="ts">
  import { Card, CardBody, CardText } from 'sveltestrap';
  import type { CurrentUser } from "$lib/models/current-user"

  export let user: CurrentUser;
</script>