import nodemailer from "nodemailer";

export const sendEmail= async({email, subject, message})=>{
const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    service:process.env.SMTP_SERVICE,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD
    }
});
const options={
    from:process.env.SMTP_MAIL,
    to:email,
    subject:subject,
    text:message,
};
await transporter.sendMail(options);
}
//  import nodemailer from "nodemailer";

// export const sendEmail = async ({ email, subject, message }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // or "smtp.mailtrap.io" / "outlook"
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Mahima Auctions" <${process.env.SMTP_HOST}>`,
//       to: email,
//       subject,
//       text: message,
//     });

//     console.log("✅ Email sent successfully to:", email);
//   } catch (error) {
//     console.error("❌ Error sending email:", error.message);
//   }
// };
