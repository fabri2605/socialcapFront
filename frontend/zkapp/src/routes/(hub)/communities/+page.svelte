<div style="margin:auto;">
  <Sidenote>
    <hr/>
    <p>::: FIRST TIME USER - HAS NOT JOINED ANY COMMUNITY YET :::</p>
  </Sidenote>
  <Section>
    <EmptyFirstTime {user}/>
  </Section>
  
  <Sidenote>
    <hr>
    <p>::: NOT FIRST TIME :::
    <br>Shows all communities the you have joined and all available communities in a grid or list:
    </p>
  </Sidenote>
  <Section>
    <div class="pb-3">
      Show <InlineTab bind:current={show} items={[
        { value: "M", text: "My communities"},
        { value: "A", text: "All"},
      ]}/>
      &nbsp; | &nbsp;
      Sort by <select class="p-1 rounded-1">
        <option>Popularity</option>
        <option>Newest</option>
      </select>
    </div>
    <div>
      <CommunityCard uid=1/>
      <CommunityCard uid=2/>
      <CommunityCard uid=3/>
      <CommunityCard uid=4/>
      <CommunityCard uid=5/>
    </div>
  </Section>

  <Filler n=40/>
</div>

<script>
  import { onMount } from "svelte";
  import Filler from "$lib/components/Filler.svelte";
  import InlineTab from "@components/InlineTab.svelte";
  import EmptyFirstTime from "$lib/components/EmptyFirstTime.svelte";
  import EmptyCredentials from "$lib/components/EmptyCredentials.svelte";
  import CommunityCard from "@components/CommunityCard.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
	
  let 
    user = getCurrentUser(), 
    firstTime = false,
    show = 'M';

  onMount(() => {
    user = getCurrentUser();
    firstTime = false; //isFirstTimeUser(user); 
  })
</script>