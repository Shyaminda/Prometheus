import { NextFunction, Request, Response } from "express";
import client from "prom-client";

const activeUserGauge =  new client.Gauge({
    name: "active_users",
    help: "Total number of  requests not resolved yet",
    labelNames: ["method", "route"],
});

export const requestGaugeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    activeUserGauge.inc({
        method: req.method,
        route: req.route?.path || req.path,
    });

    res.on("finish", () => {
        setTimeout(() => {
            activeUserGauge.dec({
                method: req.method,
                route: req.route?.path || req.path,
            })
        }, 10000); // Wait for 10 seconds to decrement the active user count
    });
    next();
};