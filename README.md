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


## Requirements

### Must:
-	~~Allow users to enter information for processing in terms of time periods of work (e.g. “man hours”)~~
- ~~Allow at least 1 worker for each project~~
-	~~Define hourly (or daily) rates for the workers~~
-	~~Calculate a final budget figure using some sensible function (described below)~~
-	~~Display some information on how the final budget figure was calculated (although this should not be entirely transparent, see “Fudge Factor” below)~~

### Should:
-	~~Allow users to access their own user accounts~~
-	~~Allow users to save and delete quotes. This should use a database.~~

### Could:
-	~~Allow users to change existing quotes~~
-	~~Have additional (dynamic) functionality for adding non-human resources to the calculation~~
-	~~Have different pay grades for selection (e.g. “subject expert”, “casual worker”)~~
-	~~Keep the hourly (or daily) rates private from users (i.e. users should not be able to directly see a worker’s hourly rate, and the “fudge factor” should stop them from easily reverse-engineering the cost)~~

### Would:
-	~~Incorporate sub-tasks for the project quote and give intermediate figures for those~~
-	~~Combine quotes~~
-	Allow an administrator to make changes to the pre-set pay grades
-	Allow an administrator to calculate a quote without the fudge factor
