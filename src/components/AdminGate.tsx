import { selectUserRole } from '../store/authSlice'
import { useAppSelector } from '../store/hooks'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AdminGate: React.FC<React.PropsWithChildren> = ({ children }) => {
    const role = useAppSelector(selectUserRole)
    const navigate = useNavigate()

    useEffect(() => {
        if (role !== 'Admin') {
            navigate('/no-permission')
        }
    }, [role])

    if (role !== 'Admin') {
        return <p>You do not have role permission to access this page.</p>
    }

    return <>{children}</>
}

export default AdminGate
