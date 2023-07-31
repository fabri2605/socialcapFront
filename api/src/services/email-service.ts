import sgMail from "@sendgrid/mail";
import { logger } from "../global.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface SendEmailParams {
  email: string;
  subject: string;
  text: string;
  content?: string;
}

export async function sendEmail ({
  email,
  subject,
  text,
  content,
}: SendEmailParams) {
  const msg = {
    to: email,
    from: "identicon.dao@gmail.com",
    subject: subject,
    text: text,
    html: content,
  };

  console.log("Email ", msg);
  // return sgMail.send(msg);
}
