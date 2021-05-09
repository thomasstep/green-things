import { v4 } from 'uuid';
import sgMail from '@sendgrid/mail';
import { log } from '../../../../utils/log';
import { connectMongo, users } from '../../../../utils/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    await connectMongo();
    const {
      body: { email },
    } = req;
    const uuid = v4();
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);
    try {
      await users.findOneAndUpdate(
        { email },
        {
          $set: {
            resetPasswordToken: uuid,
            resetTokenExpiration,
          },
        },
      );
    } catch (err) {
      log.error('Error setting reset password token and expiration.', {
        email,
      });
      log.error(err);
      res.status(500).end();
    }

    const resetUrl = `${process.env.SITE}/forgot-password/${uuid}`;
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Reset Password',
      text: 'A password request has been requested for your account. Click or copy and paste the following link to reset your password.',
      html: `<a href=${resetUrl}>${resetUrl}</a>`,
    };
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    try {
      await sgMail.send(msg);
    } catch (err) {
      log.error('There was an error with SendGrid while sending email.');
      console.error(err);
      res.status(500).end();
    }

    res.status(200).end();
  } else {
    res.status(200).end();
  }

  return null;
};
