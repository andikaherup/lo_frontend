import React, { ChangeEvent } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
interface RadioButtonProps {
  value: number
  selectedValue: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: React.FC<RadioButtonProps> = ({ value, selectedValue, onChange }) => {
  return (
    <label className={`flex items-center space-x-5`}>
      <input type='radio' className='hidden' value={value} checked={selectedValue === value} onChange={onChange} />
      <div
        className={`relative flex  items-center justify-center ${
          value == 1 || value == 5 ? 'w-12 h-12 ' : value == 2 || value == 4 ? 'w-10 h-10' : 'w-8 h-8'
        } ${
          selectedValue == value ? 'bg-purpleText' : 'bg-white-500'
        }  ring-2 ring-purpleText rounded-full hover:bg-purpleText  hover:cursor-pointer`}
      >
        {selectedValue != value && (
          <Icon
            icon='fa6-solid:check'
            width={value == 1 || value == 5 ? 30 : value == 2 || value == 4 ? 25 : 20}
            className=' text-white-500 hover:flex'
          />
        )}
        {selectedValue == value && (
          <Icon
            icon='fa6-solid:check'
            width={value == 1 || value == 5 ? 30 : value == 2 || value == 4 ? 25 : 20}
            className=' text-white-500 hover:flex'
          />
        )}
      </div>
    </label>
  )
}

export default RadioButton
