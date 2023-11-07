<div class="w-100">
  <Card class="">
      <CardHeader>
        <div class="d-flex justify-content-start align-items-center mt-2">
          <img src={data.image} width="30%" crossorigin alt="Community logo" 
            class="rounded-3"/>
          <div class="ms-3 mt-0">
            <span class="fs-sm">
              <Badge color={stateColors[data.state]}>{data.state}</Badge>
            </span>
            <p class="mt-2 fs-lg lh-sm m-0 p-0 mb-1">{data.name}</p>
            <p class="fs-sm lh-base mt-0 text-left mb-0 text-secondary">
              {@html data.description}
              <!-- <br><b>{data.countMembers || ""}</b> members
              | &nbsp; 
              <b>{data.countCredentials || ""}</b> credentials issued -->
            </p>
          </div>
        </div>
      </CardHeader>

      <CardBody class="fs-sm">
        <div class="d-flex justify-content-start">
          <p class="p-0">
            <span class="fs-xs">Registered</span>
            <br/><b class="fs-sm">{prettyDate(data.createdUTC)}</b>
          </p>
          <p class="ps-5 pe-0">
            <span class="fs-xs">Approved</span>
            <br/><b class="fs-sm">{prettyDate(data.approvedUTC)}</b>
          </p>
          <p class="ps-5 pe-0">
            <span class="fs-xs">Updated</span>
            <br/><b class="fs-sm">{prettyDate(data.updatedUTC)}</b>
          </p>
        </div>

        <p class="py-0 my-0 d-flex justify-content-between align-items-center">

          <span class="fs-sm lh-base mt-2 text-left mb-0 text-secondary">
            <b>{data.countMembers || "?"}</b> members
            <br/> 
            <b>{data.countCredentials || "?"}</b> credentials issued
          </span>

          <a 
            href={'#'} 
            class="text-white text-decoration-none fs-sm">
            <Button color="primary" size="sm" class="rounded-2 px-3 py-1"
              on:click={(ev) => joinIt(ev, data.uid)}>
              Join now !
            </Button>
          </a>
        </p>
    </CardBody>
  </Card>
</div>

<Modal body 
  header="Join" 
  isOpen={openJoinDlg} toggle={toggleJoin}>
  Join this community
</Modal>

<script>
  import { createEventDispatcher, tick } from "svelte";
  import { Badge, Modal, Button, Card, CardBody, CardHeader } from "sveltestrap";
  import { getCurrentUser } from "@models/current-user";
  import { joinCommunity } from "@apis/mutations";
  import { prettyDate } from "@utilities/datetime";

  export let uid = 0, data, joined = false;

  let openJoinDlg = false;
  const toggleJoin = () => (openJoinDlg = !openJoinDlg);

  const dispatcher = createEventDispatcher();

  const stateColors = {
    'DRAFT': 'warning',
    'APPROVED': 'success',
    'PAUSED': 'secondary',
    'REJECTED': 'danger'
  } 

  async function joinIt(ev, communityUid) {
   
    let user = await getCurrentUser();
    
    ev.preventDefault();
    ev.stopPropagation();
    dispatcher("clicked_join_community", {
      communityUid: communityUid,
      personUid: user.uid
    });

    return ;
  }
</script>
