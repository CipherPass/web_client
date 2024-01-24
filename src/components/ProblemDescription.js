import React from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'

const ProblemDescription = ({ problem }) => {
  console.log('ProblemDescription: ', problem)
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{problem.title}</h2>
      {/* Render Markdown content */}
      <MarkdownPreview
        source={problem.description}
        wrapperElement={{
          'data-color-mode': 'light',
        }}
      />
    </div>
  )
}

export default ProblemDescription
