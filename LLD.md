# Low-Level Design (LLD) - SOPE

## 1. Introduction

SOPE is an AI-powered Statement of Purpose (SOP) review platform designed to help students improve their SOPs before submitting university applications.

The Low-Level Design describes the internal implementation of the system, including backend modules, API routes, controllers, database operations, frontend structure, AI integration, error handling, and data flow.

---

## 2. Backend Folder Structure

    server/
    └── src/
        ├── app.js
        ├── routes/
        │   ├── application.routes.js
        │   ├── review.routes.js
        │   └── user.routes.js
        │
        ├── controllers/
        │   ├── application.controller.js
        │   ├── review.controller.js
        │   └── user.controller.js
        │
        ├── models/
        │   ├── Application.js
        │   ├── SopVersion.js
        │   └── Review.js
        │
        ├── middleware/
        │   ├── error.middleware.js
        │   └── auth.middleware.js
        │
        ├── services/
        │   └── ai.service.js
        │
        └── config/
            ├── postgres.js
            └── mongo.js

---

## 3. Application Routes

File:

    server/src/routes/application.routes.js

The application router defines the following routes:

    GET    /
    GET    /:id
    POST   /
    PUT    /:id
    DELETE /:id

The router is mounted in `app.js` using:

    /api/applications

Therefore, the complete endpoints are:

    GET    /api/applications
    GET    /api/applications/:id
    POST   /api/applications
    PUT    /api/applications/:id
    DELETE /api/applications/:id

---

## 4. Application Controller

File:

    server/src/controllers/application.controller.js

The application controller contains the following functions:

    createApplication()
    getApplications()
    getApplicationById()
    updateApplication()
    deleteApplication()

The controller is responsible for:

- Reading request data.
- Validating incoming data.
- Calling model functions.
- Selecting appropriate HTTP status codes.
- Returning JSON responses.
- Passing unexpected errors to the error middleware.

The controller does not directly contain SQL queries.

The controller follows the structure:

    HTTP Request
         |
         v
    Controller
         |
         v
    Model
         |
         v
    Database

---

## 5. Application Model

File:

    server/src/models/Application.js

The application model handles PostgreSQL operations.

The planned model functions are:

    createApplication()
    getApplications()
    getApplicationById()
    updateApplication()
    deleteApplication()

The model communicates with PostgreSQL through the connection pool.

This separation keeps database logic outside the controller.

---

## 6. PostgreSQL Connection

File:

    server/src/config/postgres.js

The application uses the `pg` Node.js package to connect to PostgreSQL.

A PostgreSQL connection pool is created using environment variables:

    DB_USER
    DB_HOST
    DB_NAME
    DB_PORT

The connection flow is:

    Express Application
           |
           v
    PostgreSQL Pool
           |
           v
    PostgreSQL Database

The database configuration is stored outside the source code.

---

## 7. Create Application API

Endpoint:

    POST /api/applications

Example request:

    {
      "userId": 1,
      "university": "University of Toronto",
      "program": "MSc Computer Science",
      "degree": "Masters",
      "country": "Canada",
      "intake": "Fall 2027",
      "deadline": "2027-01-15"
    }

Processing flow:

    HTTP POST Request
            |
            v
    application.routes.js
            |
            v
    createApplication()
            |
            v
    Validate request body
            |
            v
    createApplicationInDb()
            |
            v
    PostgreSQL INSERT
            |
            v
    Return created application
            |
            v
    HTTP 201 Created

The model uses an SQL query similar to:

    INSERT INTO applications
    (user_id, university, program, degree, country, intake, application_deadline)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *

Parameterized values are passed separately to the query.

---

## 8. Get All Applications API

Endpoint:

    GET /api/applications

Processing flow:

    HTTP GET Request
            |
            v
    application.routes.js
            |
            v
    getApplications()
            |
            v
    Application Model
            |
            v
    PostgreSQL
            |
            v
    Return application rows
            |
            v
    HTTP 200 OK

