"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.requestOtp = void 0;
const crypto_1 = require("crypto");
const global_1 = require("~/global");
const messages_1 = require("~/i18n/messages");
const errors_1 = require("~/routes/errors");
const results_1 = require("~/routes/results");
const person_helpers_1 = require("~/models/person-helpers");
const email_service_1 = require("~/services/email-service");
/**
 * requestOTP
 * @param params Object: { email }
 * @returns MutationResult
 */
async function requestOtp(params) {
    const remail = params.email;
    // If no email => Error BAD_REQUEST (incomplete params)
    if (!remail)
        return errors_1.Errors.MissingParams(messages_1.i18n.missing_param("email", "requestOTP"));
    //If received email NOT exists in table personas => Error NOT_FOUND (does not exists)
    const hasPerson = await global_1.prisma.person.findUnique({
        where: { email: remail },
    });
    if (!hasPerson)
        return errors_1.Errors.NotFound(messages_1.i18n.session_no_email_must_signup(remail));
    // Generate OTP with random int up to 6 digits,
    // and left pad it with a random digit if less than 6 digits
    // ej: original otp= "126", filler= "4" = > otp= "444126"
    let otp = (0, crypto_1.randomInt)(999999).toString();
    const filler = (0, crypto_1.randomInt)(9).toString();
    otp = otp.padStart(6, filler);
    // Create the sessionKey using a random UUID but without the dashes
    const sessionKey = (0, crypto_1.randomUUID)().replace(/-/g, "");
    console.log(`request_otp email=${remail} otp=${otp} sessionKey=${sessionKey}`);
    // If email exists in table sessions => remove it
    const removed = await global_1.prisma.session.deleteMany({
        where: { email: remail },
    });
    // Now => insert into sessions(email,key,otp)
    const hasSession = await global_1.prisma.session.create({
        data: { email: remail, otp: otp, uid: sessionKey },
    });
    if (!hasSession)
        return errors_1.Errors.DatabaseEngine(messages_1.i18n.database_error("insert into table Session"));
    //Send email with otp to user
    console.log(`request_otp email=${remail} otp=${otp} sessionKey=${sessionKey}`);
    const result = await (0, email_service_1.sendEmail)({
        email: remail,
        content: `Your OTP is <strong>${otp}</strong>`,
        text: "Session OTP",
        subject: "Session OTP",
    });
    console.log(`send email result ${result}`);
    return (0, results_1.formatMutationResult)({
        session_key: sessionKey,
    });
}
exports.requestOtp = requestOtp;
/**
 * login
 * @param params Object: { session_key, otp }
 * @returns MutationResult
 */
async function login(params) {
    const sessionKey = params.session_key;
    const otp = params.otp;
    // 1. If no `session_key` or `otp` => Error BAD_REQUEST (incomplete params)
    if (!sessionKey || !otp)
        return errors_1.Errors.MissingParams(messages_1.i18n.missing_param("session_key, OTP", "login"));
    // 2. If received `session_key` NOT matchs existent in `session` table => Error BAD_REQUEST
    const session = await global_1.prisma.session.findUnique({
        where: { uid: sessionKey },
    });
    if (!session)
        return errors_1.Errors.NotFound(messages_1.i18n.session_key_not_found());
    // 3. If received `otp` NOT matchs existent in `session` table => Error UNAUTHORIZED (bad OTP)
    if (otp.toString() !== session.otp.toString())
        return errors_1.Errors.UnauthorizedError(messages_1.i18n.session_invalid_otp());
    // 4. Get `email` from `sessions where session_key`
    // 5. Find one from `persons where email` => `person`
    const person = await global_1.prisma.person.findUnique({
        where: { email: session.email },
    });
    if (!person)
        return errors_1.Errors.UnauthorizedError(messages_1.i18n.session_person_not_found(session.email));
    // 6. Check person status just in case has been suspended, etc
    const state = new person_helpers_1.PersonState(person);
    if (state.isInactive())
        return errors_1.Errors.UnauthorizedError(messages_1.i18n.session_person_not_active(session.email));
    // 7. Generate the `authorization` JWT using the `persona uid` and extras
    const jwt = global_1.fastify.jwt.sign({
        uid: person.uid,
        session_key: sessionKey,
        created_utc: new Date(),
        expires_utc: null, // no expiration for now ...
    });
    console.log("JWT signed=", jwt, new Date());
    return (0, results_1.formatMutationResult)({
        authorization: jwt,
        profile: person
    });
}
exports.login = login;
