import { isAuthenticated, setRole } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

import { Button } from '@mui/material'

function LoginPage() {
    const dispatch = useAppDispatch()
    const authenticated = useAppSelector(isAuthenticated)

    return (
        <div>
            {authenticated ? (
                <>You are currently logged in.</>
            ) : (
                <>
                    <Button
                        sx={{ marginRight: 2 }}
                        variant="contained"
                        color="success"
                        onClick={() => {
                            dispatch(setRole('Admin'))
                        }}
                    >
                        Login as Admin
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            dispatch(setRole('Standard'))
                        }}
                    >
                        Login as Standard
                    </Button>
                </>
            )}
        </div>
    )
}

export default LoginPage
