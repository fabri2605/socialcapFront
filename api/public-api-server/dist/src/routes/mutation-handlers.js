"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const no_actions_1 = require("~/controllers/no-actions");
const sessions_controller_1 = require("~/controllers/sessions-controller");
const persons_controller_1 = require("~/controllers/persons-controller");
const communities_controller_1 = require("~/controllers/communities-controller");
const mutationHandlers = {
    'no_actions': { fn: no_actions_1.noActions, authorize: false },
    'request_otp': { fn: sessions_controller_1.requestOtp, authorize: false },
    'login': { fn: sessions_controller_1.login, authorize: false },
    'sign_up': { fn: persons_controller_1.signUp, authorize: false },
    'update_profile': { fn: persons_controller_1.updateProfile, authorize: true },
    'update_community': { fn: communities_controller_1.updateCommunity, authorize: true },
    /*
    - [mint_credential]():
    - [create_claim]():
    - [update_claim](): // only while in draft state !
    - [submit_claim](): // pay for it and submit, no more changes after this
    - [join_community]():
    - [propose_as_validator]():
    - [register_admined_community]():
    - [update_admined_community]():
    - [approve_validator]():
    - [approve_auditor]():
    - [create_master_plan]():
    - [update_master_plan]():
    - [submit_task](): // no more changes after this
    */
};
exports.default = mutationHandlers;
