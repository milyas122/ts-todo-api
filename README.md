# Typescript Todo API

### Prerequisites

1. Ensure that you have MySQL installed locally.

### Environment Variables

Create a `.env` file at the root of your project with the following variables:

```env
DB_HOST=your_db_host
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_PORT=your_database_port

PORT=your_api_port
JWT_SECRET=your_jwt_secret
```

### Dependency Injection

To follow the best software engineering practices, this project adopts the Dependency Injection pattern as a fundamental aspect of code organization. Dependency injection is a design pattern that facilitates the management of dependencies, fostering modularity and enhancing code testability.

The project leverages dependency injection specifically for the management of services, repositories and api. This approach ensures that all these modules are decoupled from their concrete implementations, promoting a more flexible and scalable architecture.

### Database Seeding

To initialize the database with an initial admin user, I have followed a well-structured guide available in the [TypeORM Seeding Article](https://www.testingfly.com/articles/seed-database-using-typeorm-seeding). This article provides a comprehensive walkthrough for leveraging typeorm-extension Seeding to seamlessly populate your database with essential admin user data. And also ensured that admin user should be idempotent.

### Run the Application

1. Install dependencies
   ```
   npm install
   ```
2. Run the application
   ```
   npm run dev
   ```
   Note: Please find the postman collection for api testing.
