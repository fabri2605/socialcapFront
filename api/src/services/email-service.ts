//import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface SendEmailParams {
  email: string;
  subject: string;
  text: string;
  content: string;
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

  // return sgMail.send(msg);
};