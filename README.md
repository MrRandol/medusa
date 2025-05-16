# Medusa Media Manager

A media management system designed to be self hosted.

## Architecture

This project consists of two main components:
- **Backend**: Spring Boot Java API (`medusa-api/`)
- **Frontend**: Vue.js SPA (`medusa-front/`)

## Setup

### Database Setup

Simply have a Postgres database ready with 
- database with same name as config (default: medusa)
- same user as in config (default: medusa_user/medusa_pass)

### Backend Setup

```Environment variables
# Database connection
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/medusa?currentSchema=medusa
SPRING_DATASOURCE_USERNAME=medusa_user
SPRING_DATASOURCE_PASSWORD=medusa_pass

# File storage
FILE_UPLOAD_DIR=./uploads
FILE_MAX_SIZE_BYTES=104857600

# Server config
SERVER_PORT=8080

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Logging
LOG_LEVEL_ROOT=INFO
LOG_LEVEL_APP=DEBUG
LOG_FILE_PATH=logs/medusa.log
LOG_MAX_SIZE=10MB
LOG_RETENTION_DAYS=7

# Flyway
FLYWAY_BASELINE_ON_MIGRATE=true
FLYWAY_ENABLED=true

# File upload limits
MAX_FILE_SIZE=100MB
MAX_REQUEST_SIZE=100MB
```

#### Run
```bash
cd medusa-api
mvn clean install
mvn spring-boot:run
```

### Frontend Setup

```properties
# Dev server config
VITE_DEV_SERVER_PORT=5173
VITE_DEV_SERVER_HOST=localhost

# Medusa API endpoint
VITE_API_URL=http://localhost:8080 
```

#### Run
```bash
cd medusa-front
npm install
npm run dev
```