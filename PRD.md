# SOPE — Product Requirements Document

**Product Name:** SOPE  
**Repository:** sope-ai  
**Product Type:** AI-powered web application  
**Status:** In Development  
**Version:** 1.0

---

## 1. Product Overview

SOPE is an AI-powered Statement of Purpose (SOP) review platform designed for students applying to universities abroad.

Instead of simply generating or rewriting an SOP, SOPE evaluates an existing SOP and explains what is working, what is weak, and what should be improved.

The platform focuses on actionable feedback such as:

- Specificity
- Program fit
- Clarity
- Structure
- Personality
- Cliché detection
- Sentence-level feedback
- Improvement suggestions
- Version comparison

The goal is to help students understand and improve their own SOP before submitting it or sending it to a professional reviewer.

---

## 2. Problem Statement

Students often struggle to determine whether their SOP is actually strong enough for a university application.

Existing solutions generally fall into two categories:

1. Generic AI writing tools that rewrite or generate text.
2. Human SOP editors and consultants that can be expensive.

Generic AI tools can produce polished writing, but they may not provide a structured evaluation of why an SOP is weak or whether it effectively communicates the student's fit for a specific program.

Professional editing can provide better feedback, but it can be expensive and may not be accessible to every student.

SOPE aims to provide an affordable first-pass review that helps students identify problems before seeking final human feedback.

---

## 3. Product Vision

> Help students turn a generic SOP into a specific, convincing, and program-focused application.

SOPE is not intended to replace professional admissions consultants or human reviewers.

Instead, it acts as a structured first layer of feedback between the student's first draft and final submission.

---

## 4. Target Users

### Primary Users

Students applying to:

- Bachelor's programs
- Master's programs
- Other higher-education programs abroad

Especially students who:

- Already have an SOP draft
- Want objective feedback
- Are unsure whether their SOP is specific enough
- Want to check program fit
- Want to identify clichés and weak sentences
- Want to improve their SOP before professional review

---

## 5. Product Goals

### Primary Goals

1. Allow users to create university/program applications.
2. Allow users to write or paste an SOP.
3. Analyze SOPs using an AI model.
4. Provide structured scores and actionable feedback.
5. Identify clichés and generic statements.
6. Identify sentences that need improvement.
7. Allow users to save multiple SOP versions.
8. Allow users to compare improvements between versions.
9. Maintain application and user data securely.
10. Provide a clean and distinctive user experience.

### Secondary Goals

- Make feedback understandable to students.
- Encourage iterative SOP improvement.
- Demonstrate practical AI integration.
- Demonstrate full-stack software engineering principles.

---

## 6. Non-Goals

SOPE will not initially:

- Guarantee university admission.
- Predict admission decisions.
- Replace professional admissions consultants.
- Automatically submit applications to universities.
- Write an entire SOP from scratch as its primary function.
- Claim that AI scores represent official university evaluation criteria.

The product is intended to provide guidance, not admission guarantees.

---

## 7. Core User Flow

```text
Landing Page
      ↓
Sign Up / Login
      ↓
Create Application
      ↓
Enter University + Program Information
      ↓
Write / Paste SOP
      ↓
Submit for Analysis
      ↓
AI Analysis
      ↓
Structured Review
      ↓
View Scores + Feedback
      ↓
Edit SOP
      ↓
Create New Version
      ↓
Analyze Again
      ↓
Compare Versions
```

## 8. Core Features

### 8.1 User Authentication

- Users should be able to:
  - Create an account
  - Log in
  - Log out
  - Access only their own applications

### Planned Technology

- PostgreSQL
- Express.js
- JWT
- Password hashing

## 9. Application Management

- Users can create applications containing information such as:
  - University
  - Program
  - Degree
  - Country
  - Intake
  - Application deadline
- Each application belongs to one user.
- Relationship:
  - User → Multiple Applications

## 10. SOP Editor

- Users should be able to:
  - Write an SOP
  - Paste an existing SOP
  - Edit the SOP
  - View word count
  - Save versions
  - Submit a version for analysis
- The editor should make writing and reviewing an SOP straightforward without unnecessary UI complexity.

## 11. AI SOP Analysis

- The core feature of SOPE is structured AI analysis.
- The AI should evaluate the SOP using defined criteria rather than simply rewriting the entire document.
- Initial scoring categories:
  - Overall Score
  - Specificity
  - Program Fit
  - Clarity
  - Structure
  - Personality
- Scores should use a consistent scale of 0–100.

## 12. Cliché Detection

- SOPE should identify generic or overused statements.
- For each detected cliché, the system should provide:
  - Original sentence
  - Reason it is weak or generic
  - Suggested direction for improvement
