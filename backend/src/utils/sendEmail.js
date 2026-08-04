const nodemailer = require('nodemailer');

const sendEmail = async ({ name, email, subject, message }) => {
  // If no email credentials configured in dev mode, log gracefully instead of failing
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'demo@example.com') {
    console.log(`[Email Simulation] New Contact Message from ${name} (${email}): "${subject}" - "${message}"`);
    return { success: true, simulated: true };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP Connected");
  } catch (err) {
    console.error("❌ SMTP Verify Error:", err);
    throw err;
  }

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
    subject: `Portfolio Contact: ${subject || 'New Message'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #0050cb; margin-bottom: 20px;">New Portfolio Contact Message</h2>
        <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <div style="background-color: #f8f9ff; padding: 15px; border-radius: 8px; font-size: 15px; line-height: 1.6;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888888;">Sent from Sohail.dev Portfolio Website</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[Email Sent] Message ID: ${info.messageId}`);
  return info;
};

module.exports = sendEmail;
