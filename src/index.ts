import express from "express";
import express_prom_bundle from "express-prom-bundle";
import { requestCountMiddleware } from "./monitoring/requestCount";
import client from "prom-client";
import { requestGaugeMiddleware } from "./monitoring/activeRequestCount";
import { requestHistogram } from "./monitoring/histogram";

const app = express();

app.use(requestCountMiddleware)
app.use(requestGaugeMiddleware)
app.use(requestHistogram)

// const metricsMiddleware = express_prom_bundle({includeMethod: true});
// app.use(metricsMiddleware);

app.use(express.json());

app.get("/user", (req, res) => {
    res.send({
        name: "John Doe",
        age: 25,
    });
});

app.post("/user", (req, res) => {
    const user = req.body;
    res.send({
        ...user,
        id: 1,
    });
});

app.put("/user/:id", (req, res) => {
    const user = req.body;
    const id = req.params.id;
    res.send({
        ...user,
        id,
    });
});

app.get("/product", (req, res) => {
    res.send({
        name: "Mac book pro",
        type: "laptop",
    });
});

app.post("/product", (req, res) => {
    const product = req.body;
    res.send({
        ...product,
        id: 1,
    });
});

app.get("/metrics", async (req, res) => {  // This is the endpoint for Prometheus to scrape metrics
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});