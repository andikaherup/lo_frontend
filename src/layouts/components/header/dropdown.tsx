// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
// ** Type
import { characters } from 'src/configs/characterData'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type
import { Archetype } from 'src/context/characterType'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const Dropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [char, setChar] = useState<Archetype>()
  // ** Hooks
  const router = useRouter()

  const { logout, user } = useAuth()
  useEffect(() => {
    const character = characters.find(character => character.name === user?.character)
    setChar(character)
  }, [])

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <div>
        <Badge
          overlap='circular'
          onClick={handleDropdownOpen}
          sx={{ ml: 2, cursor: 'pointer' }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Avatar
            alt={user?.name || 'null'}
            onClick={handleDropdownOpen}
            sx={{ width: 40, height: 40 }}
            src={`/assets/characters/${
              user?.character_level == 0
                ? user?.gender == 'male'
                  ? char?.lvl0_image_M
                  : char?.lvl0_image_F
                : user?.gender == 'male'
                ? char?.lvl1_image_M
                : char?.lvl1_image_F
            }`}
          />
        </Badge>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleDropdownClose()}
          sx={{ '& .MuiMenu-paper': { width: 400, mt: 4 } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Box sx={{ pt: 2, pb: 3, px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap='circular'
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Avatar
                  alt={user?.name || 'null'}
                  src={`/assets/characters/${
                    user?.character_level == 0
                      ? user?.gender == 'male'
                        ? char?.lvl0_image_M
                        : char?.lvl0_image_F
                      : user?.gender == 'male'
                      ? char?.lvl1_image_M
                      : char?.lvl1_image_F
                  }`}
                  sx={{ width: '2.5rem', height: '2.5rem' }}
                />
              </Badge>
              <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600 }}>{user?.name || 'null'}</Typography>
                <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mt: '0 !important' }} />
          <Link href='/dashboard'>
            <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
              <Box sx={styles}>
                <Icon icon='mdi:account-outline' />
                Dashboard
              </Box>
            </MenuItem>
          </Link>

          <Divider />
          <MenuItem
            onClick={handleLogout}
            sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
          >
            <Icon icon='mdi:logout-variant' />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </Fragment>
  )
}

export default Dropdown
