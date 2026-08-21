# 05 — API Architecture

## 1. Strategy đã chốt

API dùng:

> **Module-first, Layer-inside-module DDD**

Không dùng API-wide layer-first structure kiểu:

```text
controllers/
services/
repositories/
models/
```

Thay vào đó:

```text
domain/api/
├── studio/
├── portfolio/
├── recruitment/
├── editorial/
├── partnership/
└── _shared/
```

Mỗi business module tự chứa technical layer của nó.

## 2. 4 layer chuẩn

Mỗi API module dùng cùng một skeleton:

```text
recruitment/
├── domain/
├── application/
├── infrastructure/
└── presentation/
```

### `domain/`

Sở hữu authoritative business model và business rules.

Candidate concern:

- Entity;
- Value Object;
- business invariant;
- domain behavior;
- repository port/interface khi phù hợp.

### `application/`

Sở hữu application use case và orchestration.

Ví dụ conceptual:

```text
Create Job
Update Job
Publish Job
Close Job
Submit Application
```

Không cần áp CQRS ở V1.

### `infrastructure/`

Sở hữu technical implementation:

- MongoDB/Firebase integration;
- repository adapter;
- persistence mapping;
- external service integration.

Database SDK chỉ được xuất hiện ở server-side infrastructure concern phù hợp.

### `presentation/`

Backend presentation không phải React UI. Nó là transport-facing layer:

- HTTP handler/controller logic;
- request/response mapping;
- HTTP error mapping;
- transport-specific concern.

## 3. Next.js Route Handler

`app/(api)/api/**/route.ts` là framework adapter phía ngoài cùng.

```text
route.ts
   ↓
API module / presentation
   ↓
application
   ↓
domain
   ↑
infrastructure
   ↓
MongoDB/Firebase
```

Route Handler không phải toàn bộ backend architecture.

## 4. Dependency principle

Conceptual dependency:

```text
Presentation
     ↓
Application
     ↓
Domain

Infrastructure
     → implements technical ports/contracts
     → talks to persistence/external systems
```

Domain không biết MongoDB/Firebase.

## 5. Persistence

Persistence là API/server concern:

```text
API application/domain
       ↓
Persistence abstraction
       ↓
Infrastructure adapter
       ↓
MongoDB / Firebase
```

Database cụ thể chưa cần chốt để khóa architecture V1.

## 6. API security

Không bảo vệ API bằng React protected layout.

API security thuộc server boundary:

```text
request
  ↓
authentication
  ↓
authorization
  ↓
API presentation / route handler
  ↓
application
```

Endpoint public và admin-protected có thể cùng nằm dưới `/api`, nhưng quyền được enforce ở API boundary.

## 7. Error handling

Architecture phải cho phép chuẩn hóa lỗi:

```text
Domain/Application error
        ↓
API Presentation error mapping
        ↓
HTTP status + response contract
```

Không để từng route tự phát triển một format lỗi độc lập.

Chi tiết error code/DTO strategy sẽ được chốt khi bắt đầu implement API, không làm thay đổi kiến trúc 4 layer.

## 8. Không áp Atomic/UI concern cho API

Atomic Design, HeroUI, Design Foundation chỉ thuộc FE. API không phụ thuộc bất kỳ UI architecture nào.
