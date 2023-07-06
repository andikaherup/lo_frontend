const ProgressQuest = () => {
  return (
    <div className='w-full h-full'>
      <div className='h-full p-1 overflow-hidden shadow-sm bg-greyloading-300 rounded-xl'>
        <div className='relative flex items-center justify-center h-full'>
          <div className='absolute top-0 bottom-0 left-3 rounded-lg w-[50%] bg-orange-500'></div>
          <div className='relative text-sm font-medium text-blue-500'>36%</div>
        </div>
      </div>
    </div>
  )
}

export default ProgressQuest
