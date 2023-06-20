import React, { ChangeEvent, useState } from 'react'
import RadioButton from './radioButton'

const RadioGroup: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('')

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  return (
    <div className='flex items-center justify-center px-5 '>
      <h1 className='hidden font-extrabold lg:flex'>Strongly Disagree</h1>
      <RadioButton value='1' selectedValue={selectedValue} onChange={handleRadioChange} />
      <RadioButton value='2' selectedValue={selectedValue} onChange={handleRadioChange} />
      <RadioButton value='3' selectedValue={selectedValue} onChange={handleRadioChange} />
      <RadioButton value='4' selectedValue={selectedValue} onChange={handleRadioChange} />
      <RadioButton value='5' selectedValue={selectedValue} onChange={handleRadioChange} />
      <h1 className='hidden font-extrabold lg:flex'>Strongly Agree</h1>
    </div>
  )
}

export default RadioGroup
