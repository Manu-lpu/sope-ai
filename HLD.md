# High-Level Design (HLD) - SOPE

## 1. Project Overview

SOPE is an AI-powered Statement of Purpose (SOP) review platform designed for students applying to universities.

The system allows a student to:

1. Create an application.
2. Enter university and program information.
3. Write or paste an SOP.
4. Submit the SOP for AI analysis.
5. Receive structured feedback and scores.
6. Identify clichés and weak sentences.
7. Improve the SOP.
8. Maintain multiple SOP versions and compare improvements.

SOPE is designed as a product rather than a generic AI chatbot. Its purpose is to provide structured, application-specific feedback instead of simply generating or rewriting an SOP.

## 2. System Architecture

                    USER
                     |
                     v
              React + Vite
                 Frontend
                     |
               HTTP / REST API
                     |
                     v
              Node.js + Express
                  Backend
                     |
          +----------+----------+
          |          |          |
          v          v          v
     Controllers  Middleware  Services
          |
          v
        Models
          |
      +---+----------------+
      |                    |
      v                    v
 PostgreSQL             MongoDB
 Relational Data       Document Data
      |                    |
      +----------+---------+
                 |
                 v
             AI Service
              LLM API

## 3. Major Components

### 3.1 Frontend

Technology:

- React
- Vite
- JavaScript
- CSS

Responsibilities:

- Display the user interface.
- Handle client-side routing.
- Collect application information.
- Allow users to write or paste SOP content.
- Send API requests to the backend.
- Display application data.
- Display AI review results.
- Display version history.

### 3.2 Backend

Technology:

- Node.js
- Express.js

Responsibilities:

- Provide RESTful APIs.
- Validate incoming requests.
- Execute application CRUD operations.
- Communicate with databases.
- Communicate with the AI service.
- Handle errors.
- Return appropriate HTTP status codes.

Backend structure:

    server/src/
    ├── app.js
    ├── routes/
    ├── controllers/
    ├── models/
    ├── middleware/
    ├── services/
    └── config/

### 3.3 PostgreSQL

PostgreSQL is used for structured relational data.

Current entities:

- Users
- Applications

Relationship:

    User
     |
     | 1
     |
     | many
     v
    Application

Each application belongs to a user through user_id.

### 3.4 MongoDB

MongoDB is planned for document-oriented SOP and review data.

Planned collections:

- sopVersions
- reviews

MongoDB is suitable for this data because AI review results contain nested and flexible structures such as scores, clichés, strengths, weaknesses and recommendations.

### 3.5 AI Service

The AI service is responsible for analyzing an SOP against the target application.

The service will receive:

- SOP content
- University
- Program
- Degree
- Other relevant application information

The AI model will return structured review data.

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
      "cliches": [],
      "strengths": [],
      "weaknesses": [],
      "recommendations": []
    }

## 4. Application Flow

    User opens SOPE
            |
            v
    Create Application
            |
            v
    Enter University + Program
            |
            v
    Write / Paste SOP
            |
            v
    Submit for Analysis
            |
            v
    Express Backend
            |
            v
    AI Service
            |
            v
    Structured AI Review
            |
            +----------------------+
            |                      |
            v                      v
    Save Review              Display Results
            |
            v
    Improve SOP
            |
            v
    Create New Version
            |
            v
    Analyze Again
            |
            v
    Compare Versions

## 5. Application CRUD Architecture

Applications are managed through RESTful endpoints.

    POST   /api/applications
    GET    /api/applications
    GET    /api/applications/:id
    PUT    /api/applications/:id
    DELETE /api/applications/:id

Request flow:

    HTTP Request
         |
         v
    Express Router
         |
         v
    Controller
         |
         v
    Model
         |
         v
    PostgreSQL
         |
         v
    Controller
         |
         v
    HTTP Response

## 6. Database Architecture

### PostgreSQL

    users
    ----------------
    id PK
    name
    email
    password
    created_at

            |
            | 1:N
            |
            v

    applications
    ----------------
    id PK
    user_id FK
    university
    program
    degree
    country
    intake
    application_deadline
    created_at
    updated_at

### MongoDB

    sopVersions
    ----------------
    _id
    applicationId
    versionNumber
    content
    wordCount
    createdAt

    reviews
    ----------------
    _id
    sopVersionId
    overallScore
    scores
    cliches
    strengths
    weaknesses
    recommendations
    createdAt

## 7. Security Architecture

The system will use:

- Environment variables for secrets.
- .env files excluded from Git.
- Parameterized SQL queries.
- Input validation.
- Authentication middleware.
- Authorization checks.
- Centralized error handling.

Database queries use parameterized values such as:

    WHERE id = $1

instead of directly inserting user input into SQL queries.

## 8. Error Handling

Controllers pass unexpected errors to centralized middleware.

    Controller
        |
        | error
        v
    next(error)
        |
        v
    Error Middleware
        |
        v
    HTTP Error Response

Expected HTTP responses include:

| Situation | Status |
|---|---:|
| Successful GET | 200 |
| Successful POST | 201 |
| Successful PUT | 200 |
| Successful DELETE | 200 |
| Invalid input | 400 |
| Resource not found | 404 |
| Server/database error | 500 |

## 9. Environment Configuration

Environment-specific configuration is stored outside the source code.

Example:

    DB_USER=
    DB_HOST=localhost
    DB_NAME=sope
    DB_PORT=5432
    PORT=5001

The .env file is excluded from Git using .gitignore.

## 10. Current Implementation Status

Currently implemented:

- React + Vite frontend.
- Express backend.
- CORS configuration.
- JSON request handling.
- REST application routes.
- PostgreSQL database.
- PostgreSQL users table.
- PostgreSQL applications table.
- Foreign key relationship between users and applications.
- PostgreSQL connection using pg.
- Environment-based PostgreSQL configuration.
- Application creation through PostgreSQL.
- Application listing through PostgreSQL.
- Application controller/model architecture.
- Centralized error middleware.

In progress:

- Complete application CRUD testing.
- Authentication.
- SOP version management.
- MongoDB integration.
- AI analysis service.

Planned:

- AI-powered SOP review.
- Cliché detection.
- Sentence-level feedback.
- Review results UI.
- Version comparison.
- Dashboard.
- Profile and settings.
- Billing.

## 11. Deployment Architecture

                    Internet
                       |
                       v
                React Frontend
                       |
                    HTTPS
                       |
                       v
                Express Backend
                  /          \
                 /            \
                v              v
        PostgreSQL          MongoDB
                               |
                               v
                            AI API

The frontend and backend communicate through REST APIs.

## 12. Design Principles

SOPE follows these principles:

1. Separation of concerns.
2. RESTful API design.
3. Reusable frontend components.
4. Layered backend architecture.
5. Secure database access.
6. Environment-based configuration.
7. Centralized error handling.
8. Structured AI output.
9. Scalable data modeling.
10. Clear separation between relational and document-oriented data.