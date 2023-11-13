CREATE VIEW claims_view AS 
SELECT 
	cl.uid, cl.state, st.label as state_descr, 
	pe.full_name as person, pe.uid as person_uid, 
	cm.name as community, cl.uid as community_uid,
	cl.created_utc, cl.updated_utc
FROM public.claims cl, persons pe, communities cm, states st
WHERE
	cl.applicant_uid=pe.uid AND cl.community_uid=cm.uid AND cl.state=st.id;

/*
SELECT uid, account_id, state, full_name, description, image, email, phone, telegram, preferences, created_utc, updated_utc, approved_utc
	FROM public.persons;
	
SELECT uid, account_id, admin_uid, state, name, description, image, created_utc, updated_utc, approved_utc, xadmins
	FROM public.communities;	
*/