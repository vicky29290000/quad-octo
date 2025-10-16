import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState([])
  const [uploads, setUploads] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all users (admin can see all)
      const { data: usersData } = await supabase.from('users').select('*')
      setUsers(usersData || [])
      
      // Fetch all uploads (admin can see all)
      const { data: uploadsData } = await supabase.from('uploads').select('*')
      setUploads(uploadsData || [])
    }
    fetchData()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  <button className="text-blue-500 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">File Management</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Filename</th>
              <th className="border p-2">Uploaded By</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((upload) => (
              <tr key={upload.id}>
                <td className="border p-2">{upload.filename}</td>
                <td className="border p-2">{upload.uploaded_by}</td>
                <td className="border p-2">{new Date(upload.uploaded_at).toLocaleDateString()}</td>
                <td className="border p-2">
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default AdminDashboard