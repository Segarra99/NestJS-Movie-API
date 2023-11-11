import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Log request method, URL, and headers
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);

    // Log query parameters
    console.log('Query Params:', req.query);

    // Log request body for POST and PUT requests
    if (req.method === 'POST' || req.method === 'PUT') {
      console.log('Request Body:', req.body);
    }

    // Attach additional data to res.locals
    res.locals.startTime = Date.now();

    // Continue with the request handling
    next();

    // Log response status code and execution time
    console.log(`[${new Date().toISOString()}] Response Status Code: ${res.statusCode}`);
    console.log(`[${new Date().toISOString()}] Execution Time: ${Date.now() - res.locals.startTime}ms`);
  }
}
