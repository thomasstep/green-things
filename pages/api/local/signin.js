import passport from 'passport';
import Local from 'passport-local';
import nextConnect from 'next-connect';
import { v4 } from 'uuid';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { connectMongo, users } from '../../../utils/db';
import { log } from '../../../utils';
import sendVerificationEmail from '../../../utils/sendVerificationEmail';

const authenticate = (method, req, res) => new Promise((resolve, reject) => {
  passport.authenticate(
    method,
    {
      session: false,
    },
    (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    },
  )(req, res);
});

const { JWT_SECRET } = process.env;

function validPassword(user, password) {
  return bcrypt.compareSync(password, user.hashedPassword);
}

passport.use(new Local.Strategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    let user = await users.findOne({ email });

    // Create user if they do not exist
    if (!user) {
      const salt = bcrypt.genSaltSync();
      const uuid = v4();
      const verificationToken = v4();

      const newUser = {
        uuid,
        email,
        hashedPassword: bcrypt.hashSync(password, salt),
        ownedMaps: [],
        writableMaps: [],
        readableMaps: [],
        verified: false,
        verificationToken,
      };

      try {
        await users.create(newUser);
      } catch (err) {
        log.error('Trouble creating user.', {
          email: user.email,
        });
        log.error(err);
        done(err);
      }

      try {
        await sendVerificationEmail(email, verificationToken);
      } catch (err) {
        done(err);
      }

      user = newUser;
    }

    // For a user that has previously only used OAuth providers
    if (user.uuid && !user.hashedPassword) {
      try {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);
        await users.findOneAndUpdate(
          { uuid: user.uuid },
          {
            $set: {
              hashedPassword,
            },
          },
        );
        user.hashedPassword = hashedPassword;
      } catch (err) {
        log.error('Trouble updating existing user.', {
          email: user.email,
          uuid: user.uuid,
        });
        log.error(err);
        done(err);
      }
      log.info('User updated.', {
        email: user.email,
        uuid: user.uuid,
      });
    }

    if (user && validPassword(user, password)) {
      done(null, user);
    } else {
      done(null, null);
    }
  },
));

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      await connectMongo();
      const user = await authenticate('local', req, res);
      if (!user.verified) {
        res.status(200).send({ done: true, verified: false });
      }

      const token = jwt.sign(
        { uuid: user.uuid, time: new Date() },
        JWT_SECRET,
        {
          expiresIn: '6h',
        },
      );

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          maxAge: 6 * 60 * 60,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        }),
      );

      // setTokenCookie(res, token);
      res.status(200).send({ done: true, verified: true });
    } catch (error) {
      log.error(error);
      res.status(401).send(error.message);
    }
  });
