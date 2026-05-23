# Derq Assessment

## Candidate Information
Jaskaran Singh | Software Engineer
Mobile: +1 (343) 558-3817
Email: jaskaran.s@myjobsca.com

---
## Answer to Question 4 of the assignment:
For scalability as traffic increases
1. At low traffic like 5RPS, a simple one backend server and single database is enough as long as proper indexing strategies are used for faster queries.

2. At 50RPS, we can experince the same reads for graphs and analytics, so addition of caching strategies (example redis) and running multiple instances of backend server behind a load balancer(for load distribution) would be enough.

3. At 500RPS, we can distrubute the system even more, backend server would be horizontally scaled(muliple instances with load balancing), replicas for database like read replicas for heavy read traffic.


# Setup and Execution Instructions

## With Docker

### 1. Install Docker

https://docs.docker.com/install/#supported-platforms

---

### 2. Install Docker Compose

https://docs.docker.com/compose/install/

---

### 3. Create Database

Run:

```bash
mysql -u root -p
```

Then:

```sql
CREATE DATABASE traffic_db;
```

Once created, run:

```bash
mysql -u root -p traffic_db < backup.sql
```

`backup.sql` is included in the root folder.

---

### 4. Create `.env` Files

Create `.env` files inside `/backend` and `/frontend`.

#### Backend `.env`

```env
DATABASE_URL="mysql://root:password@host.docker.internal:3306/traffic_db"
PORT=3000
```
NOTE: when running inside docker make sure your host is :   docker.internal:portnumber

#### Frontend `.env`

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Note: DB is still local in this setup (only backend and frontend are containerized).

---

### 5. Build Docker Images

```bash
docker compose build --no-cache
```

After build:

```bash
docker compose up
```

---

### 6. Application URLs

Frontend:

```bash
http://localhost:5173
```

Backend:

```bash
http://localhost:3000
```

---

### 7. Docker Logs

Open Docker Desktop to check logs.

---

# Without Docker

## Backend Setup

### 1. Create `.env` File

Inside `/backend`:

```env
DATABASE_URL="mysql://root:password@localhost:3306/traffic_db"
PORT=3000
```

---

### 2. Install Dependencies

```bash
cd backend
npm install
```

---

### 3. Create Database

Run:

```bash
mysql -u root -p
```

Then:

```sql
CREATE DATABASE traffic_db;
```

Load backup:

```bash
mysql -u root -p traffic_db < backup.sql
```

---

### 4. Start Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:3000
```

---

# Frontend Setup

### 1. Create `.env` File

Inside `/frontend`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

---

### 2. Install Dependencies

```bash
cd frontend
npm install
```

---

### 3. Start Frontend

```bash
npm run dev
```

---

### 4. Frontend URL

```bash
http://localhost:5173
```

---

# System Architecture

This project is built as a full-stack web application using a simple but scalable layered architecture. The system is split into three main parts: frontend, backend, and database.

The frontend is built using React with Vite. It is responsible only for the user interface and user interactions. It does not talk directly to the database. Instead, it sends HTTP requests to the backend API. The frontend runs independently and communicates with the backend using a base API URL defined in environment variables.

I used Zustand for statemanagement and use custom hooks for traffic data.

Since i used typescript i have to create a custom error handler as well to hanlde API errors.

In case of graphs i used MUI charts:
https://mui.com/

I didnt added any tailwind/bootstrap for CSS. instead kept everything simple using simple CSS file under `/css`.

---

The backend is built using Node.js with Express and TypeScript. It acts as the main logic layer of the system. All business logic, validation, and API handling are done here. The backend exposes REST APIs under a versioned route structure like `/api/v1`.

It connects to the database through an ORM layer (Prisma). This layer abstracts raw SQL and makes database operations safer and easier to manage.

Since i used prisma, models were autocreated. so there was no need for manunal model files.

Kept the flow simple:

```text
Server -> Controller -> service -> database
```

I added CRUD for country and traffic but i didnt used them in the frontend.

Routes can be found in the `./routes` file.

---

# Main APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/traffic/by-country` | Total traffic grouped by country |
| GET | `/api/v1/traffic/vehicle/:countryId` | Vehicle breakdown for a country |

Since only these two were used in the frontend.

---

# Database

The database is MySQL and stores all persistent application data.

In Docker setup, the database runs locally on the host machine, while in non-Docker setup it runs directly as a local service.

A `backup.sql` file is used to initialize or restore the database state.

---

# Database Entities

## Country

Each country has:

- A unique UUID as its primary identifier
- A unique country name
- Automatic timestamps for creation and updates

A country can have multiple traffic records associated with it through a one-to-many relationship with the `TrafficData` table.

---

## TrafficData

The `TrafficData` model stores vehicle traffic statistics for each country.

Each traffic record contains:

- A unique UUID
- A reference to a country
- Vehicle type information
- Vehicle count
- Date and time when the data was recorded
- Automatic timestamps for creation and updates

---

# Vehicle Types

The system uses an enum called `VehicleType` to ensure only valid vehicle categories are stored in the database.

Supported vehicle types:

- CAR
- TRUCK
- BIKE
- BUS

---

# Docker

Docker is used to containerize the frontend and backend only.

This ensures that both services run in a consistent environment regardless of the host machine.

Docker Compose manages the service orchestration and simplifies startup by running both containers together.

---


# Testing

Due to time constraints, i only added few test cases that test the business logic of the application. which in term serves the main API which is `TrafficService`.

To run tests locally:

```bash
npm test
```

The main use of this test is for the CI pipeline.

---

# CI Pipeline

I set up a CI pipeline using Git-based automation (like GitHub Actions).

The main purpose of the pipeline is to automatically validate code every time changes are pushed or a pull request is created.

The pipeline runs a few important steps:

- It first installs all dependencies to make sure the project builds correctly in a clean environment for both frontend and backend.
- After that, it runs TypeScript compilation to ensure there are no type errors.
- Finally, it runs the test suite to make sure no existing functionality is broken.

This ensures that only stable and verified code gets merged into the `main` and `develop` branches.

---

