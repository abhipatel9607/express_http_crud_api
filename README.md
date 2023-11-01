<!-- @format -->

# TODO CRUD API

This is a simple CRUD (Create, Read, Update, Delete) API for managing TODOs. It uses Node.js, Express, and PostgreSQL for data storage.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Validation](#validation)
- [Acknowledgments](#acknowledgments)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js: Make sure you have Node.js installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).

- PostgreSQL: You'll need a PostgreSQL database. You can download it from [https://www.postgresql.org/](https://www.postgresql.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-crud-api.git
   ```

2. Change to the project directory:

   ```bash
   cd todo-crud-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the database:

- Create a PostgreSQL database named **todo_crud_api**.

5. Configure the database connection:

- Open the **src/db/database.js** file and update the database connection details (e.g., username, password, host, port).

6. Start the server:

```bash
npm start
```

The server should now be running at **http://localhost:8000.**

## API Endpoints

- **GET /todos**: Get a list of all TODOs.
- **GET /todos/:id**: Get a specific TODO by ID.
- **POST /todos**: Create a new TODO.
- **PUT /todos/:id**: Update a TODO by ID.
- **DELETE /todos/:id**: Delete a TODO by ID.

## Usage

You can use tools like Postman to interact with the API or make API requests directly from your application.

## Validation

The API includes request body and parameter validation using Yup. Invalid requests will receive a 400 Bad Request response.

## Acknowledgments

Thanks to the creators of Express, PostgreSQL, and Yup for providing the tools that make this project possible.
