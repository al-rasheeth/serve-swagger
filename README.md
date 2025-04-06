# Swagger API Documentation Server

A simple Node.js server that serves OpenAPI/Swagger specification files and provides a UI for testing the APIs.

## Features

- Automatically loads all Swagger JSON files from the `src/swagger` directory
- Provides a Swagger UI interface for each API specification
- Lists all available APIs on the root endpoint

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
3. Access the Swagger UI:
   - Visit `http://localhost:3000` to see a list of all available APIs
   - Each API documentation is available at `http://localhost:3000/api-docs/{api-name}`

## Adding New API Specifications

1. Create a new JSON file in the `src/swagger` directory
2. The file should contain a valid OpenAPI/Swagger specification
3. The server will automatically load the new specification when restarted

## Example

A sample Petstore API specification is included in `src/swagger/petstore.json`. You can access its documentation at:
`http://localhost:3000/api-docs/petstore` 