/**
 * Mail Service – Nodemailer-based email sender.
 * Configure SMTP credentials in .env to enable real email delivery.
 */

const sendEmail = async ({ to, subject, text, html }) => {
  // If nodemailer is installed, use real SMTP:
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransporter({
  //   host: process.env.MAIL_HOST,
  //   port: process.env.MAIL_PORT,
  //   auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  // });
  // await transporter.sendMail({ from: process.env.MAIL_FROM, to, subject, text, html });

  // Placeholder: log email to console
  console.log('📧 [Mail Service] Email would be sent:');
  console.log(`  To: ${to}`);
  console.log(`  Subject: ${subject}`);
  console.log(`  Body: ${text || html}`);
};

const sendWelcomeEmail = async (userEmail, userName) => {
  await sendEmail({
    to: userEmail,
    subject: 'Welcome to AI Interview Prep!',
    text: `Hi ${userName},\n\nWelcome to AI Interview Preparation Platform! Start practicing today and land your dream job.\n\nGood luck!\nThe AI Interview Team`,
  });
};

const sendPasswordResetEmail = async (userEmail, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  await sendEmail({
    to: userEmail,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link below:\n${resetUrl}\n\nThis link expires in 1 hour. If you did not request this, please ignore this email.`,
  });
};

module.exports = { sendEmail, sendWelcomeEmail, sendPasswordResetEmail };
