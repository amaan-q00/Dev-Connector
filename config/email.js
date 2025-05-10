  const sgMail = require("@sendgrid/mail");

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const sendWelcomeEmail = async (email, name, token) => {
    return true;
    sgMail.send({
      to: email,
      from: process.env.MAIL,
      subject: "Thanks for joining in!",
      text: `Welcome to Dev-Connector, ${name}.
          To begin, Please verify your account and enter ${token} as the verification code. You can always sign up again to generate another.
          Let us know how you get along with the app.`,
    });
  };

  const sendCancelationEmail = (email, name) => {
    return true;
    sgMail.send({
      to: email,
      from: process.env.MAIL,
      subject: "Sorry to see you go!",
      text: `Goodbye, ${name}. We hope to see you back sometime soon.`,
    });
  };
  const sendForgetEmail = async (email, name, token) => {
    return true;
    sgMail.send({
      to: email,
      from: process.env.MAIL,
      subject: "Reset Your Password",
      text: `Hello, ${name}.
          We have recieved a password reset request from ${email}. If this was not you,report this activity at ${process.env.MAIL}.
          You can goto Reset Password Tab and enter the following token: ${token}`,
    });
  };

  module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
    sendForgetEmail,
  };
