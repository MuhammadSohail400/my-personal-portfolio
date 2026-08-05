const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection once when this module loads (helpful for debugging)
transporter.verify((error) => {
  if (error) {
    console.error('❌ [Nodemailer] SMTP connection failed:', error);
  } else {
    console.log('✅ [Nodemailer] SMTP server ready to send emails');
  }
});

const sendEmail = async ({ name, email, subject, message }) => {
  const gmailUser = process.env.EMAIL_USER;
  const toAddress = process.env.EMAIL_RECEIVER || gmailUser;

  if (!gmailUser || !process.env.EMAIL_PASS) {
    console.error('[Nodemailer] Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env');
    throw new Error('Missing Gmail SMTP credentials');
  }

  if (!toAddress) {
    console.error('[Nodemailer] Missing recipient address. Set EMAIL_RECEIVER or GMAIL_USER.');
    throw new Error('Missing recipient address');
  }

  try {
    const info = await transporter.sendMail({
      // Gmail SMTP requires "from" to be your own authenticated Gmail address
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: toAddress,
      replyTo: email, // lets you hit "Reply" and go straight to the sender
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
    });

    console.log('✅ [Nodemailer] Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('[Nodemailer] Send failed:', error);
    throw error;
  }
};

module.exports = sendEmail;