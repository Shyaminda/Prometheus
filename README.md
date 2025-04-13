# 📈 Prometheus Metrics Monitoring with Grafana

This project demonstrates how to monitor a Node.js application using Prometheus and visualize the collected metrics using Grafana. It utilizes `prom-client` to define custom metrics and exposes them via a `/metrics` endpoint. Prometheus scrapes these metrics periodically, while Grafana provides an intuitive UI to visualize and analyze the data.

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Project

To build and start all services:

```bash
docker-compose up --build
```

### Access Points
- **Node.js App Metrics**: [http://localhost:3000/metrics](http://localhost:3000/metrics)
- **Prometheus Dashboard**: [http://localhost:9090](http://localhost:9090)
- **Grafana Dashboard**: [http://localhost:3001](http://localhost:3001)
  - **Username**: `admin`
  - **Password**: `admin`

---

## 🛠 Tech Stack

- **Node.js** – Runtime environment
- **Express** – Web framework
- **TypeScript** – Type-safe JavaScript
- **Prometheus** – Metrics collection and alerting toolkit
- **prom-client** – Node.js client for Prometheus
- **express-prom-bundle** – Middleware for capturing default Prometheus metrics
- **Grafana** – Metrics visualization platform
- **Docker & Docker Compose** – Containerization and orchestration

---

## 📊 Metrics Overview

### 1. `http_requests_total` (Counter)
Tracks the total number of HTTP requests.
- **Labels**: `method`, `route`, `status_code`

### 2. `http_request_duration_ms` (Histogram)
Measures the duration of HTTP requests.
- **Labels**: `method`, `route`, `code`
- **Buckets**: `[0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000]` (milliseconds)

### 3. `active_users` (Gauge)
Tracks the number of ongoing HTTP requests (not yet completed).
- **Labels**: `method`, `route`

---

## 🧪 Prometheus Configuration

### `prometheus.yml`
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'nodejs-app'
    static_configs:
      - targets: ['node-app:3000']
```

> Ensure that `node-app` matches the service name defined in your `docker-compose.yml`.

### Example Prometheus Queries
- `http_requests_total` – Total number of requests
- `http_request_duration_ms_bucket` – Request duration buckets
- `http_request_duration_ms_sum` – Sum of request durations
- `http_request_duration_ms_count` – Count of request durations
- `active_users` – Real-time concurrent request tracking

---

## 🔐 Security Consideration

By default, the `/metrics` endpoint is publicly accessible. If deploying this system to production (e.g., on `your-website.com`), consider securing the metrics endpoint by:
- Restricting access to specific IPs using a reverse proxy (e.g., NGINX)
- Adding basic authentication
- Exposing metrics internally only (not via public routes)

---

