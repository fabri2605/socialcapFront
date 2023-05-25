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

  // Generate OTP with random int up to 6 digits, 
  // and left pad it with a random digit if less than 6 digits
  // ej: original otp= "126", filler= "4" = > otp= "444126" 
  let otp = randomInt(999999).toString();
  const filler = randomInt(9).toString();
  otp = otp.padStart(6, filler);

  // Create the sessionKey using a random UUID but without the dashes
  const sessionKey = randomUUID().replace(/-/g, '');

  console.log(`request_otp email=${remail} otp=${otp} sessionKey=${sessionKey}`)

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
  console.log(`request_otp email=${remail} otp=${otp} sessionKey=${sessionKey}`)

  return formatMutationResult({
    session_key: sessionKey
  });
}

