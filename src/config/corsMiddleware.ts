import { Request, Response, NextFunction } from 'express';
import allowedOrigins from './allowedOrigins';
// Define an array of allowed origins

// Middleware function to handle CORS
function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  const origin : string = req.get('origin') as string;

  // Check if the request origin is in the allowed origins list
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.sendStatus(204); // No content for preflight requests
  } else {
    next(); // Continue processing the request
  }
}

export default corsMiddleware;
