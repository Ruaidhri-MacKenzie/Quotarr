# Quotarr

## Scripts

Install npm packages for server and client, build client and start production server
````
npm run setup
````

Start server and client development servers
````
npm run dev
````

Build client and start production server
````
npm start
````

## Environments

### Development 
Development server is connected to testing database. Client development server allows for live preview.

### Production 
Production server is connected to production database. Client is built into static resources. Requires a valid SSL certificate as requests must be made with HTTPS.