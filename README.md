# Zurich Assessment
This code is part of Zurich Fullstack Senior Developer assessment. It's using NX monorepo to manage the project. Under the hood, it's using NestJS for the API and NextJS for the WEB.

## Prerequisites

- Node.js v22.11.0
- Docker with docker-compose
- Yarn

## Project Structure

```
├── apps/
│   ├── api/          # NestJS API application
│   └── web/          # NextJS web application
├── libs/
│   └── api/
│       ├── auths/    # Authentication library
│       ├── products/ # Products library
│       ├── users/    # Users library
│       └── utils/    # Shared utilities
```

## Getting Started - API

### API Documentation
Once the API is running, it will be available at `http://localhost:5000/api/docs`

### Development

1. Clone the repository:
```bash
git clone https://github.com/johnpozy/zurich-assessment.git
```
2. Navigate to the project directory:
```bash
cd zurich-assessment
```
3. Install dependencies:
```bash
yarn install
```
4. Start the PostgreSQL database using Docker:
```bash
docker compose up -d
```
5. Start the API development server:
```bash
yarn start:api
```

### Testing

#### Example Users
There are two example users for testing. Use the following credentials to login:

| ID | Username | Password | Role  |
|----|----------|----------|-------|
| 1  | admin    | password | admin |
| 2  | user     | password | user  |

#### Available API Endpoints
- `GET /products` - Get all products
- `POST /products` - Create a new product
- `PUT /products` - Update a product
- `DELETE /products` - Delete a product
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

## Getting Started - WEB
