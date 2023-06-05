import { createTransport } from 'nodemailer';

// Configuration values.
const service = process.env.SERVICE ;
const userEmail = process.env.EMAIL;
const emailPassword = process.env.PASSWORD;

if(!service || !userEmail || !emailPassword) {
  console.error('Authors info is missing for sending a mail.');
  process.exit(1);
}

const sendMail = async (
  receiver: string, 
  subject: string, 
  html: string
): Promise<void> => {
  try {
    const transporter = createTransport({
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
    console.error(error);
    throw Error('Internal Server Error, Unable to send the mail.');
  }
}

export default sendMail;
