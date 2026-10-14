// The main purpose is to create one reusable input field that you can use for email, password, username, and other forms.

import React, {useId} from 'react'
// useId() = generates a unique ID for you without requiring you to write your own ID-generation logic or call any additional methods

// forwardRef allows a parent component to access a DOM element inside a child component.
// This section creates your reusable Input component.
const Input = React.forwardRef( function Input({
    label,  // Receives the label text from the parent.
    type = "text",
    className="",
    ...props
}, ref){  // forwardRef provides the parent's ref as the second argument to the inner function.

    const id = useId() //Generate a unique ID

 return (
    <div className='w-full'>
        {label && <label 
        className='block mb-1' 
        htmlFor={id}>
            {label}
        </label>
        }
        <input 
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}  //This attaches the received ref to the real HTML input.
        {...props}
        id={id} />
    </div>
 )
})

export default Input
