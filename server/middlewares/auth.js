import jwt from 'jsonwebtoken';

async function verifyAuth(req, res, next) {
  try {
    let token = req.headers.authorization || '';

    if (!token) {
      return res.status(401).json({ message: 'Необходимо войти в аккаунт или зарегистрироваться' });
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }
    const decodedTokenData = jwt.verify(token, process.env.JWS_SECRET);
    req.userId = decodedTokenData._id;
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export default verifyAuth;
