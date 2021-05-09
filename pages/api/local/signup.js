import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

import { DEFAULT_USER_SETTINGS } from '../../../utils/constants';
import getRandomInt from '../../../utils/getRandomInt';

function signup(email, password) {
    const salt = bcrypt.genSaltSync();
    const uuid = v4();
    const verificationToken = getRandomInt();

    const newUser = {
      uuid,
      email,
      hashedPassword: bcrypt.hashSync(password, salt),
      verified: false,
      verificationToken,
      gardens: [],
      userSettings: DEFAULT_USER_SETTINGS,
    };

    try {
      await db.create(newUser);
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
}

passport.use(new Local.Strategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
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
  },
);

export default signup;
