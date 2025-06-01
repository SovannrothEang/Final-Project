# Project Documentation

This project consists of a Laravel backend and a Next.js frontend.

## Project Details

- **Backend:** Developed using the Laravel framework.
- **Frontend:** Developed using the Next.js framework.

## Getting Started

To run this project locally, you will need:

- PHP (with necessary extensions for Laravel)
- Composer
- Node.js
- npm or yarn
- A database (e.g., PostgreSQL, MySQL)

**Note:** If you are using Docker, you can run a PostgreSQL container with the following command:

```bash
docker run --name=finalprojectdb -p 5432:5432 -e POSTGRES_USER=laravel -e POSTGRES_PASSWORD=secret123 -d postgres:15
```

## Running Locally

Follow these steps to set up and run the project on your local machine:

### We can run these commands from the root directory

1. Install dependencies

   ```bash
   # for frontend
   npm install

   # for backend
   npm run install:backend

   # noted: to run docker, or configure the database service before running the migration
   npm run migrate:backend
   ```

   1.1. Installation for frontend

   1. Navigate to the backend directory:
      ```bash
      cd app/backend
      ```
   2. Install PHP dependencies:
      ```bash
      composer install
      ```
   3. Copy the example environment file and configure your database connection:
      ```bash
      cp .env.example .env
      ```
      Edit the `.env` file with your database credentials and other configurations.
   4. Generate the application key:
      ```bash
      php artisan key:generate
      ```
   5. Run database migrations:
      ```bash
      php artisan migrate
      ```
   6. Start the Laravel development server:
      ```bash
      php artisan serve
      ```

2. Run the development server

   ```bash
   # for Frontend
   npm run start:frontend

   # for Backend
   npm run start:backend
   ```

### Backend Setup (Laravel)

### Frontend Setup (Next.js)

1.  Navigate to the frontend directory:
    ```bash
    cd app/frontend
    ```
2.  Install Node.js dependencies:
    ```bash
    npm install # or yarn install
    ```
3.  Run the Next.js development server:
    ```bash
    npm run dev # or yarn dev
    ```

The frontend application should now be running and communicating with the locally running backend.
