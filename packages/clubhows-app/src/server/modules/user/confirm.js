import jwt from 'jsonwebtoken';
import log from '../../../common/log';

export default (SECRET, User, jwt2) => async (req, res) => {
  log('confirm 5: ', SECRET, User, jwt2);
  try {
    const token = Buffer.from(req.params.token, 'base64').toString();
    log('confirm 8: ', token);
    jwt.verify(token, SECRET, async (err, decoded) => {
      log('confirm 10: ', err, decoded);
      const { user: { _id } } = decoded;
      log('confirm 15: ', _id);

      return await User.updateActive(_id, true);
    });
  } catch (e) {
    return res.send('error');
  }

  return res.redirect('/login');
};
