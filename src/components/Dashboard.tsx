import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminDashboard from './AdminDashboard'
import ArchitectDashboard from './ArchitectDashboard'
import StructuralTeamDashboard from './StructuralTeamDashboard'
import ClientDashboard from './ClientDashboard'

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  
  // In a real app, you'd fetch the user role from your database
  // For now, we'll use a placeholder - you'd replace this with actual user data
  const userRole = 'admin' // This would come from user metadata

  const renderDashboard = () => {
    switch(userRole) {
      case 'super_admin':
      case 'admin':
        return <AdminDashboard />
      case 'architect':
        return <ArchitectDashboard />
      case 'structural_team':
        return <StructuralTeamDashboard />
      case 'client':
        return <ClientDashboard />
      default:
        return <div>Unauthorized</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {renderDashboard()}
    </div>
  )
}

export default Dashboard