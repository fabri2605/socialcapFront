<div class="py-4 border-0 w-100 text-center bg-white rounded-2 shadow">
    <div class="mt-2 mb-4">
      <img src="/img/svg/undraw_welcome_cats_thqn.svg" height="160px" alt="First time here!"/>
    </div>
    <h6 class="lh-lg">Hi {user.fullName} !</h6>
    <p class="w-auto fs-5 lh-lg">You have not joined any community yet</p>
    <p class="w-auto">
      <a href={'/communities/all'}>Join now one of this communities</a>
    </p>
</div>

<script lang="ts">
  import { Card, CardBody, CardText } from 'sveltestrap';
  import type { CurrentUser } from "$lib/models/current-user"

  export let user: CurrentUser;
</script>