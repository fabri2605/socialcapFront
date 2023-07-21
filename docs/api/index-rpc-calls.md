
# Index of RPC methods

This are all RPC methods exposed by the Public API. There are 17 Mutations and 12 Queries. 

This is just an index, and the name is mostly self explanatory. For detail explanation on each one, just use its link.

#### Onboarding

- [sign_up](): register a new user with its email and other minimal info.

- [request_otp](): request an OTP for login sent to the registered email.

- [login](): login using received OTP for login and get AUTH_TOKEN.

#### Profile

- [update_profile](): update the user profile.

#### Credentials 

- [get_my_credentials](): 

- [get_credential]():

- [mint_credential]():

#### Claims

- [get_my_claimables]():

- [get_my_claims]():

- [get_claim]():

- [create_claim](): 

- [update_claim](): // only while in draft state !

- [submit_claim](): // pay for it and submit, no more changes after this

#### Communities

- [get_my_communities](): 

- [get_all_communities]():

- [get_community]():

- [join_community]():

- [propose_as_validator](): 

#### Admin

- [get_admined_community]():

- [get_master_plan]():

- [register_admined_community]():

- [update_admined_community]():

- [approve_validator]():

- [approve_auditor]():

- [create_master_plan]():

- [update_master_plan]():

#### Tasks

- [get_my_tasks]():

- [get_task]():

- [submit_task](): // no more changes after this

