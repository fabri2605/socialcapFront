<div>
  <h3> page</h3>

  <div>
    <p></p>
  </div>

  <div>
    <p></p>
  </div>

  <Filler n=40 filler="- . - . - . -- . - . - . -- . - . - . -- . - . - . -" />
</div>

<script>
  import { onMount } from "svelte";
  import Filler from "$lib/components/Filler.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
	
  let user = null;

  onMount(() => {
    user = getCurrentUser();
  })
</script>