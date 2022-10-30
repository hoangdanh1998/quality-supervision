import React from 'react'
import { ListAPIBox, RequestBox, CodeBox } from '../../components'

function Layout() {
  return (
    <div className='grid grid-nogutter p-4 h-screen'>
      <div className='col-fixed h-full'
        style={{ width: '300px' }}
      >
        <ListAPIBox />
      </div>
      <div className='col flex flex-column ml-3 border-round'>
        <div className='flex-grow-1 mb-3 p-2 bg-cyan-100 border-round border-2 border-cyan-400'>
          <RequestBox />
        </div>
        <div className='h-16rem p-2 bg-orange-100 border-round border-2 border-orange-500'>
          <CodeBox />
        </div>
      </div>
    </div>
  )
}

export default Layout