import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '../types'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Get user role from database
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()
        setUser(userData)
      }
    }
    getUser()
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Role-based content will go here */}
      <p>Welcome, {user.email}</p>
      <p>Your role: {user.role}</p>
    </div>
  )
}