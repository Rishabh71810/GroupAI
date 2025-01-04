import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';

export const authUser = async (req, res, next) => {
  try {
    // Debug request headers
   // console.log('Auth Headers:', req.headers.authorization);

    // Check for authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = req.headers.authorization.split(' ')[1];
    
    // Debug token
    //console.log('Extracted Token:', token);

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const isBlackListed = await redisClient.get(token);
    if (isBlackListed) {
      return res.status(401).json({ error: 'Token is blacklisted' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('Decoded Token:', decoded); // Debug decoded token

    if (!decoded.email) {
      return res.status(401).json({ error: 'Token payload missing email' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ error: 'Token is invalid or expired' });
  }
};