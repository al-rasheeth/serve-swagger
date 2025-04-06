const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Directory where Swagger JSON files are stored
const swaggerDir = path.join(__dirname, 'swagger');

// Function to get list of available specs
function getAvailableSpecs() {
    const files = fs.readdirSync(swaggerDir);
    return files
        .filter(file => file.endsWith('.json'))
        .map(file => path.basename(file, '.json'));
}

// Function to read a spec file
function readSpecFile(name) {
    const filePath = path.join(swaggerDir, `${name}.json`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Serve Swagger UI for each specification
const availableSpecs = getAvailableSpecs();
availableSpecs.forEach(name => {
    // Create a new router for each specification
    const router = express.Router();
    
    // Serve the Swagger UI
    router.use('/', swaggerUi.serve);
    
    // Setup Swagger UI with the spec
    router.get('/', (req, res) => {
        const spec = readSpecFile(name);
        if (!spec) {
            return res.status(404).send('Specification not found');
        }
        swaggerUi.setup(spec)(req, res);
    });
    
    // Mount the router
    app.use(`/api-docs/${name}`, router);
});

// Root endpoint to list all available APIs
app.get('/', (req, res) => {
    const apiList = availableSpecs.map(name => {
        const spec = readSpecFile(name);
        return {
            name,
            url: `/api-docs/${name}`,
            title: spec?.info?.title || name,
            description: spec?.info?.description || 'No description available',
            version: spec?.info?.version || 'N/A'
        };
    });
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>API Documentation Server</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                line-height: 1.6;
            }
            h1 {
                color: #333;
                border-bottom: 2px solid #eee;
                padding-bottom: 10px;
            }
            .api-list {
                list-style: none;
                padding: 0;
            }
            .api-item {
                background: #f9f9f9;
                margin: 10px 0;
                padding: 15px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .api-item h2 {
                margin: 0 0 10px 0;
                color: #2c3e50;
            }
            .api-item p {
                margin: 5px 0;
                color: #666;
            }
            .api-link {
                display: inline-block;
                background: #3498db;
                color: white;
                padding: 8px 15px;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 10px;
            }
            .api-link:hover {
                background: #2980b9;
            }
            .version {
                color: #7f8c8d;
                font-size: 0.9em;
            }
        </style>
    </head>
    <body>
        <h1>Available API Documentation</h1>
        <ul class="api-list">
            ${apiList.map(api => `
                <li class="api-item">
                    <h2>${api.title}</h2>
                    <p>${api.description}</p>
                    <p class="version">Version: ${api.version}</p>
                    <a href="${api.url}" class="api-link">View Documentation</a>
                </li>
            `).join('')}
        </ul>
    </body>
    </html>
    `;
    
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available API Documentation:');
    availableSpecs.forEach(name => {
        console.log(`- ${name}: http://localhost:${PORT}/api-docs/${name}`);
    });
}); 