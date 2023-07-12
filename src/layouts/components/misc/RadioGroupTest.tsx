import React, { ChangeEvent } from 'react'
import RadioButton from './radioButton'

interface RadioGroupProps {
  disable: boolean
  value: number
  onChange: (value: number) => void
}

const RadioGroup: React.FC<RadioGroupProps> = ({ value, onChange, disable }) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disable) {
      onChange(Number(event.target.value))
    }
  }

  return (
    <div className='flex items-center justify-center px-5'>
      <h1 className='hidden font-extrabold lg:flex'>Strongly Disagree</h1>
      <RadioButton value={1} selectedValue={value} onChange={handleRadioChange} />
      <RadioButton value={2} selectedValue={value} onChange={handleRadioChange} />
      <RadioButton value={3} selectedValue={value} onChange={handleRadioChange} />
      <RadioButton value={4} selectedValue={value} onChange={handleRadioChange} />
      <RadioButton value={5} selectedValue={value} onChange={handleRadioChange} />
      <h1 className='hidden ml-2 font-extrabold lg:flex'>Strongly Agree</h1>
    </div>
  )
}

export default RadioGroup
