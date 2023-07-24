const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
export default defineEventHandler(async (e) => {
  var msg = {
    to: 'k.fardeau123@gmail.com', // Change to your recipient
    from: 'quotegeniusfr@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  try {
    await sgMail.send(msg)
    console.log('Email sent')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
})
