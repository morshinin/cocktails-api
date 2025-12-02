# Gmail App Password Setup Guide

To use Gmail with Nodemailer, you need to create an App Password. Follow these steps:

## Prerequisites
- Gmail account with 2-Step Verification enabled

## Steps

### 1. Enable 2-Step Verification (if not already enabled)
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the prompts to set it up

### 2. Create App Password
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "App passwords"
   - If you don't see this option, make sure 2-Step Verification is enabled
4. At the bottom, click "Select app" and choose "Mail"
5. Click "Select device" and choose "Other (Custom name)"
6. Enter "Cocktails App" or any name you prefer
7. Click "Generate"
8. **Copy the 16-character password** (it will look like: `xxxx xxxx xxxx xxxx`)

### 3. Add to .env file
Add these variables to your `.env` file in the `cocktails-api` directory:

```env
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
FRONTEND_URL=http://localhost:5173
```

**Important:**
- Use the App Password (16 characters), NOT your regular Gmail password
- Remove spaces from the App Password when pasting into .env
- Keep this password secret and never commit it to git

### 4. Restart your API server
After adding the environment variables, restart your Node.js server:
```bash
cd cocktails-api
# Stop the current server (Ctrl+C)
node server.js
```

## Testing
Once configured, you can test by:
1. Registering a new user
2. Checking your email for the verification link
3. Clicking the link to verify

## Troubleshooting

**"Invalid login" error:**
- Make sure 2-Step Verification is enabled
- Regenerate the App Password
- Check that EMAIL_USER matches the Gmail account

**No email received:**
- Check spam folder
- Verify EMAIL_USER and EMAIL_PASS are correct
- Check server logs for errors

**"Less secure app access" message:**
- This is outdated - use App Passwords instead
- App Passwords are the secure way to use Gmail with third-party apps
