## In-Scope Improvements

Things I wanted to but didn't quite have time

### Frontend

- **Add Styles**
  The UI is currently minimal. Add consistent styling and improve layout.

- **Refactor Page Structure**
  Break out large components and logic into separate, readable modules.

---

### Middleware

- **Authentication**
  Restrict API calls to authenticated client sessions.

- **Data Mappers / Sanitization**
  Expand current mappers to sanitize and transform data based on environment and client context (e.g., admin, public).

- **Rate Limiting**
  Add per-client and per-route rate limits.

- **Input Validation**
  Implement strong validation using libraries like Zod or Yup.

---

### Database

- **Fix Seeding**
  Prevent duplicate data on reseed. Update existing entries or insert only new records based on a unique key.

---

### Testing

- **Add Tests**
  No current test coverage. Introduce:

  - Unit tests with Vitest or Jest
  - E2E tests with Playwright or Cypress

---

### API & Routing

- **Improve Routing**
  Use Next.js routing tools to organize APIs and reduce future tech debt.

---

### Utilities

- **Error Handling**
  Add centralized error handling for both frontend and backend.

- **Logging**
  Create a logging utility with support for levels (info, warn, error).

- **Environment Management**
  Improve environment variable handling and validation.

---

## Out-of-Scope Enhancements

Other things that could be done with more time/info/money

### Infrastructure

- **Monitoring & Logging**
  Add Datadog, Sentry, or similar tools for observability.

- **Infrastructure as Code**
  Use Terraform and Docker for automated build, deployment, and config management.

- **Query Optimization**
  Add indexes, review queries, and optimize performance.

- **Database Backups**
  Schedule automated backups and secure storage.

---

### UX & Compliance

- **Accessibility (ADA)**
  Ensure frontend meets standards.

- **Component Library**
  Create or adopt a shared UI component library

---

### Others

- **Caching**
  Add a caching layer for production envs to reduce backend load.

- **Pagination**
  No pagination for large datasets