SQL query:

    SELECT *
    FROM applications
    ORDER BY created_at DESC

The newest applications are returned first.

Example response structure:

    {
      "success": true,
      "message": "Applications fetched successfully",
      "data": [
        {
          "id": 3,
          "user_id": 1,
          "university": "University of Toronto",
          "program": "MSc Computer Science",
          "degree": "Masters",
          "country": "Canada",
          "intake": "Fall 2027",
          "application_deadline": "2027-01-15"
        }
      ]
    }

---

## 9. Get Application by ID API

Endpoint:

    GET /api/applications/:id

Example:

    GET /api/applications/3

Processing:

    Request
       |
       v
    Read id from req.params
       |
       v
    getApplicationById()
       |
       v
    Application Model
       |
       v
    PostgreSQL
       |
       v
    Search by ID

SQL query:

    SELECT *
    FROM applications
    WHERE id = $1

If the application exists:

    HTTP 200 OK

If the application does not exist:

    HTTP 404 Not Found

---

## 10. Update Application API

Endpoint:

    PUT /api/applications/:id

Example:

    PUT /api/applications/3

The update flow is:

    HTTP PUT Request
            |
            v
    application.routes.js
            |
            v
    updateApplication()
            |
            v
    Validate request
            |
            v
    Application Model
            |
            v
    PostgreSQL UPDATE
            |
            v
    Return updated application
            |
            v
    HTTP 200 OK

SQL structure:

    UPDATE applications
    SET
        university = $1,
        program = $2,
        degree = $3,
        country = $4,
        intake = $5,
        application_deadline = $6,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *

The `updated_at` field is updated whenever an application is modified.

---

## 11. Delete Application API

Endpoint:

    DELETE /api/applications/:id

Example:

    DELETE /api/applications/3

Processing flow:

    HTTP DELETE Request
            |
            v
    application.routes.js
            |
            v
    deleteApplication()
            |
            v
    Application Model
            |
            v
    PostgreSQL DELETE
            |
            v
    HTTP 200 OK

SQL structure:

    DELETE FROM applications
    WHERE id = $1
    RETURNING *

If the application does not exist:

    HTTP 404 Not Found

---

## 12. PostgreSQL Users Table

The `users` table stores user account information.

Schema:

    users
    --------------------------------
    id             SERIAL PRIMARY KEY
    name           VARCHAR(100)
    email          VARCHAR(255) UNIQUE
    password       VARCHAR(255)
    created_at     TIMESTAMP

SQL:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

---

## 13. PostgreSQL Applications Table

The `applications` table stores university application information.

Schema:

    applications
    --------------------------------
    id                    SERIAL PRIMARY KEY
    user_id               INTEGER FOREIGN KEY
    university            VARCHAR(255)
    program               VARCHAR(255)
    degree                VARCHAR(100)
    country               VARCHAR(100)
    intake                VARCHAR(50)
    application_deadline  DATE
    created_at            TIMESTAMP
    updated_at            TIMESTAMP

SQL:

    CREATE TABLE applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        university VARCHAR(255) NOT NULL,
        program VARCHAR(255) NOT NULL,
        degree VARCHAR(100),
        country VARCHAR(100),
        intake VARCHAR(50),
        application_deadline DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id) REFERENCES users(id)
    );

---

## 14. Database Relationship

The relationship between users and applications is one-to-many.

One user can create multiple applications.

    users
       |
       | 1
       |
       | many
       v
    applications

The relationship is implemented using:

    applications.user_id
            |
            v
    users.id

`users.id` is the primary key.

`applications.user_id` is the foreign key.

The foreign key prevents an application from referencing a user that does not exist.

---

## 15. Parameterized SQL Queries

The application uses parameterized queries.

Example:

    SELECT *
    FROM applications
    WHERE id = $1

The value is passed separately:

    [id]

