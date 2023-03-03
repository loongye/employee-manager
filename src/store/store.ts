import authReducer from './authSlice'
import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './employeeSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employee: employeeReducer
    },
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch