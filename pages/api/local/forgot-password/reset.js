import bcrypt from 'bcrypt';
import { log } from '../../../../utils/log';
import { connectMongo, users } from '../../../../utils/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    await connectMongo();
    const {
      body: { token, password },
    } = req;
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    const currentDate = new Date();
    let user;
    try {
      user = await users.findOneAndUpdate(
        {
          $and: [
            { resetPasswordToken: token },
            {
              resetTokenExpiration: {
                $gte: currentDate,
              },
            },
          ],
        },
        {
          $set: {
            resetPasswordToken: null,
            resetTokenExpiration: null,
            hashedPassword,
          },
        },
      );
    } catch (err) {
      log.error('Error getting user by reset password token.', {
        token,
      });
      console.error(err);
      res.status(500).end();
    }
    log.info('User password updated.', {
      user,
    });

    if (!user) {
      res.status(500).end();
    }

    res.status(200).end();
  } else {
    res.status(500).end();
  }

  return null;
};
