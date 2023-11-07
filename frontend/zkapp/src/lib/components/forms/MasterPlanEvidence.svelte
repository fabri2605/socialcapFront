<div>
  <section 
    use:dndzone="{{items, flipDurationMs}}" 
    on:consider="{handleDndConsider}" 
    on:finalize="{handleDndFinalize}">
    {#each items as item, index (item.id)}
      <div animate:flip="{{duration: flipDurationMs}}">
        {#if index === selected}
          <div class="border border-3 border-warning rounded-2 mb-2 p-4">
            <div class="text-end">
              <Button color="light" on:click={() => {selected = null;}}> 
                <Icon name="x" />
              </Button>
            </div>
            <MasterPlanEvidenceField bind:field={items[index]} />
            <div class="d-flex justify-content-between">
              <Button outline color="secondary" on:click={() => {removeField(index);}}> 
                <Icon name="trash-fill" /> &nbsp; Remove it 
              </Button>
              <Button outline color="secondary" on:click={() => {selected = null;}}> 
                <Icon name="check-lg" />
              </Button>
            </div>
          </div>
        {:else}
          <div 
            class="border border-secondary rounded-2 mx-2 mb-2 px-3 d-flex justify-content-between align-items-center">
            <div class="lh-lg px-2 pt-3 text-start">
              <b>{item.label}</b> ({item.sid}: {item.type})
              <p class="fs-sm lh-base text-secondary">{@html item.description}</p>
            </div>
            <div class="fs-4">
              <Button color="light" on:click={() => {selected = index;}}> 
                <Icon name="chevron-expand" />
              </Button>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </section>

  <div class="ps-2">
    <Button 
      on:click={addField}
      outline size="md" class="px-3 py-2" color="secondary">
      <b>+</b> Add an evidence field
    </Button>
  </div>
</div>

<script>
  import {flip} from "svelte/animate";
  import {dndzone} from "svelte-dnd-action";  import { Button, Icon } from "sveltestrap"
  import MasterPlanEvidenceField from "./MasterPlanEvidenceField.svelte";

  export let items = [];

  let selected = null;

  const EmptyField = {
    sid: '',
    required: false, // a required field
    label: "",
    description: "",
    type: "text", // text | note | file | remark | radio | links | images // field type
    extras: { 
      max: 0, // max number of chars in this field  for Text and Note fields
      allowed: null, // allowed file types for File and Image fields
      options: null, // options for Radio field
    },
    id: '' // used to order fields
  };

  function addField() {
    let field = JSON.parse(JSON.stringify(EmptyField))
    field.id = crypto.randomUUID().replaceAll('-','');
    items = []
      .concat(items)
      .concat([field]);
  }

  function removeField(index) {
    items.splice(index, 1)
    items = []
      .concat(items);
  }

  const flipDurationMs = 300;

  function handleDndConsider(e) {
      items = e.detail.items;
  }

  function handleDndFinalize(e) {
      items = e.detail.items;
  }
</script>
