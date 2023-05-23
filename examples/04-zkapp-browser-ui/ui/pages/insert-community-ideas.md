
/*
  inserte una nueva communidad(data: Object)
    
    let community = { uid, accountId, ...data }

    [rootMT, serializedMT] = api.getCommunitiesMT();
    
    // insert this new leaf into the MerkleTree
    hash = Hash({accountId})
    // NO por ahora ... hash = Hash({accountId + data})

    mt = deserialize(serializedMT);

    newIndex = mt.countLeaves()+1;
 
    mt = mt.addLeave(hash, newIndex);

    witness = mt.getWitness(newIndex);

    newRoot = mt.getRoot();

    rootMT, newRoot

    //// 
        await contract rootMT, newRoot 

        verificar existencia de la comunidad ? o No ?
    ///

    reserializedMT = serialize(mt);
    api.updateComunnitiesMT(newRoot,reserializedMT);
    api.addNewCommunity(uid,...data, witness, hash, newIndex)
    
*/    
   
/*
   ALTERNATIVA EN SERVER
   
   inserte una nueva communidad(data: Object)

    [rootMT] = api.getCommunitiesMT();

    [community, newIndex, newWitness] = api.addNewCommunity(...data)

    [newRoot] = api.getCommunitiesMT();

    //// 
        await contract rootMT, newRoot 

        verificar existencia de la comunidad ? o No ?
    ///

    // api.updateComunnity(community, state=APPROVED);

*/

