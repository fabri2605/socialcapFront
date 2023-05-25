import { randomInt, randomUUID } from "crypto";
import { prisma } from "~/global";
import { i18n as _ } from "~/i18n/messages";

import { Errors } from "~/routes/errors";
import { formatMutationResult } from "~/routes/results";

/**
 * @param params Object: { email }
 * @returns MutationResult
 */
export async function requestOtp(params: Object) { 
  const remail: string = (params as any).email;

  // If no email => Error BAD_REQUEST (incomplete params)
  if (!remail) return Errors.MissingParams(
    _.missing_param('email', 'requestOTP')
  );

  //If received email NOT exists in table personas => Error NOT_FOUND (does not exists)
  const hasPerson = await prisma.person.findUnique({where: { email: remail }}); 
  if (!hasPerson) return Errors.NotFound(
    _.session_no_email_must_signup(remail)
  );

  //Generate otp and key
  const otp = randomInt(999999).toString().padStart(6, '1');
  const sessionKey = randomUUID();
  console.log(`send_session_otp otp=${otp} sessionKey=${sessionKey}`)

  // If email exists in table sessions => remove it
  const removed = await prisma.session.deleteMany({
    where: { email: remail }
  });

  // Now => insert into sessions(email,key,otp)
  const hasSession = await prisma.session.create({
    data: { email: remail, otp: otp, uid: sessionKey }
  })
  if (!hasSession) return Errors.DatabaseEngine(
    _.database_error("insert into table Session")
  );

  //Send email with otp to user
  console.log(`send_session_otp email=${remail} otp=${otp} sessionKey=${sessionKey}`)

  return formatMutationResult({
    session_key: sessionKey
  });
}

