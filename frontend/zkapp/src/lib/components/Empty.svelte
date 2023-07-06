<div class="py-4 border-0 w-100 text-center bg-white shadow rounded-2">
  <div class="mb-4">
    <img src="/img/svg/undraw_no_data_re_kwbl.svg" height="80px" alt="Empty drawing"/>
  </div>
  <h6 class="lh-lg">{title}</h6>
  <p class="w-auto fs-4 lh-lg">{notice}</p>
  <slot></slot>
</div>

<script lang="ts">
  export let title = "", notice = "";
</script>