"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const sgMail = require("@sendgrid/mail");
async function sendEmail({ email, subject, text, content, }) {
    const msg = {
        to: email,
        from: "identicon.dao@gmail.com",
        subject: subject,
        text: text,
        html: content,
    };
    // return sgMail.send(msg);
}
exports.sendEmail = sendEmail;
;
