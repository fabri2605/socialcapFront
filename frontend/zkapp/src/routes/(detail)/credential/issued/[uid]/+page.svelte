<DetailPageHeader items={[
  { href: '/', text: 'Back'},
  { href: '', text: `Issued #${data.uid}`}
]}/>

<DetailPageContent>
  <!-- <Sidenote form>
    <hr/>
    <p>::: THIS IS AN APPROVED CREDENTIAL :::</p>
    <p>This is an already issued credential where that he/she can min on his/her own wallet.</p>
    <p>We only arrive here if the user already has an approved cerdential.</p>
  </Sidenote> -->
  <Section class="section-sm d-flex justify-content-center">

    <div class="bg-white header border border-1 rounded-3 p-4 border-sc shadow-sc w-auto text-center align-center d-flex flex-column">
      <div class="d-flex border p-4 rounded-2 border-2 border-gray gap-4">
        <!-- <img src={data.image} height="240px" crossorigin/> -->
        <img src={imageUrl} height="180px" crossorigin/>
        <div class="d-flex flex-column text-start">
          
          <span class="fw-bold fs-sm">{data.community}</span>
          <h4 class="text-black mt-2">
            <Badge class='border-2 border-primary border bg-white text-primary'>{data.type}</Badge>
          </h4>
          <p class="fs-6 text-secondary lh-base">{@html data.description}</p>
        </div>
      </div>
        
        <div class="mt-4 d-flex flex-column">
          <h1 class="d-inline-block">{data.alias}</h1>
          <!-- <span>
            | {data.stars} Stars 
          </span> -->
          
          <div class="d-flex gap-1 justify-content-center">

            {#each Array(5) as _, index (index)}
            <i class="star bi bi-star-fill"> </i>
            {/each}
          </div>
          
          
        </div>
        
        <div class="mt-0 lh-lg d-flex justify-content-center gap-4">
          
          <div>

            <p class=' mt-4 m-0 '>Issued</p>
            <Badge class='text-black bg-white border border-2 border-gray'>
              {prettyDate(data.issuedUTC)}
            </Badge> 
          </div>
          
          <div>

            <p class=' mt-4 m-0'>Valid</p> 

            <Badge class='text-black bg-white border border-2 border-gray'>
              {data.dueUTC ? prettyDate(data.dueUTC) : "Forever"}
            </Badge> 
          </div>
        </div>
        
      <div class="mt-4">
        <p class="m-0 p-0 lh-1 mt-2 fs-sm"><a href={"#"}>Link to transaction/metadata</a></p>
        <p class="mt-2 fs-xs">
          <!-- <img alt="Socialcap logo" src="/img/socialcap/socialcap-logo.svg" height="24px"/> -->
          <!-- <Badge class="fs-sm" color="success">Verified</Badge>  -->
          <img src="/img/svg/verified.svg" height="20%" crossorigin/>

        </p>
      </div>
    </div>
  </Section>

  
  <!-- DISABLE MINTING UNTIL WE HAVE A MINTING ISSUING COMPLETED 
     
    <Section class="section-sm pb-4">
    <div class="mt-3 mb-5 px-2 d-flex justify-content-center align-items-center">
      <div>
        Not minted yet ? &nbsp;
        <a href={mintUrl} target="_blank">
          <Button color="primary" class="rounded-5 p-2 px-3">Mint it now !</Button>
        </a>
      </div>
    </div>
  </Section> -->

  <!-- <Section form>
    <pre class="mt-5">
      // to be used in presentation
      alias: {data.alias},
      type: {data.type},
      description: {data.description},
      state: {data.state}, 
      issuedBy: {data.issuedBy},
      stars: {data.start}, 
      image: {data.image},
    
      // activity times
      createdUTC: "2023-05-01 15:07",
      updatedUTC: "2023-05-07 12:01",
      votedUTC: "2023-07-01",
      issuedUTC: "2023-07-01",
      expiresUTC: "2024-07-01",
      
      // extra info
      metadata: {data.metadata}, // filled with MasterPlan metadata and MInting options 
      txId: "", // MINA transaction ID
      hash: "A62F345678...A0BC4" // ??? Merkle Leaf hash necessary
    </pre>
    <Form>
    </Form>
  </Section> -->

  <!-- <Filler n=40/> -->
  <br><br>
</DetailPageContent>

<script>
  import { onMount } from "svelte";
  import { Badge, Button, Alert } from 'sveltestrap';
  import Filler from "$lib/components/Filler.svelte";
  import Sidenote from "@components/Sidenote.svelte";
  import Section from "@components/Section.svelte";
  import DetailPageContent from "@components/DetailPageContent.svelte";
  import DetailPageHeader from "@components/DetailPageHeader.svelte";
  import { getCurrentUser } from "$lib/models/current-user";
  import { prettyDate } from "@utilities/datetime";

  export let data; // this is the data for this MasterPlan and empty Claim

  let imageUrl = (!data.image.includes("http"))
    ? "https://ipfs.io/ipfs/"+data.image
    : data.image;

  let mintUrl = `https://near.org/socialcap.near/widget/CredentialMint?uid=${data.uid}`;

  let 
    user = getCurrentUser();

  onMount(() => {
    user = getCurrentUser()
  })
</script>