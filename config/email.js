const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = async (email, name,token) => {
    sgMail.send({
        to: email,
        from: process.env.MAIL,
        subject: 'Thanks for joining in!',
        text: `Welcome to Dev-Connector, ${name}.
        To begin, Please verify your account and enter ${token} as the verification code. You can always sign up again to generate another.
        Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.MAIL,
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}