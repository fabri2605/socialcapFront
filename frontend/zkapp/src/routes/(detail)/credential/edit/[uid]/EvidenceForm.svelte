<div class="text-break word-wrap">
  <!-- <p class="py-2 hl-base">
    Please provide below the required evidence to sustain your claim. This 
    evidence will be deleted as soon as the claim has been approved, so no 
    personal or private data will be stored and kept.
  </p> -->
  <!-- <Form> -->
    <!-- <FormGroup class="mt-3">
      <Label for="alias" class="fw-bold fs-6 text-secondary ps-1 mb-1">Name or alias</Label>
      <Input 
        bind:value={data.claim.alias} 
        type="input" name="alias" id="alias" 
        class="rounded-1 p-2 mb-1"/>
      <FormText color="muted ps-1">
        Name or alias you would like to show in the final credential. 
        &nbsp;{@html required(true)}
      </FormText>
    </FormGroup> -->

    {#each evidenceForm as field, index}
      <FormGroup class="mt-4">

        {#if field.label}
          <Label for="exampleText" class="fw-bold fs-nm text-secondary ps-1 mb-1">
            {field.label}
            <span class="fs-md text-danger">
              {field.required ? "*" : ""}
            </span>
          </Label>
        {/if}

        {#if field.type === "text"}
          <Input 
            type="text" 
            id={field.sid} 
            name={field.sid} 
            bind:value={data[index].value}
            class="rounded-1 py-2 px-2 mb-1 fs-md"
            invalid={!isValid(field, data[index].value)}
            feedback={hasMessage(field, data[index].value)}
          />
        {/if}

        {#if field.type === "note"}
          <Input 
            type="textarea" 
            id={field.sid} 
            name={field.sid} 
            bind:value={data[index].value}
            class="rounded-1 px-2 py-2 mb-1 fs-md"
            rows={initialTextareaSize(data[index].value)}
            bind:inner={field.inner} 
            on:input={() => resizeTextarea(field.inner)}
            invalid={!isValid(field, data[index].value)}
            feedback={hasMessage(field, data[index].value)}
            />
        {/if}

        {#if field.type === "radio"}
          <FormGroup class="ms-4">
            {#each field.extras.options.split(',') as option, i}
              <Input
                id={`rd-${option}-${i}`}
                type="radio"
                value={option}
                label={option}
                bind:group={data[index].value}
                class="px-2 py-1 mt-1"
              />
            {/each}  
          </FormGroup> 
          {#if (!isValid(field, data[index].value))}
            <span class="text-danger mt-0 p-0 fs-sm">
              {hasMessage(field, data[index].value)}
            </span><br>
          {/if}
        {/if}

        {#if field.type === "links"}
           <Tags 
            id={field.sid} 
            name={field.sid} 
            allowPaste={true}
            bind:tags={data[index].value}
            class="rounded-1 px-2 py-1 mb-1  text-break word-wrap"
          />
          {#if (!isValid(field, data[index].value))}
            <span class="text-danger mt-0 p-0 fs-sm">
              {hasMessage(field, data[index].value)}
            </span><br>
          {/if}
        {/if}

        {#if field.type === "files"}
          <Tags 
            id={field.sid} 
            name={field.sid} 
            allowPaste={true}
            bind:tags={data[index].value}
            class="rounded-1 px-2 py-1 mb-1"
          />
          {#if (!isValid(field, data[index].value))}
            <span class="text-danger mt-0 p-0 fs-sm">
              {hasMessage(field, data[index].value)}
            </span><br>
          {/if}
        {/if}

        {#if field.type === "images"}
          <Tags 
            id={field.sid} 
            name={field.sid} 
            allowPaste={true}
            bind:tags={data[index].value}
            class="rounded-1 px-2 mb-1"
          />
          {#if (!isValid(field, data[index].value))}
            <span class="text-danger mt-0 p-0 fs-sm">
              {hasMessage(field, data[index].value)}
            </span><br>
          {/if}
        {/if}
        
        {#if field.description && field.type !== 'remark'}
          <FormText color="muted ps-1 fs-sm">
            {@html field.description}              
          </FormText>
        {/if}

        {#if field.type === 'remark'}
          <p color="ps-1 fs-nm mt-0 p-0 ln-base">
            <Markdown md={field.description} {plugins} />              
          </p>
        {/if}

      </FormGroup>
    {/each}
</div>        

<script>
  import { onMount } from "svelte";
  import { FormGroup, FormText, Label, Input } from 'sveltestrap';
  import Tags from "svelte-tags-input";
  import Markdown from 'svelte-exmarkdown';
  import { gfmPlugin } from 'svelte-exmarkdown/gfm';
  import { isValid, hasMessage } from './validations';
	
  export let 
    evidenceForm,
    data; // this is the data for this MasterPlan and empty Claim

  const plugins = [gfmPlugin()];
 
  onMount(() => {
    // nothing yet ...
  })

  /** Resize textareas **/

  function initialTextareaSize(value) {
    let lines = (value || "").split("\n");
    // console.log("initialTextareaSize", lines, lines.length);
    return (lines.length || 1) ; 
  }

  function resizeTextarea(inner) {
    inner.style.height = 'auto';
    inner.style.height = 4 + inner.scrollHeight + 'px';
    // console.log("resizeTextarea height=", inner, inner.style.height);
  };
</script>