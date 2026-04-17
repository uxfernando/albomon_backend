import { Request, Response, NextFunction } from 'express';
import { logger } from '@/infrastructure/utils/logger';

export const errorLogger = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error({
        method: req.method,
        url: req.originalUrl,
        status: err.status || res.statusCode || 500,
        message: err.message,
        stack: err.stack,
    });

    next(err);
};
