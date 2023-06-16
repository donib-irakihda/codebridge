## Getting Started

### Clone the Repository

```
git clone https://github.com/donib-irakihda/codebridge.git
```

### Set Up Environment Variables

1. Create your own MS SQL database.
2. Provide the database details in the `.env` file located in the project's root directory:
   ```
   DB_NAME=<your_database_name>
   DB_USERNAME=<your_database_username>
   DB_HOST=localhost
   DB_PASSWORD=<your_database_password>
   PORT=3000
   ```

### Installation

Install the project dependencies:

```
npm install
```

## Usage

### Run the Project

```
npm run dev
```

The project will be accessible at http://localhost:3000.

### Run the Tests

```
npm test
```

### Seed the Database

```
npm run seed
```

This command will populate the database with sample data.

Please note that you should replace `<your_database_name>`, `<your_database_username>`, and `<your_database_password>` with your actual database information.
