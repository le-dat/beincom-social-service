# Authentication API

This project provides a basic authentication API using Node.js, Express, TypeScript, and MongoDB with Mongoose. It includes endpoints for user registration, login, logout, and token refresh.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/auth-api.git
   cd auth-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   ```

## Configuration

Ensure you have a MongoDB instance running. You can configure the MongoDB URI in the `.env` file.

## Usage

1. Start the development server:

   ```sh
   npm start
   ```

2. The server will start on `http://localhost:3000`.

## API Endpoints

### Register

- **URL:** `/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }
  ```
- **Response:**
  - `201 Created` on success
  - `400 Bad Request` if the email already exists
  - `500 Internal Server Error` on server error

### Login

- **URL:** `/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - `200 OK` with tokens on success
  - `400 Bad Request` if the email or password is incorrect
  - `500 Internal Server Error` on server error

### Logout

- **URL:** `/logout`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "refreshToken": "your_refresh_token"
  }
  ```
- **Response:**
  - `204 No Content` on success
  - `500 Internal Server Error` on server error

### Refresh Token

- **URL:** `/refresh-token`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "refreshToken": "your_refresh_token"
  }
  ```
- **Response:**
  - `200 OK` with new tokens on success
  - `400 Bad Request` if the refresh token is invalid or user not found
  - `500 Internal Server Error` on server error

## Error Handling

All endpoints return appropriate HTTP status codes and error messages in case of failures. Common error responses include:

- `400 Bad Request`: Invalid input or missing required fields.
- `500 Internal Server Error`: An unexpected error occurred on the server.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
