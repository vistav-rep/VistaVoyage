const nodemailer = require('nodemailer');

// Create a more flexible transporter
const createTransporter = () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT) || 587;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  const isGmail = host.includes('gmail') || user?.includes('gmail');

  if (isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: user,
      pass: pass,
    },
  });
};

const transporter = createTransporter();

/**
 * Check if email configuration is valid
 * @returns {boolean}
 */
const isEmailConfigured = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  
  if (!user || !pass || 
      user.includes('@example.com') || 
      user === 'your_email@gmail.com' || 
      pass === 'your_app_password_here' ||
      pass === 'INSERT_YOUR_16_CHARACTER_APP_PASSWORD_HERE' ||
      pass === '1234567890123456' ||
      pass === 'vista') {
    return false;
  }
  return true;
};

const sendEmail = async (options) => {
  if (!isEmailConfigured()) {
    const errorMsg = '⚠️ Email configuration incomplete: EMAIL_USER or EMAIL_PASS not correctly configured in .env';
    console.warn(errorMsg);
    return { skipped: true, message: errorMsg };
  }

  const mailOptions = {
    from: options.from || `"VistaVoyage" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    replyTo: options.replyTo,
    attachments: options.attachments || [],
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    if (error.message.includes('535-5.7.8') || error.message.includes('BadCredentials')) {
      console.error('❌ GMAIL AUTHENTICATION ERROR: Your Gmail App Password is not accepted.');
      console.error('👉 ACTION REQUIRED: Go to https://myaccount.google.com/apppasswords and create a new 16-character App Password.');
      console.error('👉 THEN: Update EMAIL_PASS in your .env file with that password (without spaces).');
    } else {
      console.error('❌ Email Sending Error:', error.message);
    }
    throw error;
  }
};

module.exports = { sendEmail };
