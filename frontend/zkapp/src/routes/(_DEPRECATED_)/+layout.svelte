<script>
  import RootHeader from '@components/HubPageHeader.svelte';
  import HubPageContent from '@components/HubPageContent.svelte';
</script>

<div style="position:fixed;top:0;left:0;bottom:0;right:0;">
  <RootHeader />
  <HubPageContent>
    <slot></slot>
  </HubPageContent>
</div>
