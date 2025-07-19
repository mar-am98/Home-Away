import { cn } from '@/lib/utils'
import React from 'react'

type containerProps = {
  children: React.ReactNode,
  className?: string,
}
function Container({children,className}:containerProps) {
  return (
    <div className={cn('mx-auto max-w-6xl xl:max-w-7xl md:px-4',className)}>
      {children}
    </div>
  )
}

export default Container