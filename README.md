# Learn Platform Frontend

This frontend application, using NextJS, is a learning platform that allows users to access course content hosted on Railway.

## Prerequisites

- Node.js (version 16 or higher)
- npm (Node Package Manager)
- Railway CLI

## Running Locally

1. **Clone the repository:**
   ```bash
   git clone learn-platform-frontend
   cd learn-platform-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of your project and add the following:
   - [ ] TODO: Explain what these variables are for, and where to retrieve them.
   ```plaintext
        PGUSER
        PGHOST
        PGNAME
        PGPASSWORD
        PGPORT
        NEXT_PUBLIC_API_DOMAIN
   ```

   The `page.tsx` which displays all courses file will be rendered on app build, so we will need access to the postgres database. Ensure the database and API is deployed before deploying the frontend app. You can find the backend repo. 
   [TODO] Add link to learn-platform-api.

    For testing the deployed postgres database, you can update the `.env.local` to point to the postgres database variables in Railway.

4. **Run the application:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

   You will see the course page with a list of courses.

## Deploying on Railway

- [ ] TODO: Replace with steps to deploy from GH:

Your application should now be live on Railway!

## Additional Notes
- For any issues, refer to the [Railway documentation](https://docs.railway.app/).
