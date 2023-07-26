<script>
  // Ui components
  import HubPageContent from '@components/HubPageContent.svelte';

  export let data; // this is the data for the lists
</script>

<HubPageContent>
  <div>
    <p>
      Login here ... ask for email and then OTP ...
    </p>
    <br>
    <pre>
      {JSON.stringify(data, null, 4)}
    </pre>
  </div>
</HubPageContent>
