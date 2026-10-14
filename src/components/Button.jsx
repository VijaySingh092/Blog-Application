import React from 'react'

export default function Button({
    children,     // Content inside the button
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className = "",
    ...props   // Collects all remaining props
    }){
  return (
    <button 
    // {...props} = passes the remaining props directly to the HTML button.
    className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  )
}