<div>
  <Sidenote>
    <hr>
    <p>This page will be visible only if the user is validating at least one community
      .Otherwise the 'Tasks' meny will not be visible.
    </p>
  </Sidenote>

  <Sidenote>
    <hr>
    <p>::: HAS PENDING TASKS :::
      <br>Shows all pending OR all completed tasks
    </p>
  </Sidenote>
  <Section>
    <div class="pb-3 d-flex justify-content-between align-items-end">
      <div>
        Show <InlineTab bind:current={show} items={[
          { value: "P", text: "Pending tasks"},
          { value: "F", text: "Completed"},
        ]}/>
        &nbsp; | &nbsp;
        Sort by <select>
          <option>Newest</option>
          <option>Due date</option>
        </select>
      </div>

      <IconToggle 
        bind:current={display} 
        options={['list','grid']} 
        />
    </div>
    grid={display}
    {#if show==='P'}
      <div>
        <TaskCard uid=1 state='P'/>
        <TaskCard uid=2 state='P'/>
      </div>
    {/if}
    {#if show==='F'}
      <div>
        <TaskCard uid=101 state='F'/>
        <TaskCard uid=102 state='F'/>
        <TaskCard uid=103 state='F'/>
        <TaskCard uid=104 state='F'/>
        <TaskCard uid=105 state='F'/>
        <TaskCard uid=106 state='F'/>
        <TaskCard uid=107 state='F'/>
      </div>
    {/if}
  </Section>

  <Filler n=40/>
</div>

<script>
  import { onMount } from "svelte";
  import { Button, Icon } from 'sveltestrap';
  import Filler from "$lib/components/Filler.svelte";
  import InlineTab from "@components/InlineTab.svelte";
  import IconToggle from "@components/IconToggle.svelte";
  import EmptyFirstTime from "$lib/components/EmptyFirstTime.svelte";
  import EmptyCredentials from "$lib/components/EmptyCredentials.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import Empty from "@components/Empty.svelte";
  import TaskCard from "@components/TaskCard.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";
	
  let user = getCurrentUser();
  let show = 'P', display = 'grid'; // default is Pending tasks

  onMount(() => {
    user = getCurrentUser();
  })

  function isActive(state) {
    if (state === show) {
      return "bg-info rounded-3 text-white py-1 px-2 text-decoration-none fs-6";
    }
    else {
      return " fs-6";
    }
  }
</script>