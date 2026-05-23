## With Docker:

1. Install Docker
   [https://docs.docker.com/install/#supported-platforms](https://docs.docker.com/install/#supported-platforms)

2. Install Docker Compose
   [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

3. Create a database called `traffic_db`:
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

   (backup.sql is included in the root folder)

---

4. Create `.env` files inside `/backend` and `/frontend`:

Backend env:

```
DATABASE_URL="mysql://root:password@host.docker.internal:3306/traffic_db"
PORT=3000
```

Frontend env:

```
VITE_API_URL=http://localhost:3000/api/v1
```

Note: DB is still local in this setup (only backend and frontend are containerized).

---

5. Build the Docker image:

```bash
docker compose build --no-cache
```

After build:

```bash
docker compose up
```

---

6. App should run on:

```
http://localhost:5173
```

---

7. Open Docker Desktop to check logs.

---

## Without Docker:

### Backend:

1. Create `.env` file inside `/backend`:

```
DATABASE_URL="mysql://root:password@localhost:3306/traffic_db"
PORT=3000
```

---

2. Install backend dependencies:

```bash
cd backend
npm install
```

---

3. Create database:

```bash
mysql -u root -p
```

Then:

```sql
CREATE DATABASE traffic_db;
```

Load seed/backup:

```bash
mysql -u root -p traffic_db < backup.sql  
```

---

4. Backend runs on:

```
http://localhost:3000
```

---

### Frontend:

1. Create `.env` file inside `/frontend`:

```
VITE_API_URL=http://localhost:3000/api/v1
```

---

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

---

3. Start frontend:

```bash
npm run dev
```

---

4. Frontend runs on:

```
http://localhost:5173
```


Archeture:

This project is built as a full-stack web application using a simple but scalable layered architecture. The system is split into three main parts: frontend, backend, and database.

The frontend is built using React with Vite. It is responsible only for the user interface and user interactions. It does not talk directly to the database. Instead, it sends HTTP requests to the backend API. The frontend runs independently and communicates with the backend using a base API URL defined in environment variables.
I used Zustand for statemanagement and use custom hooks for traffic data. 

Since i used typescript i have to create a custom error handler as well to hanlde API errors.

In case of graphs i used MUI charts:
https://mui.com/ here a reference to charts used.

I didnt added any tailwind/bootstrap for CSS. instead kept everything simple using simple CSS file under /css.


The backend is built using Node.js with Express and TypeScript. It acts as the main logic layer of the system. All business logic, validation, and API handling are done here. The backend exposes REST APIs under a versioned route structure like /api/v1. It connects to the database through an ORM layer (Prisma). This layer abstracts raw SQL and makes database operations safer and easier to manage.
Since i used prisma, models were autocreated. so there was no need for manunal model files
Kept the flow simple :

Server -> Controller -> service -> database.

I added CRUD for country and traffic but i didnt used them in the frontend.
Routes can be found in ./routes file 

Main API For this project were:
| GET | `/api/v1/traffic/by-country` | Total traffic grouped by country |
| GET | `/api/v1/traffic/vehicle/:countryId` | Vehicle breakdown for a country |

since only these two were used in the frontend.

The database is MySQL and stores all persistent application data. In Docker setup, the database runs locally on the host machine, while in non-Docker setup it runs directly as a local service. A backup.sql file is used to initialize or restore the database state.


Docker is used to containerize the frontend and backend only. This ensures that both services run in a consistent environment regardless of the host machine. Docker Compose manages the service orchestration and simplifies startup by running both containers together.

The overall flow of the system is:

User interacts with frontend → frontend sends request to backend API → backend processes request and interacts with database → response is sent back to frontend → UI updates based on response.

Testing:
Due to time constraints, i only added few test cases that test the business logic of the application. which in term serves the main API which is TrafficService.
To run test locally:
Run `npm test`

the main use of this test is for the CI pipline.

CI pipeline:
I set up a CI pipeline using Git-based automation (like GitHub Actions).

The main purpose of the pipeline is to automatically validate code every time changes are pushed or a pull request is created.

The pipeline runs a few important steps:

It first installs all dependencies to make sure the project builds correctly in a clean environment for both frontend and backend.

After that, it runs TypeScript compilation to ensure there are no type errors.

Finally, it runs the test suite to make sure no existing functionality is broken.

This ensures that only stable and verified code gets merged into the main and develop branches.