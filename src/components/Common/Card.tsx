import React from 'react'

type CardProps = {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`p-4 shadow-md rounded-xl bg-surface border-border ${className ?? ''}`}>
      {children}
    </div>
  )
}
