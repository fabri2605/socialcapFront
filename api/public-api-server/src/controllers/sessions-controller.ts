import { randomInt, randomUUID } from "crypto";
import { fastify, prisma } from "~/global";
import { i18n as _ } from "~/i18n/messages";
import { Errors } from "~/routes/errors";
import { formatMutationResult } from "~/routes/results";
import { PersonState } from "~/models/person-helpers";
import { sendEmail } from "~/services/email-service";

/**
 * requestOTP
 * @param params Object: { email }
 * @returns MutationResult
 */
export async function requestOtp(params: Object) {
  const remail: string = (params as any).email;

  // If no email => Error BAD_REQUEST (incomplete params)
  if (!remail)
    return Errors.MissingParams(_.missing_param("email", "requestOTP"));

  //If received email NOT exists in table personas => Error NOT_FOUND (does not exists)
  const hasPerson = await prisma.person.findUnique({
    where: { email: remail },
  });
  if (!hasPerson)
    return Errors.NotFound(_.session_no_email_must_signup(remail));

  // Generate OTP with random int up to 6 digits,
  // and left pad it with a random digit if less than 6 digits
  // ej: original otp= "126", filler= "4" = > otp= "444126"
  let otp = randomInt(999999).toString();
  const filler = randomInt(9).toString();
  otp = otp.padStart(6, filler);

  // Create the sessionKey using a random UUID but without the dashes
  const sessionKey = randomUUID().replace(/-/g, "");

  console.log(
    `request_otp email=${remail} otp=${otp} sessionKey=${sessionKey}`
  );

  // If email exists in table sessions => remove it
  const removed = await prisma.session.deleteMany({
    where: { email: remail },
  });

  // Now => insert into sessions(email,key,otp)
  const hasSession = await prisma.session.create({
    data: { email: remail, otp: otp, uid: sessionKey },
  });
  if (!hasSession)
    return Errors.DatabaseEngine(_.database_error("insert into table Session"));

  //Send email with otp to user
  console.log(
    `request_otp email=${remail} otp=${otp} sessionKey=${sessionKey}`
  );
  const result  = await sendEmail({
    email: remail,
    content: `Your OTP is <strong>${otp}</strong>`,
    text: "Session OTP",
    subject: "Session OTP",
  });
  console.log(`send email result ${result}`)

  return formatMutationResult({
    session_key: sessionKey,
  });
}

/**
 * login
 * @param params Object: { session_key, otp }
 * @returns MutationResult
 */
export async function login(params: { session_key: string; otp: string }) {
  const sessionKey = params.session_key;
  const otp = params.otp;

  // 1. If no `session_key` or `otp` => Error BAD_REQUEST (incomplete params)
  if (!sessionKey || !otp)
    return Errors.MissingParams(_.missing_param("session_key, OTP", "login"));

  // 2. If received `session_key` NOT matchs existent in `session` table => Error BAD_REQUEST
  const session = await prisma.session.findUnique({
    where: { uid: sessionKey },
  });
  if (!session) return Errors.NotFound(_.session_key_not_found());

  // 3. If received `otp` NOT matchs existent in `session` table => Error UNAUTHORIZED (bad OTP)
  if (otp.toString() !== session.otp.toString())
    return Errors.UnauthorizedError(_.session_invalid_otp());

  // 4. Get `email` from `sessions where session_key`
  // 5. Find one from `persons where email` => `person`
  const person = await prisma.person.findUnique({
    where: { email: session.email },
  });
  if (!person)
    return Errors.UnauthorizedError(_.session_person_not_found(session.email));

  // 6. Check person status just in case has been suspended, etc
  const state = new PersonState(person);
  if (state.isInactive())
    return Errors.UnauthorizedError(_.session_person_not_active(session.email));

  // 7. Generate the `authorization` JWT using the `persona uid` and extras
  const jwt = fastify.jwt.sign({
    uid: person.uid,
    session_key: sessionKey,
    created_utc: new Date(),
    expires_utc: null, // no expiration for now ...
  });
  console.log("JWT signed=", jwt, new Date());

  return formatMutationResult({
    authorization: jwt,
    profile: {
      uid: person.uid,
      full_name: person.fullName,
      email: person.email,
      phone: person.phone,
      telegram: person.telegram,
      account_id: person.accountId,
      avatar: person.avatar,
      state: person.state,
      preferences: person.preferences || {},
      created_utc: person.createdUtc,
      updated_utc: person.updatedUtc,
    },
  });
}
