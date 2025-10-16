export interface User {
  id: string
  email: string
  role: 'super_admin' | 'admin' | 'client' | 'architect' | 'structural_team'
  created_at: string
  updated_at: string
}

export interface Package {
  id: string
  name: string
  description: string
  price: number
  features: string[]
}

export interface Upload {
  id: string
  name: string
  type: 'pdf' | 'jpeg'
  version: string
  date: string
  notes: string
  uploaded_by: string
  url: string
  package_id: string
}