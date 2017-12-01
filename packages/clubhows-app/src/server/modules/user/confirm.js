export default (SECRET, User, jwt) => async (req, res) => {
  try {
    const token = Buffer.from(req.params.token, 'base64').toString();
    jwt.verify(token, SECRET, async (err, decoded) => {
      const { user: { _id } } = decoded;

      return await User.updateActive(_id, true);
    });
  } catch (e) {
    return res.send('error');
  }

  return res.redirect('/login');
};
