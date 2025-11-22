import React from 'react'

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-4 shadow-md rounded-xl bg-surface border-border'>
      {children}
    </div>
  )
}
