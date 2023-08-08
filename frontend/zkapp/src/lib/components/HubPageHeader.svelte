<script lang="ts">
  import { onMount } from "svelte";
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Icon,
  } from "sveltestrap";
  import { getCurrentUser } from "$lib/models/current-user";
  import { removeActiveSession } from "$lib/models/current-session";
  import { page } from "$app/stores";
  import Status from "./Status.svelte";
  import { goto } from "$app/navigation";

  let user: any = null,
    isOpen = false,
    currentPage = $page.url.pathname;

  onMount(async () => {
    user = await getCurrentUser();
  });

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }

  function isActive(path) {
    if ($page.url.pathname === path)
      return "fw-bold text-warning --text-decoration-underline";
    return "";
  }

  function logout() {
    removeActiveSession();
    setTimeout(() => { goto("/login") }, 500);
  }
</script>

<Navbar
  color="white"
  light
  expand="md"
  class="fixed-top navbar-expand-lg top-0 z-index-3 w-100 border-bottom border-1 py-2 align-items-center"
>
  <NavbarBrand class="w-auto ms-4" href="/">
    <img alt="Socialcap logo" src="/img/socialcap/socialcap-icon.svg" />
  </NavbarBrand>

  <NavbarToggler on:click={() => (isOpen = !isOpen)} />

  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav
      class="w-100 justify-content-start --ms-auto --text-center pr-5 mt-1 ms-3"
      navbar
    >
    </Nav>

    <Nav class="w-25 justify-content-end --ms-auto px-1" navbar>
      <NavItem class="d-flex align-items-center justify-content-end text-end fs-sm">
        {user && user.profile.fullName} 
      </NavItem>
      
      <NavItem class="me-4">
        <Dropdown nav inNavbar>
          <DropdownToggle
            nav
            caret
            class="text-black d-flex align-items-center justify-content-end text-secondary"
          >
            <Icon name="person-circle" class="fs-1 px-2 text-black" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem><a href="/profile">Profile</a></DropdownItem>
            <!-- <DropdownItem>Preferences</DropdownItem> -->
            <DropdownItem divider />
            <DropdownItem on:click={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>
