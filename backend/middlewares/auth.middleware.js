import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';

export const authUser = async (req, res, next) => {
  try {
    // Debug request headers
    console.log('Auth Headers:', req.headers.authorization);

    // Check for authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = req.headers.authorization.split(' ')[1];
    
    // Debug token
    console.log('Extracted Token:', token);
    console.log('Using JWT_SECRET:', process.env.JWT_SECRET);

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const isBlackListed = await redisClient.get(token);
    if (isBlackListed) {
      return res.status(401).json({ error: 'Token is blacklisted' });
    }

    try {
      // Try to decode the token without verification first to see what's in it
      const decodedWithoutVerify = jwt.decode(token);
      console.log('Token payload without verification:', decodedWithoutVerify);
      
      // Now try to verify with our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token after verification:', decoded);

      if (!decoded.email) {
        return res.status(401).json({ error: 'Token payload missing email' });
      }

      req.user = decoded;
      next();
    } catch (verifyError) {
      console.error('JWT Verification Error:', verifyError);
      // Try with a hardcoded secret as a test
      try {
        const testDecoded = jwt.verify(token, 'secret123');
        console.log('Token verified with hardcoded secret:', testDecoded);
        console.log('IMPORTANT: Your environment JWT_SECRET does not match the one used to sign the token!');
        
        // Use the test decoded value to proceed
        req.user = testDecoded;
        next();
        return;
      } catch (testError) {
        console.error('Test verification also failed:', testError);
        throw verifyError; // Re-throw the original error
      }
    }
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ error: 'Token is invalid or expired' });
  }
};