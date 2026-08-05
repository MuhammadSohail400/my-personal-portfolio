const { Resend } = require('resend');

const sendEmail = async ({ name, email, subject, message }) => {
  const apiKey = process.env.RESEND_API_KEY;
  // Use Resend's default verified domain — works without custom domain verification
  const fromAddress = process.env.RESEND_FROM || 'onboarding@resend.dev';
  // Must be the email you signed up to Resend with, unless you've verified a custom domain
  const toAddress = process.env.RESEND_TO || process.env.EMAIL_RECEIVER || process.env.EMAIL_USER;

  if (!apiKey) {
    console.error('[Resend] Missing RESEND_API_KEY');
    throw new Error('Missing RESEND_API_KEY');
  }

  if (!toAddress) {
    console.error('[Resend] Missing recipient address. Set RESEND_TO or EMAIL_RECEIVER/EMAIL_USER.');
    throw new Error('Missing recipient address');
  }

  const resend = new Resend(apiKey);

  try {
    const response = await resend.emails.send({
      from: `Portfolio Contact <${fromAddress}>`,
      to: [toAddress],
      reply_to: email,
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

    if (response.error) {
      console.error('[Resend] API returned error:', JSON.stringify(response.error, null, 2));
      throw new Error(response.error.message || 'Resend API error');
    }

    console.log('[Resend] Email sent successfully:', response.data?.id);
    return response;
  } catch (error) {
    console.error('[Resend] Send failed:', error);

    if (error?.response?.data) {
      console.error('[Resend] API error payload:', JSON.stringify(error.response.data, null, 2));
    }

    throw error;
  }
};

module.exports = sendEmail;