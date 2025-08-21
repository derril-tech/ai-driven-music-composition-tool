# Deployment Infrastructure - AriaForge

This document outlines the comprehensive deployment infrastructure for AriaForge, ensuring scalable, reliable, and secure production deployment.

## 🎯 Infrastructure Overview

### Architecture Components
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   AI Services   │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│   (LangGraph)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN/Edge      │    │   Load Balancer │    │   Audio Render  │
│   (Vercel)      │    │   (Nginx)       │    │   (FFmpeg)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PostgreSQL    │    │   Redis Cache   │    │   Object Storage│
│   (pgvector)    │    │   (Streams)     │    │   (S3/GCS)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Deployment Environments
1. **Development** - Local development environment
2. **Staging** - Pre-production testing environment
3. **Production** - Live production environment
4. **Testing** - Automated testing environment

## 🚀 Deployment Strategies

### 1. Frontend Deployment (Vercel)

#### Vercel Configuration
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "@ariaforge-api-url",
    "NEXT_PUBLIC_WS_URL": "@ariaforge-ws-url",
    "NEXT_PUBLIC_APP_URL": "@ariaforge-app-url"
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

#### Environment Variables
```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.ariaforge.com
NEXT_PUBLIC_WS_URL=wss://api.ariaforge.com
NEXT_PUBLIC_APP_URL=https://ariaforge.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

#### Build Configuration
```json
// package.json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "vercel-build": "next build && next export"
  }
}
```

### 2. Backend Deployment (Docker + Kubernetes)

#### Docker Configuration
```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsndfile1 \
    libportaudio2 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash ariaforge && \
    chown -R ariaforge:ariaforge /app
USER ariaforge

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Start application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

