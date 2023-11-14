<div>
  <Modal isOpen={open} {toggle} backdrop="static">
    <ModalBody>
      <p class="p-2 fs-lg">
        Are you ready to submit it? 
      </p>
      <p class="p-2">
        After this your draft will be closed and you will not be able to resubmit.
      </p>
      <p>
        Final submission date: <b>{prettyDate(plan.endsUTC)}</b>
      </p>
    </ModalBody>

    <ModalFooter class="text-end">
      <Button color="secondary" on:click={toggle}>
        No, not ready
      </Button>
      <Button color="primary" on:click={() => { 
          dispatch("submit_confirmed"); 
          toggle(); 
        }}>
        Yes, submit it !
      </Button>
    </ModalFooter>
  </Modal>
</div>

<script>
  import { createEventDispatcher } from 'svelte';
  import { Button } from 'sveltestrap';
  import { Modal, ModalBody,ModalFooter,ModalHeader } from 'sveltestrap';
  import { prettyDate } from '@utilities/datetime';

  export let open, toggle, plan;

  const dispatch = createEventDispatcher();
</script>
