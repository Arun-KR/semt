# Local Development Setup

## Prerequisites

- Node.js 18+
- MongoDB installed locally OR Docker

## Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB:

   ```bash
   # Windows (if installed as service)
   net start MongoDB

   # OR start manually
   mongod --dbpath C:\data\db
   ```

3. Copy environment variables:

   ```bash
   cd backend
   cp .env.example .env
   ```

4. Edit `.env`:

   ```
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/semt
   NODE_ENV=development
   JWT_SECRET=dev_secret
   ```

5. Start backend:

   ```bash
   npm install
   npm run dev
   ```

6. Start frontend (in another terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Option 2: Docker Compose

1. Make sure Docker is running
2. Start all services:
   ```bash
   docker-compose up
   ```

This will start:

- Frontend on http://localhost:5173
- Backend on http://localhost:4000
- MongoDB on localhost:27017

## Testing

- Access frontend: http://localhost:5173
- Test backend health: http://localhost:4000/health
- Test backend readiness: http://localhost:4000/ready

---

# Azure Deployment

## Setup Azure Resources

### 1. Create Azure Container Registry

```bash
az acr create --resource-group semt-rg --name semtregistry --sku Basic
az acr login --name semtregistry
```

### 2. Create Cosmos DB (MongoDB API)

```bash
az cosmosdb create \
  --name semt-cosmos \
  --resource-group semt-rg \
  --kind MongoDB \
  --server-version 4.2 \
  --locations regionName=eastus
```

### 3. Get Connection String

```bash
az cosmosdb keys list --name semt-cosmos --resource-group semt-rg --type connection-strings
```

### 4. Set Environment Variables in Azure

In Azure Portal → Container App → Environment variables:

- `PORT`: 4000
- `NODE_ENV`: production
- `MONGO_URI`: (paste connection string from step 3)
- `JWT_SECRET`: (generate secure random string)

## Deploy to Azure

### Build and Push Images

```bash
# Backend
cd backend
docker build -t semtregistry.azurecr.io/semt-backend:latest .
docker push semtregistry.azurecr.io/semt-backend:latest

# Frontend
cd ../frontend
docker build -t semtregistry.azurecr.io/semt-frontend:latest .
docker push semtregistry.azurecr.io/semt-frontend:latest
```

### Create Container Apps

```bash
# Backend
az containerapp create \
  --name semt-backend \
  --resource-group semt-rg \
  --environment semt-env \
  --image semtregistry.azurecr.io/semt-backend:latest \
  --target-port 4000 \
  --ingress external \
  --registry-server semtregistry.azurecr.io \
  --env-vars \
    PORT=4000 \
    NODE_ENV=production \
    MONGO_URI=<cosmos-connection-string> \
    JWT_SECRET=<secure-secret>

# Frontend
az containerapp create \
  --name semt-frontend \
  --resource-group semt-rg \
  --environment semt-env \
  --image semtregistry.azurecr.io/semt-frontend:latest \
  --target-port 80 \
  --ingress external \
  --registry-server semtregistry.azurecr.io \
  --env-vars VITE_API_BASE_URL=https://<backend-app-url>
```

## Configuration Summary

| Environment    | MONGO_URI                        | NODE_ENV    | Where to Set          |
| -------------- | -------------------------------- | ----------- | --------------------- |
| Local Dev      | `mongodb://localhost:27017/semt` | development | `.env` file           |
| Docker Compose | `mongodb://mongo:27017/semt`     | development | `docker-compose.yml`  |
| Azure          | Cosmos DB connection string      | production  | Azure Portal env vars |

## Key Features

- ✅ Stateless backend (scales horizontally)
- ✅ Health checks for Azure monitoring
- ✅ Automatic MongoDB retry logic
- ✅ Graceful degradation if DB unavailable
- ✅ CORS enabled for frontend communication