#### Docker Compose (Development)
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
      - NEXT_PUBLIC_WS_URL=ws://localhost:8000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://ariaforge:password@postgres:5432/ariaforge
      - REDIS_URL=redis://redis:6379
      - SECRET_KEY=${SECRET_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=ariaforge
      - POSTGRES_USER=ariaforge
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
```

### 3. Kubernetes Deployment (Production)

#### Namespace Configuration
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ariaforge
  labels:
    name: ariaforge
```

#### ConfigMap and Secrets
```yaml
# k8s/config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ariaforge-config
  namespace: ariaforge
data:
  DATABASE_URL: "postgresql://ariaforge:${DB_PASSWORD}@postgres-service:5432/ariaforge"
  REDIS_URL: "redis://redis-service:6379"
  ENVIRONMENT: "production"
  LOG_LEVEL: "INFO"

---
apiVersion: v1
kind: Secret
metadata:
  name: ariaforge-secrets
  namespace: ariaforge
type: Opaque
data:
  SECRET_KEY: ${BASE64_ENCODED_SECRET_KEY}
  OPENAI_API_KEY: ${BASE64_ENCODED_OPENAI_KEY}
  ANTHROPIC_API_KEY: ${BASE64_ENCODED_ANTHROPIC_KEY}
  DB_PASSWORD: ${BASE64_ENCODED_DB_PASSWORD}
```

#### Backend Deployment
```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ariaforge-backend
  namespace: ariaforge
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ariaforge-backend
  template:
    metadata:
      labels:
        app: ariaforge-backend
    spec:
      containers:
      - name: backend
        image: ariaforge/backend:latest
        ports:
        - containerPort: 8000
        envFrom:
        - configMapRef:
            name: ariaforge-config
        - secretRef:
            name: ariaforge-secrets
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
        volumeMounts:
        - name: audio-storage
          mountPath: /app/audio
      volumes:
      - name: audio-storage
        persistentVolumeClaim:
          claimName: audio-storage-pvc

---
apiVersion: v1
kind: Service
metadata:
  name: ariaforge-backend-service
  namespace: ariaforge
spec:
  selector:
    app: ariaforge-backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: ClusterIP
```

#### Database Deployment
```yaml
# k8s/postgres-deployment.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: ariaforge
spec:
  serviceName: postgres-service
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_DB
          value: ariaforge
        - name: POSTGRES_USER
          value: ariaforge
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: ariaforge-secrets
              key: DB_PASSWORD
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 100Gi

---
apiVersion: v1
kind: Service
metadata:
  name: postgres-service
  namespace: ariaforge
spec:
  selector:
    app: postgres
  ports:
  - protocol: TCP
    port: 5432
    targetPort: 5432
  type: ClusterIP
```

#### Redis Deployment
```yaml
# k8s/redis-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: ariaforge
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:6-alpine
        ports:
        - containerPort: 6379
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "200m"
        volumeMounts:
        - name: redis-storage
          mountPath: /data
      volumes:
      - name: redis-storage
        persistentVolumeClaim:
          claimName: redis-storage-pvc

---
apiVersion: v1
kind: Service
metadata:
  name: redis-service
  namespace: ariaforge
spec:
  selector:
    app: redis
  ports:
  - protocol: TCP
    port: 6379
    targetPort: 6379
  type: ClusterIP
```

#### Ingress Configuration
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ariaforge-ingress
  namespace: ariaforge
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - api.ariaforge.com
    - ariaforge.com
    secretName: ariaforge-tls
  rules:
  - host: api.ariaforge.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ariaforge-backend-service
            port:
              number: 80
  - host: ariaforge.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ariaforge-frontend-service
            port:
              number: 80
```

## 🔧 CI/CD Pipeline

### GitHub Actions Deployment
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm test
          pytest backend/tests/
      - name: Run security scan
        run: |
          npm audit
          bandit -r backend/

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - name: Build and push backend
        uses: docker/build-push-action@v4
        with:
          context: ./backend
          push: true
          tags: ariaforge/backend:latest,ariaforge/backend:${{ github.sha }}
      - name: Build and push frontend
        uses: docker/build-push-action@v4
        with:
          context: ./frontend
          push: true
          tags: ariaforge/frontend:latest,ariaforge/frontend:${{ github.sha }}

  deploy-staging:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to staging
        run: |
          kubectl config use-context staging-cluster
          kubectl apply -f k8s/
          kubectl rollout restart deployment/ariaforge-backend -n ariaforge

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          kubectl config use-context production-cluster
          kubectl apply -f k8s/
          kubectl rollout restart deployment/ariaforge-backend -n ariaforge
```

### Vercel Deployment
```yaml
# .github/workflows/vercel-deploy.yml
name: Deploy Frontend to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 📊 Monitoring and Observability

### Prometheus Configuration
```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'ariaforge-backend'
    static_configs:
      - targets: ['ariaforge-backend-service:8000']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-service:5432']
    metrics_path: '/metrics'

  - job_name: 'redis'
    static_configs:
      - targets: ['redis-service:6379']
    metrics_path: '/metrics'
```

### Grafana Dashboards
```json
// monitoring/dashboards/ariaforge-overview.json
{
  "dashboard": {
    "title": "AriaForge Overview",
    "panels": [
      {
        "title": "API Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ]
      },
      {
        "title": "Active Users",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(websocket_connections_active)",
            "legendFormat": "Active Connections"
          }
        ]
      },
      {
        "title": "Audio Processing Queue",
        "type": "graph",
        "targets": [
          {
            "expr": "audio_processing_queue_size",
            "legendFormat": "Queue Size"
          }
        ]
      }
    ]
  }
}
```

### Application Metrics
```python
# backend/app/core/metrics.py
from prometheus_client import Counter, Histogram, Gauge
import time

# Request metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint', 'status'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration')

# Business metrics
COMPOSITION_CREATED = Counter('compositions_created_total', 'Total compositions created')
AUDIO_PROCESSING_TIME = Histogram('audio_processing_duration_seconds', 'Audio processing duration')
ACTIVE_SESSIONS = Gauge('active_sessions', 'Number of active collaboration sessions')