This prevents user input from being directly concatenated into SQL statements and reduces the risk of SQL injection.

---

## 16. HTTP Status Codes

The API uses standard HTTP status codes.

| Situation | Status Code |
|---|---:|
| Successful GET | 200 |
| Successful POST | 201 |
| Successful PUT | 200 |
| Successful DELETE | 200 |
| Invalid request data | 400 |
| Resource not found | 404 |
| Database/server error | 500 |

Example:

    return res.status(400).json({
      success: false,
      message: "All application fields are required."
    });

---

## 17. Error Middleware

File:

    server/src/middleware/error.middleware.js

Controllers use `next(error)` when an unexpected error occurs.

Example:

    try {
      // operation
    } catch (error) {
      next(error);
    }

The flow is:

    Controller
         |
         | error
         v
    next(error)
         |
         v
    error.middleware.js
         |
         v
    JSON Error Response

This prevents every controller from having to implement its own complete server-error response logic.

---

## 18. Express Application Configuration

File:

    server/src/app.js

The Express application performs the following setup:

1. Loads environment variables.
2. Creates the Express application.
3. Enables CORS.
4. Enables JSON request parsing.
5. Registers API routes.
6. Registers error middleware.
7. Starts the HTTP server.

Route mounting:

    app.use("/api/applications", applicationRoutes);
    app.use("/api/reviews", reviewRoutes);
    app.use("/api/users", userRoutes);

Error middleware is registered after the API routes.

---

## 19. SOP Version Model

SOP versions are planned to be stored in MongoDB.

Document structure:

    sopVersions
    {
        _id,
        applicationId,
        versionNumber,
        content,
        wordCount,
        createdAt
    }

Each time a student creates a new SOP revision, a new version is stored.

Example:

    Application
        |
        +---- Version 1
        |
        +---- Version 2
        |
        +---- Version 3

This allows students to track how their SOP changes over time.

---

## 20. Review Model

AI review results are planned to be stored in MongoDB.

Document structure:

    reviews
    {
        _id,
        sopVersionId,
        overallScore,
        scores,
        cliches,
        strengths,
        weaknesses,
        recommendations,
        createdAt
    }

Each review is associated with a specific SOP version.

Relationship:

    SOP Version 1
          |
          v
       Review 1

    SOP Version 2
          |
          v
       Review 2

---

## 21. AI Service

File:

    server/src/services/ai.service.js

The AI service isolates communication with the external LLM API from the controllers.

The service will receive:

- SOP content.
- University.
- Program.
- Degree.
- Relevant application information.

Processing:

    Review Controller
           |
           v
       AI Service
           |
           v
        LLM API
           |
           v
    Structured JSON
           |
           v
       Controller

Keeping the AI integration in a separate service makes the backend easier to maintain and test.

---

## 22. AI Structured Output

The AI service is expected to return structured data instead of plain text.

Example:

    {
      "overallScore": 82,
      "scores": {
        "specificity": 78,
        "programFit": 91,
        "clarity": 84,
        "structure": 88,
        "personality": 71
      },
      "cliches": [
        {
          "sentence": "I have always been passionate about technology.",
          "reason": "Generic opening",
          "suggestion": "Replace this with a specific experience."
        }
      ],
      "strengths": [],
      "weaknesses": [],
      "recommendations": []
    }

The structured format allows the frontend to display each section independently.

---

## 23. AI Review Processing Flow

The complete review process is:

    Student
       |
       v
    SOP Editor
       |
       v
    Submit SOP
       |
       v
    Review Route
       |
       v
    Review Controller
       |
       v
    AI Service
       |
       v
    LLM API
       |
       v
    Structured Review
       |
       v
    Save Review
       |
       v
    Return Result
       |
       v
    Review Results Page

---

## 24. Authentication

Authentication is planned using JSON Web Tokens.

