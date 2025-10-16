# Quad Plus Architects - Role-Based Access Control System

## Setup Instructions

### Prerequisites
- Node.js 16+
- PostgreSQL database
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd quad-plus-architects
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Database Setup**
Run the SQL migrations to create tables and set up Row-Level Security policies.

5. **Start the development server**
```bash
npm run dev
```

### Features Implemented

- ✅ Role-based authentication (Super Admin, Admin, Architect, Structural Team, Client)
- ✅ Row-Level Security (RLS) for data access control
- ✅ File upload with type restriction (PDF, JPEG)
- ✅ Responsive design with Tailwind CSS
- ✅ Supabase integration for authentication and storage
- ✅ Role-based dashboard components

### File Structure
```
src/
├── components/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── FileUpload.tsx
│   ── role-specific dashboards
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   └── supabase.ts
└── App.tsx
```

### Security Features
- Row-Level Security on all database tables
- Authentication required for all operations
- Role-based access control on frontend and backend
- File type validation on upload