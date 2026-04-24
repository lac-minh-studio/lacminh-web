# Action response shape and error codes

Purpose: canonical return object for Actions. Agents must follow this shape.

Success shape
```
{
  success: true,
  data: T,
  meta?: object
}
```

Error shape
```
{
  success: false,
  error: {
    code: string,        // machine code e.g. VALIDATION_ERROR
    message: string,     // human-friendly message (VN for validation messages)
    httpStatus: number,  // canonical HTTP mapping
    details?: object     // optional structured details for debugging
  }
}
```

Standard error codes (mapping)
- VALIDATION_ERROR -> 400
- AUTH_ERROR -> 401
- FORBIDDEN -> 403
- NOT_FOUND -> 404
- CONFLICT -> 409
- RATE_LIMIT -> 429
- IDEMPOTENCY_CONFLICT -> 409
- STORAGE_ERROR -> 503
- INTERNAL_ERROR -> 500

Guidelines
- Actions should never return raw stack traces. Log stacks internally (pino) and return a safe `message`.
- Use the `code` field for programmatic checks in FE or other services.
- For create operations, return 409/IDEMPOTENCY_CONFLICT when an idempotency key collision is detected.
