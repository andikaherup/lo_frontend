import React, { ChangeEvent } from 'react'

interface RadioButtonProps {
  value: string
  selectedValue: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: React.FC<RadioButtonProps> = ({ value, selectedValue, onChange }) => {
  return (
    <label className={`flex items-center space-x-2`}>
      <input type='radio' className='hidden' value={value} checked={selectedValue === value} onChange={onChange} />
      <div
        className={`relative flex items-center justify-center w-12 h-12 ${
          selectedValue == value ? 'bg-black-300' : 'bg-gray-600'
        }  border border-gray-300 rounded-lg hover:bg-gray-500 hover:cursor-pointer`}
      >
        <div
          className={`flex items-center justify-center w-8 h-8    ${
            selectedValue == value ? 'text-white-300 border-white-300 border-2' : 'text-black-300 border-black-300'
          }  bg-gray-300 border rounded-full `}
        >
          <span className='text-xs font-semibold'>{value}</span>
        </div>
      </div>
    </label>
  )
}

export default RadioButton
