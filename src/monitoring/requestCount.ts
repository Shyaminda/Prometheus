import { NextFunction, Request, Response } from "express";
import client from "prom-client";

const requestCount =  new client.Counter({
    name: "http_requests_total",
    help: "Total number of  requests",
    labelNames: ["method", "route", "status_code"],
});

export const requestCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on("finish", () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);

        requestCount.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status_code: res.statusCode.toString(),
        })
    });
    next();
};