# Learn Platform Frontend

This frontend application, using NextJS, is a learning platform that allows users to access course content hosted on Railway.

## Prerequisites

- Node.js (version 16 or higher)
- npm (Node Package Manager)
- Railway CLI

## Frontend Deployment
The frontend is created using NextJs. We can deploy the backend via `GitHub Repo` by selcting the `learn-platform` repository and deploying the `production` and `staging` branches to separate environments: https://github.com/relaxedtomato/learn-platform.

After doing this, we need to add the following environment variables (preferrably as shared) to use across the Railway project:
```plaintext
   PGUSER (available from Railway PostgresSQL service)
   PGHOST (available from Railway PostgresSQL service)
   PGNAME=railway (the database name by default is railway)
   PGPASSWORD (available from Railway PostgresSQL service)
   PGPORT (available from Railway PostgresSQL service)
   NEXT_PUBLIC_API_DOMAIN (public URI of learn-platform-api service)
```

Ensure the backend service is publicly available!

We need to connect to the database to statically generate the courses landing page on each build using a connection to the database. The API will be used to retrieve the individual course content.

Your application should now be live on Railway!

Visit the public URL to view all courses and click on a course to review the course content.

## Additional Notes
- For any issues, refer to the [Railway documentation](https://docs.railway.app/).
