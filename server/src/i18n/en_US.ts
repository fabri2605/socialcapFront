import { i } from "./helpers";

const en_US: any = {
  //  export default {
    // 
    is_language: i('English US'),
    tagline: i('Your community credentials'),
    all_rights_reserved: i('@2023 - Socialcap - All rights reserved'),
    
    // errors
    database_error: i("Failed database action: {}"),
    missing_param: i("Missing '{}' param in '{}'"),
    unknown_error: i("Unknown error in '{}': {}"),
    method_not_supported: i("Method '{}' is not supported in API"),
  
    // routes 
    session_no_email_must_signup: i("No user with email '{}'. Must sign up !"),
}

export { 
  en_US 
};
