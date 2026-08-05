# Production-Style Backend Architecture

## 1. Final folder structure

```text
server/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── prisma.ts
│   ├── controllers/
│   │   └── productController.ts
│   ├── services/
│   │   └── productService.ts
│   ├── repositories/
│   │   └── productRepository.ts
│   ├── routes/
│   │   ├── productRoutes.ts
│   │   └── dashboardRoutes.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── auth.ts
│   ├── validators/
│   │   └── productValidator.ts
│   ├── utils/
│   │   ├── asyncHandler.ts
│   │   ├── response.ts
│   │   └── env.ts
│   └── types/
│       └── product.ts
└── docs/
    └── architecture.md
```

## 2. Naming conventions

- Use feature-based, lowercase folder names.
- Use `camelCase` for function names.
- Use `PascalCase` only for types and class-like constructs when needed.
- Use suffixes to indicate responsibility:
  - `Controller` for HTTP request handling
  - `Service` for business logic
  - `Repository` for persistence access
  - `Routes` for endpoint declarations
  - `Validator` for request validation
- Avoid putting raw Prisma calls inside controllers or services.
- Keep one responsibility per file.

## 3. Where each file belongs

### `src/app.ts`
- Creates the Express app.
- Wires middleware.
- Mounts route modules.

### `src/server.ts`
- Starts the HTTP server.
- Reads environment configuration.
- Binds the app to a port.

### `src/config/prisma.ts`
- Owns the shared Prisma client instance.
- Centralizes database connection setup.

### `src/controllers/productController.ts`
- Handles `req` / `res` only.
- Calls services and returns HTTP responses.
- Must not contain Prisma logic.

### `src/services/productService.ts`
- Contains business rules.
- Orchestrates repository calls.
- Performs domain-level validation and aggregation logic.

### `src/repositories/productRepository.ts`
- Contains all Prisma database access.
- Maps domain entities to Prisma operations.
- Exposes query/update primitives.

### `src/routes/productRoutes.ts`
- Declares public endpoints.
- Maps route paths to controller handlers.

### `src/routes/dashboardRoutes.ts`
- Declares dashboard aggregate endpoint(s).

### `src/middleware/*`
- Shared cross-cutting concerns such as error handling, request auth, and logging.

### `src/validators/*`
- Validates incoming payloads before they reach the service layer.

### `src/utils/*`
- Reusable helpers such as response formatting, async wrappers, and env parsing.

### `src/types/*`
- Shared TypeScript request/response payload types.

## 4. Complete API flow

```text
Client
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Prisma
  ↓
PostgreSQL
```

### Example flow: create product

1. HTTP request hits `POST /products`.
2. `productRoutes.ts` forwards the request to `productController.ts`.
3. `productController.ts` validates the request body and calls `createProductService`.
4. `productService.ts` applies business rules and delegates persistence to `productRepository.ts`.
5. `productRepository.ts` performs the Prisma `create` operation.
6. Prisma writes to PostgreSQL.
7. Response is returned to the client.

## 5. Reusable utilities

The following utility modules should remain shared and generic:

- `utils/env.ts` – environment variable loading and type-safe access
- `utils/asyncHandler.ts` – wraps async controller functions and centralizes error handling
- `utils/response.ts` – standard response helpers for success / error payloads
- `middleware/errorHandler.ts` – global error transformation
- `middleware/auth.ts` – JWT or session validation

## 6. Production recommendations

- Keep feature modules isolated and do not mix unrelated logic in one folder.
- Prefer domain-oriented folders over a single large `src` root.
- Add validation and error handling before business logic.
- Keep database access behind repositories only.
- Keep controllers thin and declarative.
