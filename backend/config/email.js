import nodemailer from 'nodemailer';

const getTransporter = () => nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendResetEmail = async (to, resetUrl) => {
  try {
    await getTransporter().sendMail({
      from: `"GreenCart" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'GreenCart Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #2d6a4f;">Password Reset Request</h2>
          <p>You requested a password reset for your GreenCart account.</p>
          <p>Click the button below to set a new password. This link expires in 1 hour.</p>
          <a href="${resetUrl}"
             style="display: inline-block; background: #2d6a4f; color: #fff; text-decoration: none;
                    padding: 12px 28px; border-radius: 8px; margin: 16px 0;">
            Reset Password
          </a>
          <p style="color: #888; font-size: 13px;">
            If you didn't request this, please ignore this email. Your password won't change.
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Nodemailer error:', err.message);
    throw err;
  }
};
