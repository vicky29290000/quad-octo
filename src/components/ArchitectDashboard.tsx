import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ArchitectDashboard: React.FC = () => {
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // Fetch projects assigned to this architect
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('architect_id', (await supabase.auth.getUser()).data.user?.id)
      
      setProjects(projectsData || [])
      
      // Fetch messages for this architect
      const { data: messagesData } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${(await supabase.auth.getUser()).data.user?.id},receiver_id.eq.${(await supabase.auth.getUser()).data.user?.id}`)
      
      setMessages(messagesData || [])
    }
    fetchData()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Architect Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="border p-4 rounded">
              <h3 className="text-lg font-medium">{project.name}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="border p-4 rounded">
              <p>{message.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(message.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ArchitectDashboard