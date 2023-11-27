import React from 'react'

interface HTMLDisplayProps {
  htmlContent?: string // Make the prop optional by adding "?"
}

const HTMLDisplayComponent: React.FC<HTMLDisplayProps> = ({ htmlContent }) => {
  if (!htmlContent) return null // Add a check for undefined content

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

export default HTMLDisplayComponent
