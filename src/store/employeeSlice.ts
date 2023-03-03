import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import type { RootState } from './store'
import { generateFakeEmployees } from '../utils/generateFakeEmployees';
import { z } from "zod";

export const Employee = z.object({
    id: z.string().uuid(),
    firstName: z.string().min(6, "First Name must be at least 6 characters long.").max(10, "First Name must be at most 10 characters long."),
    lastName: z.string().min(6, "Last Name must be at least 6 characters long.").max(10, "Last Name must be at most 10 characters long."),
    email: z.string().email(),
    phone: z.string().length(8, "Must be 8 digits.").regex(/^(6|8|9)\d{7}$/, { message: 'Must be a Singaporean phone number.' }),
    gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Please choose one.'})}),
    joinedDate: z.string().datetime(),
})

export type TEmployee = z.infer<typeof Employee>
const employeeAdapter = createEntityAdapter<TEmployee>()

const initialState = employeeAdapter.getInitialState()
const initialStateWithFakeData = employeeAdapter.setAll(initialState, generateFakeEmployees())

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: initialStateWithFakeData,
    reducers: {
        employeeRemoved: employeeAdapter.removeMany,
        employeeUpserted: employeeAdapter.upsertOne,
        setAllEmployees: employeeAdapter.setAll
    },
})

export const { employeeRemoved, employeeUpserted, setAllEmployees } = employeeSlice.actions

const selectors = employeeAdapter.getSelectors();

export const selectEmployees = (state: RootState) => selectors.selectAll(state.employee)
export const selectEmployee = (id: string) => (state: RootState) => id ? selectors.selectById(state.employee, id) : undefined
export const selectNumEmployeesJoinedEachYearForPastTenYears = (state: RootState) => {
    const data = selectors.selectAll(state.employee);

    const currentYear = new Date().getFullYear();

    return Object.entries(data.reduce((acc, cur) => {
        const year = cur.joinedDate.slice(0, 4) as keyof typeof acc;

        if (year < currentYear - 10) return acc;

        return {
            ...acc,
            [year]: acc?.[year] ? acc[year] + 1 : 1
        }
    }, {} as {[key: string]: number})).map(([key, value]) => ({year: key, numberOfEmployeesJoined: value}))
}

export default employeeSlice.reducer