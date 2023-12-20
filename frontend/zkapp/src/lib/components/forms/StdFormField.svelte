<FormGroup class="text-start">
  <Label 
    for={idn}
    class="fw-bold fs-sm --text-secondary ps-1 mb-1"
    >{label}</Label>

  <Input 
    type={type} 
    id={idn} 
    name={idn}
    class={
      "rounded-1 fs-nm ps-2 py-2 border-1 "
      +(type === 'select' ? " pe-5 " : " pe-2 ")
      +className
    }
    {placeholder}
    invalid={invalid}
    feedback={feedback}
    {readonly}
    bind:value={value}>
    {#if type === 'select' && options.length}
      {#each  options as opt}
        <option value={opt.value}>{opt.text}</option>
      {/each}
    {/if}
  </Input>

  <FormText>{@html help}</FormText>
</FormGroup>

<script>
  import { FormGroup, Label, Input, FormText } from "sveltestrap";

  export let 
    type, value, label, // this are required !!!
    help = "", idn = null, options=[], readonly = null,
    invalid = false, placeholder = null, feedback = "";

  export { className as class };
  let className;

  idn = idn || label.replace(/ /g,'-').toLowerCase();
</script>