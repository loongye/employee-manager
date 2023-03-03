import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from './store'

type Item = 'Home' | 'Login' | 'Chart' | 'Logout'
type Role = 'Standard' | 'Admin'
interface AuthState {
    role?: Role;
    navigationItems: Item[];
}
const initialState: AuthState = {
    navigationItems: ['Login']
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<Role | undefined>) => {
            state.role = action.payload
        }
    },
})

export const { setRole } = authSlice.actions

export const isAuthenticated = (state: RootState) => !!state.auth.role
export const selectUserRole = (state: RootState) => state.auth.role
export const selectNavigationItems = (state: RootState): Item[] => {
    const { role } = state.auth;

    if (role === 'Admin') return ['Home', 'Chart', 'Logout']
    else if (role === 'Standard') return ['Home', 'Logout']

    return ['Login']
}

export default authSlice.reducer