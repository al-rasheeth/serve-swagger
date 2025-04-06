# Swagger API Documentation Server

A simple Node.js server that serves OpenAPI/Swagger specification files and provides a UI for testing the APIs.

## Features

- Supports both Swagger 2.0 and OpenAPI 3.0 specifications
- Automatically loads all Swagger JSON files from the `src/swagger` directory
- Provides a Swagger UI interface for each API specification
- Beautiful HTML interface listing all available APIs
- Validates specification format before loading

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Place your Swagger JSON files in the `src/swagger` directory
2. Start the server:
   ```bash
   npm start
   ```
3. Access the API documentation:
   - Visit `http://localhost:3000` to see a list of all available APIs with descriptions
   - Each API documentation is available at `http://localhost:3000/api-docs/{api-name}`

## Adding New API Specifications

1. Create a new JSON file in the `src/swagger` directory
2. The file should contain a valid Swagger 2.0 or OpenAPI 3.0 specification
3. The server will automatically load the new specification when restarted

## Examples

Two sample API specifications are included:
1. Petstore API (OpenAPI 3.0) at `src/swagger/petstore.json`
2. User Management API (Swagger 2.0) at `src/swagger/user-api.json`

You can access their documentation at:
- `http://localhost:3000/api-docs/petstore`
- `http://localhost:3000/api-docs/user-api` 