- Example:
  - Sentence: "I have always been passionate about technology."
  - Problem: Generic opening with little evidence.
  - Suggestion: Replace the statement with a specific experience that demonstrates how the interest developed.
- The system should focus on improving specificity rather than simply replacing sentences with more sophisticated vocabulary.

## 13. Sentence-Level Feedback

- SOPE should identify individual sentences that could be improved.
- Potential categories include:
  - Generic
  - Unclear
  - Repetitive
  - Weak evidence
  - Poor program connection
  - Clichéd
  - Too vague
- Each flagged sentence should contain an actionable suggestion.

## 14. Review Results

- After analysis, users should see a structured review containing:
  - Overall score
  - Specificity
  - Program fit
  - Clarity
  - Structure
  - Personality
  - Strengths
  - Weaknesses
  - Clichés
  - Recommendations
  - Sentence-level feedback
- Example AI response structure:

```json
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
```

## 15. SOP Version History

- Every meaningful saved SOP version should be stored.
- Example:
  - Version 1
  - Version 2
  - Version 3
- Each version should contain:
  - Version number
  - SOP content
  - Word count
  - Creation timestamp
  - Associated review
- This allows users to track their progress.

## 16. Version Comparison

- Users should eventually be able to compare two SOP versions.
- Example:
  - Version 1 → 72/100
  - Version 2 → 82/100
- The comparison should highlight improvements such as:
  - Higher specificity
  - Better program fit
  - Fewer clichés
  - Better clarity
  - Improved structure

## 17. Database Architecture

- SOPE uses two databases for different types of data.

### PostgreSQL

- PostgreSQL stores structured relational data.
- Users table:
  - id
  - name
  - email
  - password
  - created_at
- Applications table:
  - id
  - user_id
  - university
  - program
  - degree
  - country
  - intake
  - application_deadline
  - created_at
  - updated_at
- Relationship:
  - users.id → applications.user_id
- One user can have many applications.

## 18. MongoDB

- MongoDB will store document-oriented SOP and AI review data.
- SOP Versions:
  - `_id`
  - `applicationId`
  - `versionNumber`
  - `content`
  - `wordCount`
  - `createdAt`
- Reviews:
  - `_id`
  - `sopVersionId`
  - `overallScore`
  - `scores`
  - `cliches`
  - `strengths`
  - `weaknesses`
  - `recommendations`
  - `createdAt`
- MongoDB is suitable for these records because AI review results may contain nested and evolving structures.

## 19. System Architecture

```text
USER
  │
  ▼
React Frontend
  │
  HTTP/API
  │
  ▼
Express Backend
  ┌───────┼────────┐
  │       │        │
  ▼       ▼        ▼
Auth    Application  AI
  │       │        │
  ▼       ▼        ▼
PostgreSQL PostgreSQL OpenAI API
                        │
                        ▼
                  Structured Review
                        │
                        ▼
                     MongoDB
```

## 20. Backend Architecture

- The backend will use a layered structure.

```text
server/
└── src/
    ├── app.js
    ├── routes/
    ├── controllers/
    ├── models/
    ├── middleware/
    ├── services/
    └── config/
```

- Routes: define API endpoints.
- Controllers: handle incoming requests and responses.
- Services: contain business logic such as AI analysis.
- Models: represent database structures.
- Middleware: handle authentication and centralized errors.
- Config: handle database and environment configuration.

## 21. Planned API Endpoints

### Authentication

- `POST /api/users/signup`
- `POST /api/users/login`

### Applications

- `GET /api/applications`
- `POST /api/applications`
- `GET /api/applications/:id`
- `PUT /api/applications/:id`
- `DELETE /api/applications/:id`

### SOP / Reviews

- `POST /api/applications/:id/versions`
- `GET /api/applications/:id/versions`
- `POST /api/applications/:id/analyze`
- `GET /api/applications/:id/reviews`
- `GET /api/applications/:id/reviews/:reviewId`

- These endpoints may evolve during implementation.

## 22. HTTP Status Codes

- The backend should use appropriate HTTP status codes.
- Examples:
  - 200 OK
  - 201 Created
  - 400 Bad Request
  - 401 Unauthorized
  - 403 Forbidden
  - 404 Not Found
  - 500 Internal Server Error
- The API should return meaningful error messages rather than generic failures.

## 23. Environment Variables

- Sensitive information must not be hard-coded into the source code.
- Examples:
  - `PORT`
  - `DATABASE_URL`
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `OPENAI_API_KEY`
- Environment variables should be stored locally in `.env`.
- `.env` must not be committed to Git.
- A `.env.example` file should document required variables without exposing real secrets.

## 24. Security Requirements

- The system should:
  - Hash user passwords.
  - Protect private API routes.
  - Use JWT authentication.
  - Keep API keys on the server.
  - Prevent users from accessing another user's applications.
  - Validate incoming data.
  - Avoid exposing database credentials.
  - Handle authentication errors correctly.

