import { Request, Response, NextFunction } from "express";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);
export const sanitizeMiddleware = (req: Request, _res: Response, next: NextFunction):void => {
    const sanitize = (obj: any):void => {
        if (!obj || typeof obj !== "object") return;
        for (const key in obj) {
            if (typeof obj[key] === "string") obj[key] = DOMPurify.sanitize(obj[key]);
            else if (typeof obj[key] === "object") sanitize(obj[key]);
            if (key.startsWith("$")) delete obj[key];
        }
    };
    sanitize(req.body);
    next();
};
