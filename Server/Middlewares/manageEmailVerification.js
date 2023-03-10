const nodemailer = require('nodemailer');

// Configuration values.
const service = process.env.SERVICE;
const userEmail = process.env.EMAIL;
const emailPassword = process.env.PASSWORD;

const createMailHtmlByToken = (token, username) => {
  return (`
    <div
      style="background: #eceff1;
      padding: 2rem;
    ">
      <h2
        style="color: #37474f;
        text-align: center;
      ">
        Welcome ${username}, verify your email account to start enjoying your FoodFlame Recipes 🍽.
      </h2>
      <a
        href="http://localhost:3000/verify?_token=${token}"
        target="_blank"
        style="display: block;
        background-color: #009688;
        text-decoration: none;
        color: #fff;
        border-radius: 5px;
        padding: 1rem;
        font-size: 18px;
        font-weight: 600;
        width: 7.8rem;
        margin: 1.5rem auto;
      ">
        Click To Verify
      </a>
    </div>
  `);
}

const sendMail = async (receiver, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service,
      port: 587,
      secure: false,
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

module.exports = {
  sendMail,
  createMailHtmlByToken
};
