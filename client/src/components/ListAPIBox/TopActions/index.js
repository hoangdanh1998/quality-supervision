import React from 'react'
import clsx from 'clsx'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import styles from '../ListAPIBox.module.scss'

function TopActions(props) {
  const { search, setSearch, onAddProject } = props

  return (
    <div className='w-full flex'>
      <Button
        icon="pi pi-plus"
        className='mr-2'
        onClick={onAddProject}
      />
      <span className={clsx('p-input-icon-left', 'flex-grow-1', styles.search_api)}>
        <i className="pi pi-search" />
        <InputText
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='p-inputtext-sm'
          placeholder="Search API by name"
        />
      </span>
    </div>
  )
}

export default TopActions