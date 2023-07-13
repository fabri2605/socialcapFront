<div>
  <!-- <Sidenote>
    <hr/>
    <p>::: HAS NOT REGISTERED ANY ADMIN COMMUNITIES :::</p>
  </Sidenote> -->
  <Section>
    {#if user && !user.hasAdmins}
    <Empty 
      title="Hi, {user?.fullName || "?"} !"  
      notice="You have not registered any community yet">
      <p>
        Are you a community admin ? 
        <a href={`/admined/new`}>
          Register your community
        </a>
      </p>
    </Empty>
    {/if}
  </Section>
  
  <!-- <Sidenote>
    <hr>
    <p>::: HAS REGISTERED ADMIN COMMUNITIES :::
    <br>Shows all communities administered (by you) in a grid or list:
    </p>
  </Sidenote> -->
  <Section>
    {#if user && user.hasAdmins}
    <div class="row align-items-center justify-content-between">
      <div class="col-12 col-md-8">
        <h1>{title}</h1>
      </div>
      <div class="col-12 text-start col-md-4 text-md-end">
        <div class="fs-sm d-inline-block">
          <!-- <span class="d-inline-block">
            Show <InlineTab current={view} items={tabs} />
          </span> -->
          <span class="ms-2 d-inline-block">
            Sort by<select class="ms-1 py-1 px-2 rounded-1 border">
              <option>Newest</option>
              <option>Popular</option>
            </select>
          </span>
        </div>
      </div>
    </div>

    <div class="mt-4">
      {#each data.admined as org}
        <AdminedCard uid={org.uid} data={org}/>
      {/each}
    </div>
    {/if}
  </Section>

  <Filler n=40/>
</div>

<script>
  import { onMount } from "svelte";
  import Filler from "@components/Filler.svelte";
  import AdminedCard from "@components/AdminedCard.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import Empty from "@components/Empty.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
	
  export let data;

  let title = "Administered communities"
  let user = getCurrentUser();

  onMount(() => {
    user = getCurrentUser();
  })
</script>