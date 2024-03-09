// middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface User {
  userId: string;
  username: string;
  role: 'admin' | 'user';
}

export interface AuthenticatedRequest extends Request {
    user?: User;
  }

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token)

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token using your secret key
    const decodedToken: any = jwt.verify(token, 'b84d28c2e4a251fa712dad805b5db2f7e69de6db6ad39352a88ed76470a8810e');

    // Manually create a temporary user for testing
    const tempUser: User = {
      userId: 'tempUserId',
      username: 'tempUser',
      role: decodedToken.role || 'user', // Set a default role if not present
    };
    console.log(tempUser)

    // Attach the temporary user information to the request
    req.user = tempUser;

    next();
  } catch (error) {
    return res.status(403).json({ error: 'Forbidden' });
  }
};
