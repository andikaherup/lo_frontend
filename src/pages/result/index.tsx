// ** React Imports
import { ReactNode, useState, useEffect } from 'react'

// ** MUI Imports

import Overview from 'src/layouts/components/dashboard/overview'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** Type

import { characters } from 'src/configs/characterData'

// ** Layout Import
import BlankLayoutLandingPage from 'src/@core/layouts/BlankLayoutLandingPage'

import Noresult from 'src/layouts/components/dashboard/noresult'
import Router from 'next/router'

interface ResponseData {
  calculated_result: string
  gender: string
  response: Answer[]
}

interface Answer {
  id: number
  answer: number
  answer_str: string
  question: string
}

const Result = () => {
  const auth = useAuth()

  const [gotResult, setGotResult] = useState<boolean>(false)
  const [selectedCharacter, setSelectedCharacter] = useState<ResponseData>()

  useEffect(() => {
    if (auth.user) {
      Router.replace('/dashboard')
    }
    auth.setLoading(true)
    setGotResult(false)
    const getData = async () => {
      const characterString = await localStorage.getItem('resultNoLogin')
      const character: ResponseData | null = characterString ? JSON.parse(characterString) : null
      if (!character) {
        // Character not found in local storage, redirect to another page
        auth.setLoading(false)
      } else {
        setSelectedCharacter(character)
        setGotResult(true)
        auth.setLoading(false)
      }
      auth.setLoading(false)
    }
    getData()
  }, [auth])

  const changeTab = () => {
    console.log(' ')
  }

  const character = characters.find(character => character.name === selectedCharacter?.calculated_result)
  if (!gotResult) {
    return <Noresult></Noresult>
  }

  return (
    <>
      <div
        className={`pt-20 h-screen ${
          auth.user
            ? characters.find(character => character.name === selectedCharacter?.calculated_result)?.background
            : ''
        }`}
        id='about'
      >
        <div className='w-full'>
          <div className='w-full'>
            {character && (
              <Overview character={character} gender={selectedCharacter?.gender || 'male'} changeTab={changeTab} />
            )}
            {!character && <Noresult></Noresult>}
          </div>
        </div>
      </div>
    </>
  )
}

Result.getLayout = (page: ReactNode) => <BlankLayoutLandingPage>{page}</BlankLayoutLandingPage>

Result.guestGuard = true

export default Result
