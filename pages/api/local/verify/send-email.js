import { v4 } from 'uuid';
import sendVerificationEmail from '../../../../utils/sendVerificationEmail';
import { log } from '../../../../utils/log';
import { connectMongo, users } from '../../../../utils/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    await connectMongo();
    const {
      body: { email },
    } = req;
    const uuid = v4();
    try {
      await users.findOneAndUpdate(
        { email },
        {
          $set: {
            verificationToken: uuid,
          },
        },
      );
    } catch (err) {
      log.error('Error setting verification token.', {
        email,
      });
      log.error(err);
      res.status(500).end();
    }

    try {
      await sendVerificationEmail(email, uuid);
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }

    res.status(200).end();
  } else {
    res.status(200).end();
  }

  return null;
};
