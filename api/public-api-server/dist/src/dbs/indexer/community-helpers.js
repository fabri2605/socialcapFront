"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommunityOrRaise = exports.getCommunityOrRaise = exports.CommunityState = exports.COMMUNITY_STATES = void 0;
const global_1 = require("~/global");
const responses_1 = require("~/core/responses");
const zod_1 = require("../../../prisma/generated/zod");
const entity_state_1 = require("~/models/entity-state");
const person_helpers_1 = require("./person-helpers");
exports.COMMUNITY_STATES = [
    "REVISION", "APPROVED", "PAYMENT", "ACTIVE",
    "DELETED", "CANCELED", "PAUSED"
];
exports.CommunityState = new entity_state_1.EntityState(exports.COMMUNITY_STATES);
async function getCommunityOrRaise(uid) {
    const t = await global_1.prisma.community.findUnique({
        where: { uid: uid }
    });
    if (!t)
        responses_1.raiseError.NotFound(`Community %{uid} not found`);
    return t;
}
exports.getCommunityOrRaise = getCommunityOrRaise;
async function updateCommunityOrRaise(uid, unsafeParams) {
    let params = zod_1.CommunityPartialSchema.safeParse(unsafeParams);
    // we mostly allways need this
    let current = await global_1.prisma.community.findUnique({
        where: { uid: uid }
    });
    if (params.state) {
        // needs additional checking here, suchs as valid state
        params.state = exports.CommunityState.changeFrom((current === null || current === void 0 ? void 0 : current.state) || "", params.state);
    }
    if (params.adminUid) {
        // we must check the adminUid for a valid PersonUid 
        const admin = await (0, person_helpers_1.getPersonOrRaise)(params.adminUid);
    }
    const upserted = await global_1.prisma.community.upsert({
        where: { uid: uid },
        update: Object.assign({}, params),
        create: {
            uid: uid,
            name: params.name || "Yet unnamed!",
            description: params.description || "Please describe this community",
            state: exports.CommunityState.initial(),
            adminUid: params.adminUid
        },
    });
    return upserted;
}
exports.updateCommunityOrRaise = updateCommunityOrRaise;
