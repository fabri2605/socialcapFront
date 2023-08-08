<div>
  <!-- <Sidenote>
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
  </Sidenote> -->
  <Section>
    <div class="row align-items-center justify-content-between">
      <div class="col-12 col-md-6">
        <h1>{title[view]}</h1>
      </div>
     
      <div class="col-12 text-start col-md-6 text-md-end">
        <div class="fs-sm lh-lg">
          <span class="d-inline-block">
            Show <InlineTab current={view} items={tabs}/>
          </span>
          <span class="ms-2 d-inline-block">
            Sort by<select class="ms-1 py-1 px-2 rounded-1 border">
              <option>Newest</option>
              <option>Due date</option>
            </select>
          </span>
        </div>
      </div>
    </div>

    <div class="mt-2 pt-1 mx-auto">
      {#if view === 'pending'}
        <div>
          {#each data.assigned as task}
            <TaskCard uid={task.uid} data={task}/>
          {/each}
        </div>
      {/if}
      {#if view === 'done'}
        <div>
          {#each data.completed as task}
            <TaskCard uid={task.uid} data={task}/>
          {/each}
        </div>
      {/if}
    </div>
  </Section>

  <!-- <Filler n=40/> -->
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
  import TaskCard from "@components/cards/TaskCard.svelte";
  import { getCurrentUser, isFirstTimeUser } from "$lib/models/current-user";

  export let data;
  
  const title = {
    "pending": "Pending tasks",
    "done": "Done tasks"
  }

  const allTabs = [
    { value: "pending", text: title['pending'], href:"/tasks/pending"},
    { value: "done", text: title['done'], href:"/tasks/done"},
  ]

  const filterTabs = (view) => {
    return allTabs.filter((t) => {
      return (t.value !== view);
    });        
  }

  let user = getCurrentUser();

  $: view = data.view || "pending"; 
  
  $: tabs = filterTabs(view);

  onMount(() => {
    user = getCurrentUser();
  })
</script>