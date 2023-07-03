<div>
  <Sidenote>
    <hr/>
    <p>::: HAS NOT REGISTERED ANY ADMIN COMMUNITIES :::</p>
  </Sidenote>
  <Section>
    <Empty title="Hi, Pepe !" notice="You have not registered any community yet">
      <p>
        Are you a community admin ? <a href={'/communities/new'}>Register your community</a>
      </p>
    </Empty>
  </Section>

  
  <Sidenote>
    <hr>
    <p>::: HAS REGISTERED ADMIN COMMUNITIES :::
    <br>Shows all communities administered (by you) in a grid or list:
    </p>
  </Sidenote>
  <Section>
    <div>
      <AdminedCard uid=1/>
      <AdminedCard uid=2/>
      <AdminedCard uid=3/>
      <AdminedCard uid=4/>
      <AdminedCard uid=5/>
    </div>
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
	
  let user = null;

  onMount(() => {
    user = getCurrentUser();
  })
</script>