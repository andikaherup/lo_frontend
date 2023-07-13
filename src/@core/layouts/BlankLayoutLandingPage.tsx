import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { BlankLayoutProps } from './types'
import Header from 'src/layouts/components/header/Header'
import Footer from 'src/layouts/components/footer/Footer'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import Spinner from '../components/spinner'
import PopupRef from 'src/layouts/components/header/referralPopup'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayoutLandingPage = ({ children }: BlankLayoutProps) => {
  const auth = useAuth()
  const [openRef, setOpenRef] = useState<boolean>(false)

  useEffect(() => {
    if (auth.user?.is_new_user) {
      setOpenRef(true)
    }
  }, [auth])
  const closeRef = () => {
    setOpenRef(false)
  }

  if (auth.loading) {
    return <Spinner></Spinner>
  }

  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        <PopupRef open={openRef} close={closeRef}></PopupRef>
        <Header />
        <div className='h-full min-h-screen'>{children}</div>
        <Footer />
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayoutLandingPage
