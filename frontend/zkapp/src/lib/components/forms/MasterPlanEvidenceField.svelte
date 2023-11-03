<div>
  <div class="row">
    <div class="col-6">
      <StdFormField 
        label="Type" 
        type="select" 
        options={[
          { value: "text", text: "Simple text input"},
          { value: "note", text: "Text note input"},
          { value: "radio", text: "Radio buttons input"},
          { value: "links", text: "Links input"},
          { value: "files", text: "File links input"},
          { value: "images", text: "Image links input"},
          { value: "remark", text: "Readonly remarks"},
        ]}
        bind:value={field.type} 
        />
    </div>
    {#if field.type !== "remark"}
      <div class="col-6">
        <StdFormField 
          label="Id" 
          type="text" 
          invalid={!field.sid.trim()} 
          feedback="We need an ID for this field"
          bind:value={field.sid} 
          />
      </div>
    {/if}
  </div>

  {#if field.type !== "remark"}
    <StdFormField 
      label="Label" 
      type="text" 
      invalid={!field.label.trim()} 
      feedback="We need a Label for this field"
      bind:value={field.label} 
      />
  {/if}

  <StdFormField 
    label="Description or content" 
    type="textarea" 
    invalid={!field.description.trim()} 
    feedback="We need a description for this field"
    bind:value={field.description} 
    />

  <div class="row text-start">
    {#if field.type !== "remark"}
      <div class="col-3">
        <StdFormField 
          label="Required" 
          type="select" 
          options={[{value:true,text:"Yes"}, {value:false,text:"No"}]} 
          bind:value={field.required} 
          />
      </div>
    {/if}

    {#if field.type === "text" || field.type === "note"}
      <div class="col-3">
        <StdFormField 
          label="Max text size" 
          type="number" 
          invalid={!field.extras.max < 0} 
          feedback="Which is the max allowed text size"
          bind:value={field.extras.max} 
          />
       </div>
    {/if}

    {#if field.type === "radio"}
      <div class="col-9">
        <StdFormField 
          label="Options" 
          type="textarea" 
          invalid={!field.extras.options} 
          feedback="Add the options separated by comas"
          bind:value={field.extras.options} 
          />
      </div>
    {/if}

    {#if field.type === "links"}
      <div class="col-3">
        <StdFormField 
          label="Max items" 
          type="number" 
          invalid={!field.extras.max < 0} 
          feedback="Which is the max allowed text size"
          bind:value={field.extras.max} 
          />
       </div>
    {/if}

    {#if field.type === "files" || field.type === "images"}
      <div class="col-3">
        <StdFormField 
          label="Max items" 
          type="number" 
          invalid={!field.extras.max < 0} 
          feedback="Which is the max allowed text size"
          bind:value={field.extras.max} 
          />
       </div>
      <div class="col-6">
        <StdFormField 
          label="Allowed types" 
          type="text" 
          feedback={"Allowed "+field.type+"types as a set of comma separated values, ex: 'svg,png,gif'"}
          bind:value={field.extras.allowed} 
          />
      </div>
    {/if}

  </div>
</div>

<script>
  import { } from "sveltestrap";
  import StdFormField from "./StdFormField.svelte";

  export { className as class };
  let className;

  export let field = {
    sid: '',
    required: false, // a required field
    label: "",
    description: "",
    type: "", // text | note | file | remark // field type
    extras: { 
      max: 0, //max number of chars in this field 
      allowed: null // allowed File types
    }
  };

</script>