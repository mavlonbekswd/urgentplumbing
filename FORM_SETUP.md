# Contact Form Setup Instructions

Your contact form is now ready to send messages! Follow these simple steps to activate it:

## Step 1: Get Your Email Address Ready
- Make sure you have a valid email address
- Example: `john@plumbingcompany.com`

## Step 2: Update the Form Action URL
1. Open `index.html` in a text editor
2. Find line 269 where it says:
   ```html
   <form class="contact-form" id="contactForm" action="https://formsubmit.co/YOUR_EMAIL_HERE" method="POST">
   ```
3. Replace `YOUR_EMAIL_HERE` with your actual email address
4. It should look like:
   ```html
   <form class="contact-form" id="contactForm" action="https://formsubmit.co/john@plumbingcompany.com" method="POST">
   ```

## Step 3: Update Email Display
1. Still in `index.html`, find line 253
2. Update the email address shown to customers:
   ```html
   <a href="mailto:john@plumbingcompany.com">john@plumbingcompany.com</a>
   ```

## Step 4: Test the Form
1. Upload all files to your web hosting
2. Fill out the contact form on your website
3. Submit it
4. Check your email inbox!

## How It Works
- **FormSubmit** is a free service that sends form data to your email
- No server-side code needed
- No database required
- Messages are sent instantly to your inbox

## What You'll Receive
When a customer submits the form, you'll receive an email with:
- Customer's name
- Customer's email address
- Customer's phone number
- Service they need
- Their message

## Thank You Page
A beautiful thank-you page has already been created for you! (`thank-you.html`)

- Customers will see a professional thank-you message after submitting the form
- The page matches your site's design
- Automatically redirects users instead of showing FormSubmit's default page
- Includes a "Return to Home" button

**Already configured and ready to use!**

## Troubleshooting
- **Not receiving emails?** Check your spam folder
- **Need to whitelist?** Check FormSubmit's confirmation email
- **Want more features?** Visit formsubmit.co for advanced options

## Free Alternative Email Services
If you need a free email service that works with FormSubmit:
- Gmail (gmail.com)
- Outlook (outlook.com)
- Yahoo (yahoo.com)
- Any business email

---

**Ready to go!** Once you update the email address, your contact form will be fully functional.

