<div class="pt-3">
  <div class="text-end py-3 mx-4 d-flex justify-content-between align-items-center border-0 border-bottom">
        <Dropdown autoClose="inside" size="sm">
          Show &nbsp; <DropdownToggle class="--bg-light" caret>Columns</DropdownToggle>
          <DropdownMenu>
            {#each fields as field}
              {#if !field.isRemark}
                <DropdownItem>
                  <Input 
                    type="checkbox" 
                    label={field.label}
                    bind:checked={field.selected}
                  />
                </DropdownItem>  
              {/if}
            {/each}
          </DropdownMenu>
        </Dropdown>    
        
        <Button color="primary" size="" class="me-4">
          Submit your votes 
        </Button>
  </div>

  {#each data as task}
    <TaskItem uid={task.uid} columns={columns} bind:data={task}/>
  {/each}
</div>

<script>
  import { Button, Input } from "sveltestrap";
  import { Dropdown, DropdownItem,DropdownToggle, DropdownMenu } from "sveltestrap";
  import TaskItem from "./TaskItem.svelte";

  export let data;

  let 
    columns = [],
    contains = "",
    orderBy = [];
    
  let fields = prepareColumnsSelector(data);

  $: columns = filterSelected(fields);

  function prepareColumnsSelector(tasks) {
    if ((tasks || []).length === 0) 
      return;

    const evidenceData = JSON.parse(tasks[0].claim.evidenceData);
    return evidenceData
      .map((t, j) => {
        return {
          label: t.label,
          index: j,
          isRemark: (t.type === 'remark'),
          selected: false
        }
      }) 
  }

  function filterSelected(fields) {
    let cols = fields.filter((t) => t.selected).map((t) => t.index);
    return cols;
  }
</script>