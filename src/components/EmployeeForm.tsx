import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material'
import { Employee, TEmployee, employeeUpserted } from '../store/employeeSlice'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useAppDispatch } from '../store/hooks'
import { v4 as uuidv4 } from 'uuid'
import { zodResolver } from '@hookform/resolvers/zod'

const getDefaultValue = (): TEmployee => ({
    id: uuidv4(),
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // @ts-expect-error
    gender: '',
    joinedDate: new Date().toISOString(),
})
export const EmployeeForm: React.FC<{
    value?: TEmployee
    buttonText?: string
}> = ({ value, buttonText }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        reset,
    } = useForm<TEmployee>({
        resolver: zodResolver(Employee),
        mode: 'onBlur',
        defaultValues: value || getDefaultValue(),
    })

    const joinedDate = watch('joinedDate')
    const gender = watch('gender')

    const handleClose = () => {
        setOpen(false)
        reset(value || getDefaultValue())
    }

    const handleFormSubmit: SubmitHandler<TEmployee> = (val) => {
        dispatch(employeeUpserted(val))
        setOpen(false)
        reset(value || getDefaultValue())
    }

    return (
        <>
            <Button
                sx={{ marginRight: 2 }}
                onClick={() => {
                    setOpen(true)
                }}
                variant="contained"
            >
                {buttonText}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Employee Details</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        fullWidth
                        inputProps={register('firstName')}
                        label="First Name"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        inputProps={register('lastName')}
                        label="Last Name"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        inputProps={register('email')}
                        label="Email"
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        inputProps={register('phone')}
                        label="Phone"
                        type="tel"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />

                    <FormControl
                        error={!!errors.gender}
                        fullWidth
                        margin="normal"
                    >
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            Gender
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                control={<Radio />}
                                label="Female"
                                {...register('gender')}
                                value="female"
                                checked={gender === 'female'}
                            />
                            <FormControlLabel
                                control={<Radio />}
                                label="Male"
                                {...register('gender')}
                                value="male"
                                checked={gender === 'male'}
                            />
                        </RadioGroup>
                        <FormHelperText>
                            {errors.gender?.message}
                        </FormHelperText>
                    </FormControl>

                    <FormControl
                        error={!!errors.joinedDate}
                        fullWidth
                        margin="normal"
                    >
                        <DatePicker
                            label="Joined Date"
                            value={joinedDate}
                            onChange={(e) => setValue('joinedDate', e || '')}
                            renderInput={(params) => (
                                <TextField fullWidth {...params} />
                            )}
                            maxDate={new Date().toISOString()}
                        />
                        <FormHelperText>
                            {errors.joinedDate?.message}
                        </FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit(handleFormSubmit)}
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EmployeeForm
