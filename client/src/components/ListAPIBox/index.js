import React, { useState } from 'react'
import ListAPIs from './ListAPIs'
import TopActions from './TopActions'

function ListAPIBox() {
  // Để tạm ở đây, sau sẽ đẩy vào redux (1 project chứa list nhiều APIs)
  const [listProjects, setListProjects] = useState([])
  const [search, setSearch] = useState('')

  const handleAddProject = () => {
    setListProjects([
      ...listProjects,
      { id: Math.random(1), name: '', listAPIs: [] }
    ])
  }

  return (
    <div className='h-full p-3 border-round border-2 border-primary-400 bg-primary-100'>
      <TopActions {...{
        search, setSearch,
        onAddProject: handleAddProject
      }} />
      <ListAPIs />
    </div>
  )
}

export default ListAPIBox