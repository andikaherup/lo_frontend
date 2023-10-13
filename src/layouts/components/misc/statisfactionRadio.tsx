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
          return 'R1.png'
        case 2:
          return 'R2.png'
        case 3:
          return 'R3.png'
        case 4:
          return 'R4.png'
        case 5:
          return 'R5.png'
      }
    }

    return (
      <label className={`flex items-center w-full `}>
        <input type='radio' className='hidden' value={value} checked={selectedValue === value} onChange={onChange} />
        <div
          className={`relative flex items-center justify-center  rounded-full  w-10 h-10  ${
            selectedValue == value ? 'bg-white-300' : ''
          }   hover:bg-white-200 hover:cursor-pointer`}
        >
          {/* <div
            className={`flex items-center justify-center w-8 h-8    ${
              selectedValue == value ? 'text-white-300 border-white-300 border-2' : 'text-black-300 border-black-300'
            }  bg-gray-300 border rounded-full `}
          > */}
          <img
            src={`/assets/icon/dashboard/${getImage(value)}`}
            className={`object-fill hover:scale-110 ${selectedValue && selectedValue != value ? 'opacity-50' : ''}`}
            alt='iamges'
          />
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
    <div className='flex flex-col items-center justify-center w-full '>
      <div className='flex items-center justify-center w-full'>
        {/* <h1 className='hidden font-extrabold lg:flex '> Extremely Unhappy</h1> */}
        <RadioButton value={1} selectedValue={valueRadio} onChange={handleRadioChange} />
        <RadioButton value={2} selectedValue={valueRadio} onChange={handleRadioChange} />
        <RadioButton value={3} selectedValue={valueRadio} onChange={handleRadioChange} />
        <RadioButton value={4} selectedValue={valueRadio} onChange={handleRadioChange} />
        <RadioButton value={5} selectedValue={valueRadio} onChange={handleRadioChange} />
        {/* <h1 className='hidden ml-2 font-extrabold lg:flex '>Extremely Happy</h1> */}
      </div>
      {/* <div className='flex items-center justify-between w-full mt-2'>
        <div className='flex justify-start w-full'>
          <h1 className='flex ml-2 text-xs font-extrabold '>Extremely Unhappy</h1>
        </div>
        <div className='flex justify-end w-full'>
          <h1 className='flex ml-2 text-xs font-extrabold '>Extremely Happy</h1>
        </div>
      </div> */}
    </div>
  )
}

export default StatisfactionRadio