Flow:

    User
      |
      v
    Login
      |
      v
    Verify credentials
      |
      v
    Generate JWT
      |
      v
    Client stores token
      |
      v
    Protected API request
      |
      v
    Authentication Middleware
      |
      v
    Verify JWT
      |
      v
    Controller

The authentication middleware will protect user-specific resources.

The authenticated user's identity should eventually be obtained from the verified JWT rather than relying on a client-provided `userId`.

---

## 25. Authentication Middleware

File:

    server/src/middleware/auth.middleware.js

The middleware will:

1. Read the authorization header.
2. Extract the token.
3. Verify the JWT.
4. Attach the authenticated user information to the request.
5. Continue to the controller.

Conceptual flow:

    Authorization Header
            |
            v
       Extract JWT
            |
            v
       Verify Token
         /       \
        /         \
    Invalid      Valid
      |             |
      v             v
    401           req.user
                    |
                    v
                Controller

---

## 26. Frontend Structure

The React frontend is organized into reusable components and pages.

    client/src/
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Button.jsx
    │   ├── Score.jsx
    │   └── ApplicationCard.jsx
    │
    ├── pages/
    │   ├── Landing.jsx
    │   ├── Features.jsx
    │   ├── HowItWorks.jsx
    │   ├── Pricing.jsx
    │   ├── FAQ.jsx
    │   ├── Login.jsx
    │   ├── Signup.jsx
    │   ├── Onboarding.jsx
    │   ├── Dashboard.jsx
    │   ├── CreateApplication.jsx
    │   ├── ApplicationOverview.jsx
    │   ├── SopEditor.jsx
    │   ├── Analysis.jsx
    │   ├── ReviewResults.jsx
    │   ├── SentenceReview.jsx
    │   ├── VersionHistory.jsx
    │   └── CompareVersions.jsx
    │
    ├── services/
    │   └── api.js
    │
    ├── hooks/
    │
    ├── App.jsx
    ├── App.css
    └── index.css

---

## 27. React Component Responsibilities

### Navbar

Responsible for:

- Navigation links.
- Application navigation.
- Active route indication.

### Button

Reusable button component supporting different variants.

### Score

Displays an AI-generated score.

### ApplicationCard

Displays summary information about an application.

Reusable components reduce duplicated UI code.

---

## 28. Frontend API Communication

The frontend communicates with the backend through HTTP requests.

Example:

    const response = await fetch(
        "http://localhost:5001/api/applications"
    );

    const data = await response.json();

The frontend is responsible for:

- Sending requests.
- Handling loading states.
- Handling errors.
- Processing JSON responses.
- Updating React state.
- Displaying results.

---

## 29. React State Management

React state is used for dynamic UI data.

Example:

    const [applications, setApplications] = useState([]);

State can contain:

- Application data.
- Loading status.
- Error messages.
- Form values.
- AI review results.

`useEffect` can be used to load data when a component is mounted.

Example:

    useEffect(() => {
        fetchApplications();
    }, []);

---

## 30. Client-Side Routing

The frontend will use client-side routing to navigate between pages without a complete browser reload.

Example routes:

    /
    /how-it-works
    /pricing
    /login
    /signup
    /dashboard
    /applications/new
    /applications/:id
    /applications/:id/edit
    /applications/:id/review
    /applications/:id/versions
    /applications/:id/compare

Dynamic routes allow the application ID to determine which application is being displayed.

---

## 31. Application Creation Flow

The frontend application creation process is:

    Create Application Page
            |
            v
    User enters:
        University
        Program
        Degree
        Country
        Intake
        Deadline
            |
            v
    Submit Form
            |
            v
    POST /api/applications
            |
            v
    Express Controller
            |
            v
    PostgreSQL
            |
            v
    Created Application
            |
            v
    Navigate to Application Overview

---

## 32. Version Comparison

The version comparison feature will compare two SOP versions.

Example:

    Version 1
       |
       | compare
       |
       v
    Comparison Engine
       ^
       |
       | compare
       |
    Version 2

