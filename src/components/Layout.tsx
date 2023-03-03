import { ResponsiveDrawer } from './ResponsiveDrawer'
import React from 'react'

export const Layout: React.FC<React.PropsWithChildren> = (props) => {
    return <ResponsiveDrawer>{props.children}</ResponsiveDrawer>
}

export default Layout
