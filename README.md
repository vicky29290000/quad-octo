# Quad Plus Architects Application

## Setup Instructions

1. **Clone the repository** and navigate to the project directory.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase project URL and anon key

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Features

- **Authentication**: Email/password login with role-based access
- **File Uploads**: PDF and JPEG only, with metadata
- **Role-Based Access Control**: 
  - Super Admin: Full system access
  - Admin: User and content management
  - Architect: Project and client management
  - Structural Team: Project access
  - Client: File uploads and communication

- **Responsive Design**: Works on mobile, tablet, and desktop

## Security

- Row-Level Security (RLS) on all database tables
- File access restricted by user role
- Authentication required for all operations

## Deployment

The application is ready to deploy to any platform supporting Next.js and PostgreSQL.