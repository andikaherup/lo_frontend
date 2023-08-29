import React, { ChangeEvent } from 'react'

interface RadioGroupProps {
  valueRadio: number | undefined
  onRadioChange: (value: number) => void
}
interface RadioButtonProps {
  value: number
  selectedValue: number | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const StatisfactionRadio: React.FC<RadioGroupProps> = ({ valueRadio, onRadioChange }) => {
  const RadioButton: React.FC<RadioButtonProps> = ({ value, selectedValue, onChange }) => {
    const getImage = (value: number) => {
      switch (value) {
        case 1:
          return 'angryface.svg'
        case 2:
          return 'sadface.svg'
        case 3:
          return 'neutralface.svg'
        case 4:
          return 'happyface.svg'
        case 5:
          return 'pleasedface.svg'
      }
    }

    return (
      <label className={`flex items-center space-x-2`}>
        <input type='radio' className='hidden' value={value} checked={selectedValue === value} onChange={onChange} />
        <div
          className={`relative flex items-center justify-center w-12 h-12 ${
            selectedValue == value
              ? value == 1
                ? 'bg-red-500'
                : value == 2
                ? 'bg-purple-500'
                : value == 3
                ? 'bg-yellow-500'
                : value == 4
                ? 'bg-lightProtector'
                : 'bg-green-500'
              : 'bg-gray-600'
          }  rounded-full hover:bg-gray-500 hover:cursor-pointer`}
        >
          {/* <div
            className={`flex items-center justify-center w-8 h-8    ${
              selectedValue == value ? 'text-white-300 border-white-300 border-2' : 'text-black-300 border-black-300'
            }  bg-gray-300 border rounded-full `}
          > */}
          <img src={`/assets/icon/${getImage(value)}`} className='object-cover' alt='iamges' />
          {/* </div> */}
        </div>
      </label>
    )
  }

  // const [value, setValue] = useState<number>()
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    // if (!disable) {
    //   onChange(Number(event.target.value))
    // }
    onRadioChange(Number(event.target.value))
  }

  return (
    <div className='flex flex-col items-center justify-center w-full px-5 '>
      <div className='flex items-center justify-center'>
        {/* <h1 className='hidden font-extrabold lg:flex '> Extremely Unhappy</h1> */}
        <RadioButton value={1} selectedValue={valueRadio} onChange={handleRadioChange} />
        <RadioButton value={2} selectedValue={valueRadio} onChange={handleRadioChange} />
        <RadioButton value={3} selectedValue={valueRadio} onChange={handleRadioChange} />
        <RadioButton value={4} selectedValue={valueRadio} onChange={handleRadioChange} />
        <RadioButton value={5} selectedValue={valueRadio} onChange={handleRadioChange} />
        {/* <h1 className='hidden ml-2 font-extrabold lg:flex '>Extremely Happy</h1> */}
      </div>
      <div className='flex items-center justify-between w-full mt-2'>
        <div className='flex justify-start w-full'>
          <h1 className='flex ml-2 text-xs font-extrabold '>Extremely Unhappy</h1>
        </div>
        <div className='flex justify-end w-full'>
          <h1 className='flex ml-2 text-xs font-extrabold '>Extremely Happy</h1>
        </div>
      </div>
    </div>
  )
}

export default StatisfactionRadio
