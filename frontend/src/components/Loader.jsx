import React from 'react'
import {LoaderIcon} from 'lucide-react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center text-white'>
      <LoaderIcon className="size-10 animate-spin "/>
    </div>
  )
}

export default Loader
