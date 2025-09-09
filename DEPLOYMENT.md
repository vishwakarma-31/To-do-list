# Deployment Instructions for Vercel

## Prerequisites
- Vercel account
- Google OAuth credentials (for authentication)

## Step 1: Set up Vercel Postgres Database
1. Go to your Vercel dashboard.
2. Navigate to the "Storage" tab.
3. Click "Create Database" and select "Postgres".
4. Choose a name for your database and select a region.
5. Once created, copy the `DATABASE_URL` from the connection details.

## Step 2: Configure Environment Variables in Vercel Dashboard
1. In your Vercel project dashboard, go to "Settings" > "Environment Variables".
2. Add the following variables:

   - `DATABASE_URL`: Paste the connection string from your Vercel Postgres database.
   - `NEXTAUTH_SECRET`: Generate a random secret string (e.g., using `openssl rand -base64 32`).
   - `NEXTAUTH_URL`: Set to `https://your-app-name.vercel.app` (replace with your actual Vercel app URL).
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID.
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret.

3. Ensure these variables are set for "Production", "Preview", and "Development" environments as needed.

## Step 3: Deploy to Vercel
1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the Next.js framework and use the build settings from `vercel.json`.
3. The build process will run `prisma generate` before building the app.
4. After deployment, run database migrations if needed (see below).

## Database Migrations
Since this is a serverless environment, you may need to run Prisma migrations manually:
1. After deployment, use the Vercel CLI or dashboard to run `npx prisma migrate deploy` in the production environment.
2. Alternatively, set up a build hook or use Vercel's functions to handle migrations.

## Notes
- The `vercel.json` file ensures the correct build command is used.
- The `package.json` build script includes `prisma generate` to create the Prisma client.
- Do not commit sensitive environment variables to your repository.