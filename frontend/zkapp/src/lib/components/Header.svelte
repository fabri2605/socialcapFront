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
    Icon
  } from 'sveltestrap';
  import { getCurrentUser } from "$lib/models/current-user"
  import { page } from "$app/stores"

  let 
    user = null,
    isOpen = false, 
    currentPage = $page.url.pathname;

  onMount(() => {
    user = getCurrentUser();
  })

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }

  function isActive(path) {
    if ($page.url.pathname === path)
      return "fw-bold text-warning --text-decoration-underline";
    return "";
  }
</script>

<Navbar color="light" light expand="md" class="fixed-top navbar-expand-lg top-0 z-index-3 w-100 shadow-none navbar-transparent">
  <NavbarBrand class="w-25" href="/">
    <img alt="Socialcap logo" src="/img/socialcap/socialcap-logo.svg" />
  </NavbarBrand>
  
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="w-100 justify-content-center --ms-auto text-center pr-5 mt-2" navbar>
      
      <NavItem>
        <NavLink 
          class={isActive("/claims",$page.url.pathname)} 
          href="/claims">
          Credentials
        </NavLink>
      </NavItem>

      <div class="mt-1 fs-5 text-muted"> | </div>

      <NavItem>
        <NavLink class={isActive("/communities",$page.url.pathname)} href="/communities">Communities</NavLink>
      </NavItem>

      {#if user && user.hasTasks}
        <div class="mt-1 fs-5 text-muted"> | </div>
        <NavItem>
          <NavLink href="/tasks">Tasks</NavLink>
        </NavItem>
      {/if}

      <div class="mt-1 fs-5 text-muted"> | </div>
      <NavItem>
        <NavLink href="/admins">Admin</NavLink>
      </NavItem>

      <!-- filler to center align correctly -->
      <div style="width:12rem;">&nbsp;</div>
    </Nav>

    <Nav class="w-25 justify-content-end --ms-auto px-1" navbar>
      <!-- <NavItem>
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>
            <Icon name="plus-circle-fill" class="fs-4 text-primary" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>Join a community</DropdownItem>
            <DropdownItem>Claim a credential</DropdownItem>
            <DropdownItem>Propose as validator</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Admin your community</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavItem> -->

      <NavItem>
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret class="--d-flex align-items-center">
            <div style="display:inline-block;text-align:center;max-width:4rem;overflow:hidden;">
              <Icon name="person-circle" class="fs-3"/>
              <div style="margin-top:-6px;font-size:12px;">{user.fullName}</div>
            </div>
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Preferences</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>
