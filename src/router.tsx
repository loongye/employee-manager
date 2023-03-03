import { Outlet, createBrowserRouter } from 'react-router-dom'

import AdminGate from './components/AdminGate'
import AuthGate from './components/AuthGate'
import ChartPage from './pages/ChartPage'
import HomePage from './pages/Home'
import Layout from './components/Layout'
import LoginPage from './pages/Login'
import NoPermissionPage from './pages/NoPermission'

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout>
                <Outlet />
            </Layout>
        ),
        children: [
            {
                path: '',
                element: (
                    <AuthGate>
                        <HomePage />
                    </AuthGate>
                ),
            },
            {
                path: 'chart',
                element: (
                    <AdminGate>
                        <ChartPage />
                    </AdminGate>
                ),
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'no-permission',
                element: <NoPermissionPage />,
            },
        ],
    },
])
