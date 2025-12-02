const nodemailer = require('nodemailer');

// Create transporter for Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password, not regular password
    },
  });
};

// Send verification email
const sendVerificationEmail = async (email, token, name) => {
  const transporter = createTransporter();

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const mailOptions = {
    from: `"Cocktails App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🍸 Welcome to Cocktails App!</h1>
            </div>
            <div class="content">
              <p>Hi ${name || 'there'},</p>
              <p>Thank you for registering with Cocktails App! To complete your registration, please verify your email address by clicking the button below:</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
              <p><strong>This link will expire in 24 hours.</strong></p>
              <p>If you didn't create an account with Cocktails App, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Cocktails App. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to Cocktails App!
      
      Hi ${name || 'there'},
      
      Thank you for registering! To complete your registration, please verify your email address by visiting:
      
      ${verificationUrl}
      
      This link will expire in 24 hours.
      
      If you didn't create an account, you can safely ignore this email.
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending verification email:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Response:', error.response);

    // Provide helpful error messages
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      console.error('\n⚠️  Gmail Authentication Failed!');
      console.error('Please check:');
      console.error('1. EMAIL_USER matches your Gmail address');
      console.error('2. EMAIL_PASS is your App Password (16 chars, NO spaces)');
      console.error('3. 2-Step Verification is enabled on your Google account');
      console.error('4. App Password was generated for this Gmail account\n');
    }

    throw error; // Re-throw to be caught by controller
  }
};

module.exports = {
  sendVerificationEmail,
};
