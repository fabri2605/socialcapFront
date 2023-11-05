<div class="bg-container" 
  style="position:fixed;margin:0;top:120px;left:0;bottom:0;right:0;border:0px dotted red;overflow:auto;">
  <!-- <section 
    class='bg-image z-n1 position-absolute opacity-50'  
    style="background-image: url('/img/svg/socialcap-bg-signin.svg');height: 100vh; width: 100vw; backgroundRepeat: no-repeat; backgroundSize: auto;">
  </section> -->

  <div class="m-0 p-0 py-4 px-md-0 container m-auto border border-0 border-warning">
    <Status />
    <!-- <div class="w-100 m-0 py-4 px-0 border border-warning border-0"> -->
      <slot></slot>
    <!-- </div>   -->
  </div>
</div>

<script>
  import Status from "./Status.svelte";
</script>