// ProblemTabs.js
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileAlt,
  faEdit,
  faCode,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

const ProblemTabs = () => {
  const activeTab = 'description'

  const tabs = [
    {
      id: 'description',
      title: 'Description',
      icon: faFileAlt,
      disabled: false,
    },
    { id: 'editorial', title: 'Editorial', icon: faEdit, disabled: true },
    { id: 'submissions', title: 'Submissions', icon: faCode, disabled: true },
    { id: 'solution', title: 'Solution', icon: faCheckCircle, disabled: true },
  ]

  return (
    <div className="flex justify-around bg-gray-200 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex items-center space-x-2 p-1 rounded-md focus:outline-none text-sm ${
            tab.id === activeTab
              ? 'bg-blue-500 text-white'
              : tab.disabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-blue-500'
          }`}
          disabled={tab.disabled}
        >
          <FontAwesomeIcon icon={tab.icon} className="text-lg" />
          <span>{tab.title}</span>
        </button>
      ))}
    </div>
  )
}

export default ProblemTabs
