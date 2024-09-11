this is an ticket management system

# Ticket Management System API

A comprehensive API for managing tickets, users, and analytics. Built with **Node.js**, **TypeScript**, **Express**, and **PostgreSQL**.

## Features

- **User Management**: Create users (`customer` or `admin`), secure authentication via JWT.
- **Ticket Management**: Create, assign, and track tickets with details like status, priority, and due date.
- **Analytics**: Detailed ticket statistics and history.

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL (raw SQL queries)
- **Authentication**: JWT

## Endpoints

### User Management

- **Create User**: `POST /users`
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "type": "customer",
    "password": "password123"
  }
  ```

- **Login**: `POST /auth/login`
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Ticket Management

- **Create Ticket**: `POST /tickets` (Auth required)
  ```json
  {
    "title": "Ticket Title",
    "description": "Ticket Description",
    "type": "concert",
    "venue": "Venue Name",
    "status": "open",
    "price": 223,
    "priority": "high",
    "dueDate": "2024-08-01T18:00:00Z",
    "createdBy": "user_id"
  }
  ```

- **Assign User**: `POST /tickets/:ticketId/assign` (Auth required)
  ```json
  {
    "userId": "user_id"
  }
  ```

- **Get Ticket Details**: `GET /tickets/:ticketId` (Auth required)

### Ticket Analytics

- **Ticket History**: `GET /tickets/analytics` (Auth required)
- **Dashboard Analytics**: `GET /dashboard/analytics` (Auth required)

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/shivam-m-7/TicketManagementSystem.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up `.env`:
   ```bash
   DB_HOST=localhost
   DB_USER=youruser
   DB_PASS=yourpass
   JWT_SECRET=your_jwt_secret
   NODE_ENV
   ```
4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the server:
   ```bash
   pnpm run dev
   ```

## Testing

Run tests:
```bash
npm run test
```

---


