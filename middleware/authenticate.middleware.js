import errors from "../utils/apiErrors.js";
import jwt from 'jsonwebtoken';
import ErrorHandler from "../utils/errorHandler.js";

const { sign, verify } = jwt;

const authenticate = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return ErrorHandler(errors.MissingAuthorizationHeader(), req, res); 
  }
  const [authType, token] = authorizationHeader.split(' ');

  if (authType.toLowerCase() !== 'bearer') {
    return ErrorHandler(errors.MissingBearerAuthorizationHeader(), req, res); 
  }

  try {
    req.user = await promisifyVerify(token, process.env.JWT_SECRET);
  } catch (error) {
    return ErrorHandler(errors.InvalidBearerToken(), req, res); 
  }
  return next();
}

const token = async (payload, additionalOption) => {
  const token = await promisifySign(
    payload,
    process.env.JWT_SECRET,
    additionalOption
  );
  return token;
}

const promisifySign = (payload, secret, options) => {
  return new Promise((resolve, reject) => {
    sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}

const promisifyVerify = async(token, secret) => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}


export default { authenticate, token };