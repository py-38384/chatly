'use client'

import clsx from "clsx"

const Button = ({type, className="", fullWidth, children, onClick, secondary, danger, disabled}) => {
  return (
    <button 
      onClick={onClick} 
      type={type}
      disabled={disabled}
      className={clsx(`flex justify-center rounded-md px-2 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : 'text-white',
        danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600:",
        !secondary && !danger && "bg-[#772f12] hover:bg-[#60250e] focus-visible:outline-[#60250e]",
      )}
    >
      {children}
    </button>
  )
}

export default Button