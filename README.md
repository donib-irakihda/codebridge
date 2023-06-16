# CodeBridge Task

## Getting Started

To get started with the CodeBridge API, follow the instructions below.

### Prerequisites

Before running the application, make sure you have the following software installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MS SQL Server

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/donib-irakihda/codebridge.git
   ```

2. Navigate to the project directory:

   ```bash
   cd codebridge
   ```

3. Set up environment variables:

   Create a file named `.env` in the project root directory and provide the following details for your MS SQL database:

   ```plaintext
   DB_NAME=<your_database_name>
   DB_USERNAME=<your_database_username>
   DB_HOST=localhost
   DB_PASSWORD=<your_database_password>
   PORT=3000
   ```

   Replace `<your_database_name>`, `<your_database_username>`, and `<your_database_password>` with your own database credentials.

4. Install the dependencies:

   ```bash
   npm install
   ```

5. Populate the database with seed data:

   ```bash
   npm run seed
   ```

   This command will populate the database with sample data for testing purposes.

6. Start the application:

   ```bash
   npm run dev
   ```

   The API will now be accessible at `http://localhost:3000`.

### API Documentation

The CodeBridge API provides the following endpoints:

- **GET /ping**: Retrieves the server status.

  ```bash
  curl http://localhost:3000/ping
  ```

  Expected response: `Dogshouseservice.Version1.0.1`

- **GET /dogs**: Retrieves the list of dogs.

  ```bash
  curl http://localhost:3000/dogs
  ```

  Expected response: An array of dogs in JSON format.

- **POST /dogs**: Creates a new dog.

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{
    "name": "Doggy",
    "color": "red",
    "tail_length": 173,
    "weight": 33
  }' http://localhost:3000/dogs
  ```

  Expected response: A success message with the newly created dog's details in JSON format.

## Testing

To run the tests for the CodeBridge API, use the following command:

```bash
npm test
```

This will execute the test suite and display the test results.
