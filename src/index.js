const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Directory where Swagger JSON files are stored
const swaggerDir = path.join(__dirname, 'swagger');

// Function to read all Swagger JSON files
function getSwaggerSpecs() {
    const specs = {};
    const files = fs.readdirSync(swaggerDir);
    
    files.forEach(file => {
        if (file.endsWith('.json')) {
            const specName = path.basename(file, '.json');
            specs[specName] = require(path.join(swaggerDir, file));
        }
    });
    
    return specs;
}

// Serve Swagger UI for each specification
const specs = getSwaggerSpecs();
Object.entries(specs).forEach(([name, spec]) => {
    app.use(`/api-docs/${name}`, swaggerUi.serve, swaggerUi.setup(spec));
});

// Root endpoint to list all available APIs
app.get('/', (req, res) => {
    const apiList = Object.keys(specs).map(name => ({
        name,
        url: `/api-docs/${name}`
    }));
    
    res.json({
        message: 'Welcome to the Swagger API Documentation Server',
        available_apis: apiList
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available API Documentation:');
    Object.keys(specs).forEach(name => {
        console.log(`- ${name}: http://localhost:${PORT}/api-docs/${name}`);
    });
}); 