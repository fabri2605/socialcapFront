"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.en_US = void 0;
const helpers_1 = require("./helpers");
const en_US = {
    // 
    is_language: (0, helpers_1.i)('English US'),
    tagline: (0, helpers_1.i)('Your community credentials'),
    all_rights_reserved: (0, helpers_1.i)('@2023 - SocialCap - All rights reserved'),
    // errors
    database_error: (0, helpers_1.i)("Failed database action: {}"),
    missing_param: (0, helpers_1.i)("Missing '{}' param in '{}'"),
    unknown_error: (0, helpers_1.i)("Unknown error in '{}': {}"),
    method_not_supported: (0, helpers_1.i)("Method '{}' is not supported in API"),
    // sessions
    session_no_email_must_signup: (0, helpers_1.i)("No user with email='{}'. Must sign up !"),
    session_key_not_found: (0, helpers_1.i)("No available session. Must request new OTP."),
    session_invalid_otp: (0, helpers_1.i)("Can not authorize with this invalid OTP."),
    session_person_not_found: (0, helpers_1.i)("No person found with email='{}'."),
    session_person_not_active: (0, helpers_1.i)("The person with email='{}' is not currently active."),
    // persons
    persons_already_registered: (0, helpers_1.i)("The person with email='{}' is already registered. Goto to login !"),
};
exports.en_US = en_US;
