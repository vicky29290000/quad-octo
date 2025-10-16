import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '../types'

interface DashboardProps {
  user: User
}

export default function Dashboard({ user }: DashboardProps) {
  const [userUploads, setUserUploads] = useState([])
  const [allUploads, setAllUploads] = useState([]) // For admins

  useEffect(() => {
    const fetchData = async () => {
      // Get user's uploads
      const { data: userUploads } = await supabase
        .from('uploads')
        .select('*')
        .eq('uploaded_by', user.id)

      setUserUploads(userUploads || [])

      // If admin, get all uploads
      if (user.role === 'super_admin' || user.role === 'admin') {
        const { data: allUploads } = await supabase
          .from('uploads')
          .select('*')
        setAllUploads(allUploads || [])
      }
    }
    fetchData()
  }, [user.id])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Show different content based on user role */}
      {user.role === 'client' && (
        <div>
          <h2 className="text-xl mb-4">Your Uploads</h2>
          {/* Show client's uploads and upload form */}
        </div>
      )}
      
      {user.role === 'architect' && (
        <div>
          <h2 className="text-xl mb-4">Projects and Uploads</h2>
          {/* Show architect's view with client and structural team links */}
        </div>
      )}
      
      {user.role === 'structural_team' && (
        <div>
          <h2 className="text-xl mb-4">Structural Projects</h2>
          {/* Show structural team's view with architect links */}
        </div>
      )}
      
      {user.role === 'admin' && (
        <div>
          <h2 className="text-xl mb-4">Admin Dashboard</h2>
          {/* Show all uploads and user management */}
        </div>
      )}
      
      {user.role === 'super_admin' && (
        <div>
          <h2 className="text-xl mb-4">Super Admin Dashboard</h2>
          {/* Show everything plus system settings */}
        </div>
      )}
    </div>
  )
}