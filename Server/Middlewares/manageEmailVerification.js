const nodemailer = require('nodemailer');

// Configuration values.
const service = process.env.SERVICE;
const userEmail = process.env.EMAIL;
const emailPassword = process.env.PASSWORD;

const createMailHtmlByToken = (token) => {
  return (`
    <div
      style="width: 100%;
      height: 100%;
      background: #eceff1;
      padding: 2rem;
    ">
      <p
        style="text-align: center;
        color: #37474f;
        font-size: 2rem;
        margin: 1rem 0;
      ">
        click verify button to verify your email address
      </p>
      <a
        href="http://localhost:3000/verify?_token=${token}"
        target="_blank"
        style="background-color: #009688;
        text-decoration: none;
        color: #fff;
        border-radius: 5px;
        padding: 1rem 2rem;
        font-size: 18px;
        font-weight: 600;
        width: 20%;
        margin: .5rem auto 1.5rem
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
