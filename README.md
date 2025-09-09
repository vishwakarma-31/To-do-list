# Zenith Tasks

A modern, full-stack task management application built with Next.js, TypeScript, Prisma, and NextAuth. Zenith Tasks allows users to create, manage, and track their tasks with a clean, intuitive interface. Features include user authentication via Google OAuth and email/password, task CRUD operations, and a responsive design with dark/light theme support.

## Live URL

[Zenith Tasks Live Demo](https://zenith-tasks.vercel.app) (placeholder - replace with actual deployment URL)

## Features

- **User Authentication**: Sign up and log in with Google OAuth or email/password
- **Task Management**: Create, read, update, and delete tasks
- **Real-time Updates**: Instant UI updates without page refreshes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Support**: Toggle between light and dark themes
- **Secure**: Protected routes and user-specific data access

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn
- PostgreSQL database (local or cloud)

## Local Development Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd zenith-tasks
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and configure your variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/zenith_tasks"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Set Up the Database

Ensure PostgreSQL is running and create a database for the project.

### 5. Run Database Migrations

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma db push
```

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Environment Variables

The application requires the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js (generate with `openssl rand -base64 32`) | Yes |
| `NEXTAUTH_URL` | Base URL for NextAuth.js (e.g., `http://localhost:3000` for development) | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID from Google Cloud Console | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret from Google Cloud Console | Yes |

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Project Structure

```
zenith-tasks/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable React components
│   ├── lib/                   # Utility functions and configurations
│   └── middleware.ts          # Next.js middleware
├── .env.example               # Environment variables template
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
