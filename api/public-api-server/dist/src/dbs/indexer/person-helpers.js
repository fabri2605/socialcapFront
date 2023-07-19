"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePersonOrRaise = exports.getPersonOrRaise = exports.PersonState = void 0;
const global_1 = require("~/global");
const responses_1 = require("~/core/responses");
const zod_1 = require("../../../prisma/generated/zod");
const entity_state_1 = require("~/models/entity-state");
const PERSON_STATES = [
    "REVISION", "APPROVED", "PAYMENT", "ACTIVE",
    "DELETED", "CANCELED", "PAUSED"
];
exports.PersonState = new entity_state_1.EntityState(PERSON_STATES);
async function getPersonOrRaise(uid) {
    const p = await global_1.prisma.person.findUnique({
        where: { uid: uid }
    });
    if (!p)
        responses_1.raiseError.NotFound(`Person %{uid} not found`);
    return p;
}
exports.getPersonOrRaise = getPersonOrRaise;
async function updatePersonOrRaise(uid, unsafeParams) {
    let params = zod_1.PersonPartialSchema.safeParse(unsafeParams);
    const p = await global_1.prisma.person.update({
        where: { uid: uid },
        data: Object.assign({}, params),
    });
    if (!p)
        responses_1.raiseError.DatabaseEngine(`Update person ${uid} failed`);
    return p;
}
exports.updatePersonOrRaise = updatePersonOrRaise;
