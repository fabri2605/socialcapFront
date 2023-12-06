
<div class="row fs-sm mx-0 mb-2 ps-4 py-1 --border-bottom border-0">
  <span class="col-7 text-start">
    <b class="fs-nm">{p.fullName}</b>
    <br><span class="fs-sm">{p.uid}</span>
  </span>
</div>

<script>
  
  export let p; 

  let stateColors = {
    "APPLIED": "warning",
    "ACCEPTED": "success",
    "DENIED": "danger"
  }

</script>