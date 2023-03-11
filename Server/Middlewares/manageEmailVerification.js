const nodemailer = require('nodemailer');

// Configuration values.
const service = process.env.SERVICE;
const userEmail = process.env.EMAIL;
const emailPassword = process.env.PASSWORD;

const sendMail = async (receiver, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service,
      port: 587,
      secure: true,
      auth: {
        user: userEmail,
        pass: emailPassword
      }
    });

    const info = await transporter.sendMail({
      from: userEmail,
      to: receiver,
      subject,
      html
    });
    // console.log('Message sent successfully, Message ID:', info.messageId);
  }
  catch(error) {
    console.log(error);
    throw Error('Internal Server Error, Unable to send the mail.');
  }
}

module.exports = sendMail;
