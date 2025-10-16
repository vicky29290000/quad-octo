import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface FileUploadProps {
  packageId: string
  onUpload: () => void
}

export default function FileUpload({ packageId, onUpload }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, file)

    if (error) {
      console.error('Upload error:', error)
      setUploading(false)
      return
    }

    // Create upload record in database
    const { data: uploadData, error: dbError } = await supabase
      .from('uploads')
      .insert({
        name: file.name,
        type: file.name.endsWith('.pdf') ? 'pdf' : 'jpeg',
        uploaded_by: (await supabase.auth.getUser()).data.user?.id,
        url: data?.path,
        package_id: packageId,
        version: '1.0', // You might want to generate this differently
        date: new Date().toISOString(),
      })

    if (dbError) {
      console.error('Database error:', dbError)
    } else {
      onUpload()
    }
    setUploading(false)
  }

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.jpeg,.jpg"
        onChange={handleFileUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  )
}