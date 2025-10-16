# Deployment Guide - Quad Plus Architects

## Prerequisites
- Node.js 16+
- PostgreSQL database
- Supabase account

## Environment Setup

1. **Set environment variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. **Database setup:**
```sql
-- Run the SQL migrations from src/migrations/
```

## Deployment Steps

1. **Build the application:**
```bash
npm run build
```

2. **Start the server:**
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Security Considerations
- All data is protected by Row-Level Security
- Authentication is required for all operations
- File uploads are restricted to specific types
- Role-based access control enforced

## Monitoring
- Check logs for any authentication errors
- Monitor file uploads for compliance
- Regularly review user permissions