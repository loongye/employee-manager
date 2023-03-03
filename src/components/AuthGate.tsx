import React from 'react'
import { isAuthenticated } from '../store/authSlice'
import { useAppSelector } from '../store/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthGate: React.FC<React.PropsWithChildren> = ({ children }) => {
    const authenticated = useAppSelector(isAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
        if (!authenticated) {
            navigate('/no-permission')
        }
    }, [authenticated])

    if (!authenticated) {
        return <p>You do not have permission to access this page.</p>
    }

    return <>{children}</>
}

export default AuthGate
