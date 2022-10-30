import React from 'react'
import clsx from 'clsx'
import { Panel } from 'primereact/panel'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import styles from '../ListAPIBox.module.scss'

function ListAPIs() {
  const template = options => {
    const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
    const className = `${options.className} justify-content-start`;

    return (
      <div className={className} onClick={options.onTogglerClick}>
        <button className={options.togglerClassName}>
          <span className={toggleIcon} />
        </button>
        <span className='pl-1'>
          Blog Application
        </span>
      </div>
    )
  }

  return (
    <Panel headerTemplate={template} toggleable className={clsx('mt-3', styles.list_api)}>
      <div className={clsx('flex mt-1 p-2', styles.item_api)}>
        <Tag className="w-min mr-2 px-2 py-0" value="GET" severity="info" />
        <p>List Blogs</p>
      </div>
      <div className={clsx('flex mt-1 p-2', styles.item_api)}>
        <Tag className="w-min mr-2 px-2 py-0" value="GET" severity="info" />
        <p>Blog Detail</p>
      </div>
      <div className={clsx('flex mt-1 p-2', styles.item_api)}>
        <Tag className="w-min mr-2 px-2 py-0" value="POST" severity="warning" />
        <p>Add a Blog</p>
      </div>
      <div className={clsx('flex mt-1 p-2', styles.item_api)}>
        <Tag className="w-min mr-2 px-2 py-0" value="PATCH" severity="warning" />
        <p>Edit a Blog</p>
      </div>
      <div className={clsx('flex mt-1 p-2', styles.item_api)}>
        <Tag className="w-min mr-2 px-2 py-0" value="DELETE" severity="danger" />
        <p>Delete a Blog</p>
      </div>

      {/* Actions */}
      <Button
        icon="pi pi-plus"
        className='ml-2 mt-2 p-button-sm'
        onClick={() => { }}
      />
      <Button
        label='Run All!'
        className='w-10rem ml-2 mt-3 block p-button-sm'
        onClick={() => { }}
      />
    </Panel>
  )
}

export default ListAPIs