## 25. Frontend Requirements

- The frontend will use:
  - React
  - React Router
  - JavaScript
  - CSS
- The frontend should support:
  - Client-side routing
  - API communication
  - Loading states
  - Error states
  - Form validation
  - Authentication state
  - Reusable components

## 26. AI Requirements

- The AI system should:
  - Receive the SOP and target program information.
  - Evaluate the SOP against predefined criteria.
  - Return structured output.
  - Avoid unnecessary rewriting.
  - Explain why feedback is being given.
  - Provide actionable improvement suggestions.
  - Return predictable JSON that the frontend can render.
- AI output should be validated before being returned to the client.

## 27. Product Design Principles

- SOPE should avoid looking like a generic AI SaaS dashboard.
- The visual direction should be:
  - Editorial
  - Bold
  - Minimal
  - Typography-driven
  - Modern
  - Slightly experimental
  - High contrast
- Preferred visual language:
  - Large typography
  - Strong serif display headings
  - Modern sans-serif UI text
  - Thin borders
  - Asymmetrical layouts
  - Minimal rounded cards
  - Red as a primary accent
  - White, off-white, and black supporting colors
  - Generous negative space
- The design should feel closer to an editorial product than a conventional dashboard template.

## 28. MVP Scope

### Must Have

- User authentication
- Application creation
- SOP input
- AI analysis
- Structured scores
- Cliché detection
- Sentence feedback
- Version history
- Version comparison
- Basic dashboard viewing

### Nice to Have

- Advanced sentence-by-sentence suggestions
- Stronger visual analytics
- Rich user profile management
- Exportable review summaries
- Premium plan features

### Out of Scope for MVP

- Full admissions prediction
- Automated university submission
- Full professional consultant replacement
- Complex multi-role admin systems
- Deep external integrations beyond the core review workflow
  Review results
  SOP version storage
  Basic version history
  PostgreSQL integration
  MongoDB integration
  Should Have
  Version comparison
  Profile
  Settings
  Improved dashboard
  Better loading/error states
  Could Have
  Billing
  Advanced analytics
  Admin dashboard
  Professional reviewer workflow
  Additional AI evaluation criteria

29. Success Metrics

Potential product metrics include:

Number of SOPs analyzed
Number of returning users
Average improvement between SOP versions
Percentage of users creating multiple versions
Average review completion rate
Number of applications created per user

A successful MVP should demonstrate that users can submit an SOP, understand the feedback, improve it, and analyze the next version.

30. Technical Assessment Goals

SOPE is also designed to demonstrate practical software engineering skills.

The project should demonstrate:

Frontend
React components
Component composition
useState
useEffect
React Router
Async API calls
Promises
async/await
JavaScript event loop concepts
Backend
Express
REST APIs
Controllers
Middleware
Error handling
HTTP status codes
Authentication
Environment variables
Databases
PostgreSQL
Primary keys
Foreign keys
Relational schema design
SQL JOINs
MongoDB
Schema modeling
CRUD operations
AI
LLM API integration
Prompt engineering
Structured outputs
AI response validation
Development
Git
Feature branches
Pull requests
Environment management
Debugging
API testing 31. Current Implementation Status
Completed
React + Vite frontend initialized
Express backend initialized
Frontend → backend HTTP communication
CORS configuration
JSON request handling
Git repository initialized
PostgreSQL installed
PostgreSQL database created
users table created
applications table created
Foreign key relationship created
Node.js → PostgreSQL connection tested
In Progress
PostgreSQL API integration
Application CRUD
Authentication
MongoDB integration
SOP management
AI analysis
Planned
Version comparison
Complete dashboard
Billing
Profile/settings
Advanced product features 32. Future Scope

Potential future features include:

AI-generated improvement explanations
University-specific evaluation criteria
Program-specific feedback
Multiple SOP evaluation frameworks
Human reviewer marketplace
Professional review handoff
Subscription plans
Application deadline tracking
University research assistance
Analytics showing writing improvement over time

These features are outside the initial MVP.

33. Product Positioning

SOPE is positioned as:

An AI-powered SOP reviewer that tells students what is weak, why it is weak, and what they can improve.

The product focuses on review and improvement, rather than simply generating polished text.

34. PRD Change Policy

This document should evolve with the product.

Whenever a significant product decision changes, this PRD should be updated.

Examples include:

Adding or removing a major feature
Changing the target user
Changing the core product flow
Changing database architecture
Adding a new AI capability
Changing MVP scope
Adding monetization

Minor implementation changes do not require a PRD update.

Before final project submission, the PRD should be reviewed against the completed product so that it accurately represents what was actually built.

```

```
