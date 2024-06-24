import React from 'react'


const SearchInput = ({value, onChange, placeHolder, className=''}) => {
  return (
    <div>
        <input 
            type='text'
            value={value}
            className={`
                border
                text-xs
                p-1
                h-[30px]
                outline-none
                w-full
                 ${className}
            `}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeHolder}
        />
    </div>
  )
}

export default SearchInput