The interface can show:

- Previous score.
- New score.
- Score changes.
- Improved sentences.
- Remaining issues.
- AI recommendations.

---

## 33. Database Responsibility Separation

PostgreSQL is responsible for relational application data.

PostgreSQL:

    Users
    Applications

MongoDB is responsible for flexible document data.

MongoDB:

    SOP Versions
    AI Reviews

This allows each database to handle the type of data it is designed for.

---

## 34. Environment Variables

Example `server/.env`:

    DB_USER=manu
    DB_HOST=localhost
    DB_NAME=sope
    DB_PORT=5432
    PORT=5001

Sensitive credentials and API keys should not be committed to Git.

The project `.gitignore` excludes:

    .env
    .env.*
    
while allowing:

    .env.example

---

## 35. Git Workflow

The project uses feature branches for development.

Example workflow:

    main
      |
      +---- feature/postgresql-setup
      |
      +---- feature/landing-page
      |
      +---- feature/application-crud

Development flow:

    Create Feature Branch
            |
            v
    Implement Feature
            |
            v
    Test Feature
            |
            v
    git add
            |
            v
    git commit
            |
            v
    git push
            |
            v
    Create GitHub Pull Request
            |
            v
    Review
            |
            v
    Merge into main

---

## 36. Current Application CRUD Implementation

The current application creation flow has been connected to PostgreSQL.

The API was tested using:

    curl -X POST http://localhost:5001/api/applications \
      -H "Content-Type: application/json" \
      -d '{
        "userId": 1,
        "university": "University of Toronto",
        "program": "MSc Computer Science",
        "degree": "Masters",
        "country": "Canada",
        "intake": "Fall 2027",
        "deadline": "2027-01-15"
      }'

The application was successfully inserted into PostgreSQL.

The GET endpoint was also tested:

    curl http://localhost:5001/api/applications

The API successfully returned application records stored in PostgreSQL.

---

## 37. Current Request Lifecycle

For an application creation request:

    Browser / Postman / curl
              |
              v
    POST /api/applications
              |
              v
    Express Router
              |
              v
    Application Controller
              |
              v
    Input Validation
              |
              v
    Application Model
              |
              v
    PostgreSQL Pool
              |
              v
    PostgreSQL Database
              |
              v
    Created Record
              |
              v
    Controller
              |
              v
    JSON Response
              |
              v
    Client

---

## 38. Error Scenarios

### Missing Application Fields

If required fields are missing:

    HTTP 400 Bad Request

Response:

    {
      "success": false,
      "message": "All application fields are required."
    }

### Application Not Found

If an application ID does not exist:

    HTTP 404 Not Found

Response:

    {
      "success": false,
      "message": "Application not found"
    }

### Database Error

Unexpected database errors are passed to:

    next(error)

The centralized error middleware then generates the server error response.

---

## 39. Data Validation

Application requests should validate:

- User ID.
- University.
- Program.
- Degree.
- Country.
- Intake.
- Application deadline.

Validation occurs before attempting the database operation.

This prevents incomplete application records from being inserted.

---

## 40. Separation of Concerns

The backend follows a layered structure:

    Routes
       |
       v
    Controllers
       |
       v
    Models
       |
       v
    Database

Additional services are separated:

    Controllers
       |
       v
    Services
       |
       v
    External APIs

This makes each part of the system responsible for a specific task.

---

## 41. Design Principles

The implementation follows these principles:

1. Separation of concerns.
2. RESTful API design.
3. Reusable frontend components.
4. Layered backend architecture.
5. Parameterized database queries.
6. Environment-based configuration.
7. Centralized error handling.
8. Structured AI output.
9. Clear database responsibilities.
10. Reusable service modules.
11. Input validation.
12. Secure authentication architecture.
13. Feature-based Git workflow.
14. Maintainable and scalable project structure.