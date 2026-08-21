# 02 — Target System Architecture

## 1. Kiến trúc tổng thể

```text
┌────────────────────┐          ┌────────────────────┐
│      HOME FE       │          │      ADMIN FE      │
│      Client        │          │      Client        │
└─────────┬──────────┘          └─────────┬──────────┘
          │                               │
          │ HTTP                          │ HTTP
          └───────────────┬───────────────┘
                          ▼
                ┌────────────────────┐
                │     API SERVER     │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ Persistence Layer  │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ MongoDB / Firebase │
                └────────────────────┘
```

## 2. Extractable Modular Monolith

Repository hiện tại được tổ chức như một **Extractable Modular Monolith**:

```text
một repository hiện tại
        ↓
3 top-level domain độc lập
        ↓
Home | Admin | API
```

Mục tiêu là khi cần tách:

```text
lacminh-home
lacminh-admin
lacminh-api
```

việc tách chủ yếu là:

- di chuyển source;
- bootstrap/deployment từng app;
- cập nhật base API URL/router/config;

không phải gỡ dependency chéo giữa ba codebase.

## 3. Top-level domain

### Home

Public-facing frontend. Sở hữu:

- public route presentation;
- client state;
- client-side interaction;
- Home API integration;
- Home Design Foundation.

Không sở hữu authoritative business rule.

### Admin

Management frontend. Sở hữu:

- administration UI;
- CRUD/form/table client flow;
- management state;
- permission-aware presentation;
- Admin API integration.

Admin vẫn là client.

### API

Server-side backend. Sở hữu:

- authoritative business model;
- business rules;
- application use case;
- HTTP-facing backend presentation;
- persistence abstraction và implementation;
- database access.

## 4. Business capability matrix

```text
                  HOME            ADMIN              API

Studio            Display         Manage             Business/Data owner
Portfolio         Display         Manage             Business/Data owner
Recruitment       Browse/Apply    Manage             Business/Data owner
Editorial         Read            Manage             Business/Data owner
Partnership       Submit          Manage             Business/Data owner
```

## 5. Cross-domain communication

### Cho phép

```text
Home  → HTTP → API
Admin → HTTP → API
```

Home/Admin có thể dùng:

- native `fetch` ở Server Component / server-side flow;
- Server Action làm intermediary khi phù hợp;
- Axios/standard HTTP client ở Client Component.

Dù dùng mechanism nào, request vẫn phải đi qua API boundary.

### Không cho phép

```text
Home  → import API use case/repository/domain
Admin → import API use case/repository/domain
API   → import Home/Admin code
Home  → import Admin code
Admin → import Home code
```

## 6. Persistence boundary

Persistence là server-side concern thuộc API.

```text
Home/Admin
    ↓ HTTP
API
    ↓
Persistence
    ↓
MongoDB/Firebase
```

Không có:

```text
Home  → Firebase/MongoDB
Admin → Firebase/MongoDB
```

trong architecture mục tiêu.
