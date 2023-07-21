<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getItem } from "$lib/utility/localStorageController";
  import { page } from "$app/stores";

  // local imports ...
  import { Styles } from "sveltestrap";
  import RootHeader from "@components/RootHeader.svelte";

  // Hexui
  let isAuthenticated = getItem("access_token");
  let currentPage = $page.url.pathname;

  onMount(async () => {
    if (isAuthenticated && isAuthenticated !== "") {
      goto(currentPage);
    } else {
      goto(`/signin`);
    }
  });
</script>

<svelte:head>
  <title>Socialcap</title>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  />
</svelte:head>

<div style="position:fixed;top:0;left:0;bottom:0;right:0;">
  <slot />
</div>

<!--
  MINA original not used here
-->
<style global>
  /* @import "/css/mina-fonts.css"; */
  /* @import '/css/bootstrap.css'; */
  /* @import "/css/custom.css"; */
  @import "/css/custom.min.css";
  @import "/css/patches.css";
</style>
