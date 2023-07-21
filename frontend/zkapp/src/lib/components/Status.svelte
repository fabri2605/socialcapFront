<!-- <Toast
  autohide
  body
  header={status.message}
  {isOpen}
  on:close={() => (isOpen = false)}
>
 {status.code} {status.message}
</Toast> -->
{#if  $appStatus.state > 0}
<Alert color="light" dismissible class="border shadow rounded-3 px-4 py-3 mb-4 d-flex align-items-center" role="alert">
  <h1 class="{stateColors[$appStatus.state]} me-3">
    <Icon name={stateIcons[$appStatus.state]} />
  </h1>
  <div>
    {#each $appStatus.messages as m}
      <p class="px-2 py-0 m-0">{@html m}</p>
    {/each}
  </div>
</Alert>
{/if}

<script>
  import { Alert, Icon } from "sveltestrap";
  import { appStatus } from "@utilities/app-status";

  const stateIcons = [
    "none",
    "clock-history", // running
    "check2-circle", // success
    "exclamation-diamond-fill" // failed
  ]

  const stateColors = [
    "none",
    "text-warning",
    "text-success",
    "text-danger"
  ]
</script>