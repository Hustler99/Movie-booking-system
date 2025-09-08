import nodemailer from 'nodemailer';
export async function sendEmailAsync(receiver: string, subject: string, htmlContent: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD, 
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: receiver,
    subject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions)
    .then(info => console.log("Email sent:", info.response))
    .catch(err => console.error("Email failed:", err));
}
