import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material'
import { BarChart, Home, Login, Logout, Menu } from '@mui/icons-material'
import {
    isAuthenticated,
    selectNavigationItems,
    selectUserRole,
    setRole,
} from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const drawerWidth = 240

export const ResponsiveDrawer: React.FC<React.PropsWithChildren> = (props) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const items = useAppSelector(selectNavigationItems)
    const navigate = useNavigate()
    const role = useAppSelector(selectUserRole)
    const authenticated = useAppSelector(isAuthenticated)
    const dispatch = useAppDispatch()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const Icon = (props: { name: typeof items[number] }) => {
        if (props.name === 'Home') return <Home />
        if (props.name === 'Login') return <Login />
        if (props.name === 'Chart') return <BarChart />
        if (props.name === 'Logout') return <Logout />
        return null
    }

    const handleNavigation = (i: string) => {
        if (i === 'Home') navigate('/')
        else if (i === 'Logout') {
            dispatch(setRole(undefined))
            navigate('/login')
        } else navigate(`/${i}`)
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {items.map((i) => (
                    <ListItem key={i} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon name={i} />
                            </ListItemIcon>
                            <ListItemText
                                primary={i}
                                onClick={() => handleNavigation(i)}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )

    const container = document.body

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Employee Manager{' '}
                        {authenticated ? `- Logged in as: ${role}` : ''}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    )
}

export default ResponsiveDrawer
