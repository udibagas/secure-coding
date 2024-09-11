- Authentication
  - [v] hashing password
- [v] Authorization
- [v] Error handling

  - Response status yang sesuai
  - Client (4xx) => kasih tau detail errornya

    - 400 : Bad request (validation)
    - 401 : Unauthenticated (belum login)
    - 403 : Forbidden (role ga sesuai)
    - 404 : Not found

  - Server (500)
    - Jangan kasih tau detail
    - Internal Server Error
    - Jangan tampilkan stack
    - Jangan tampilkan env
    - set NODE_ENV=production

- Validation
  - [v] middleware (express-validator)
  - [v] model (sequelize validation)
  - [v] file
- [v] SQL Parameterization
- Secure configuration
  - [v] .env
  - [v] package management (npm audit)
