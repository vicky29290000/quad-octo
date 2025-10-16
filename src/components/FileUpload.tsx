import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

interface FileUploadProps {
  userRole: string
  allowedFileTypes: string[]
}

const FileUpload: React.FC<FileUploadProps> = ({ userRole, allowedFileTypes }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async () => {
    if (!selectedFile) return
    
    setUploading(true)
    try {
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false
        })
      
      if (error) throw error
      
      // Store file metadata in database
      const { error: dbError } = await supabase
        .from('uploads')
        .insert({
          filename: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id
        })
      
      if (dbError) throw dbError
      
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept={allowedFileTypes.join(',')}
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleFileUpload}
        disabled={uploading || !selectedFile}
        className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  )
}

export default FileUpload