# Music-specific metrics
MUSIC_THEORY_VALIDATIONS = Counter('music_theory_validations_total', 'Music theory validations')
AUDIO_QUALITY_SCORE = Histogram('audio_quality_score', 'Audio quality assessment scores')

def track_request_metrics(method: str, endpoint: str, status: int, duration: float):
    REQUEST_COUNT.labels(method=method, endpoint=endpoint, status=status).inc()
    REQUEST_DURATION.observe(duration)

def track_composition_creation():
    COMPOSITION_CREATED.inc()

def track_audio_processing(duration: float):
    AUDIO_PROCESSING_TIME.observe(duration)

def update_active_sessions(count: int):
    ACTIVE_SESSIONS.set(count)
```

## 🔒 Security Configuration

### SSL/TLS Configuration
```nginx
# nginx/ssl.conf
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
ssl_stapling on;
ssl_stapling_verify on;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options DENY always;
add_header X-Content-Type-Options nosniff always;
add_header X-XSS-Protection "1; mode=block" always;
```

### Security Headers
```python
# backend/app/core/security.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

def configure_security(app: FastAPI):
    # CORS configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["https://ariaforge.com"],
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE"],
        allow_headers=["*"],
    )
    
    # Trusted host middleware
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["ariaforge.com", "api.ariaforge.com"]
    )
    
    # Security headers
    @app.middleware("http")
    async def add_security_headers(request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        return response
```

## 📈 Scaling and Performance

### Horizontal Pod Autoscaler
```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ariaforge-backend-hpa
  namespace: ariaforge
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ariaforge-backend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### Database Scaling
```yaml
# k8s/postgres-hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: postgres-hpa
  namespace: ariaforge
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: postgres
  minReplicas: 1
  maxReplicas: 3
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 60
```

## 🚨 Backup and Disaster Recovery

### Database Backup
```yaml
# k8s/backup-cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: postgres-backup
  namespace: ariaforge
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: postgres:15
            command:
            - /bin/bash
            - -c
            - |
              pg_dump -h postgres-service -U ariaforge -d ariaforge | gzip > /backup/ariaforge-$(date +%Y%m%d).sql.gz
            env:
            - name: PGPASSWORD
              valueFrom:
                secretKeyRef:
                  name: ariaforge-secrets
                  key: DB_PASSWORD
            volumeMounts:
            - name: backup-storage
              mountPath: /backup
          volumes:
          - name: backup-storage
            persistentVolumeClaim:
              claimName: backup-storage-pvc
          restartPolicy: OnFailure
```

### Disaster Recovery Plan
```markdown
# Disaster Recovery Procedures

## Database Recovery
1. Stop application services
2. Restore from latest backup
3. Run database migrations
4. Verify data integrity
5. Restart application services

## Application Recovery
1. Scale down to minimum replicas
2. Verify health checks
3. Gradually scale up
4. Monitor performance metrics

## Full System Recovery
1. Restore infrastructure from IaC
2. Restore database from backup
3. Deploy application from container registry
4. Verify all services are healthy
5. Run smoke tests
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] SSL certificates valid
- [ ] Monitoring configured

### Deployment
- [ ] Deploy to staging environment
- [ ] Run integration tests
- [ ] Performance testing
- [ ] Security validation
- [ ] User acceptance testing
- [ ] Deploy to production
- [ ] Monitor deployment
- [ ] Verify functionality

### Post-Deployment
- [ ] Monitor application metrics
- [ ] Check error rates
- [ ] Verify performance
- [ ] Test backup procedures
- [ ] Update documentation
- [ ] Notify stakeholders

---

**This deployment infrastructure ensures scalable, reliable, and secure production deployment for AriaForge with comprehensive monitoring, security, and disaster recovery capabilities.**
