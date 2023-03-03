import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import React, { useState } from 'react'
import {
    employeeRemoved,
    selectEmployee,
    selectEmployees,
} from '../store/employeeSlice'
import { isAuthenticated, selectUserRole } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

import { EmployeeForm } from './EmployeeForm'

const columns: GridColDef[] = [
    {
        field: 'firstName',
        headerName: 'First name',
        width: 130,
    },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'email',
        headerName: 'Email Address',
        width: 200,
    },
    {
        field: 'phone',
        headerName: 'Phone Number',
        width: 150,
    },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 100,
    },
    {
        field: 'joinedDate',
        headerName: 'Joined Date',
        width: 200,
        type: 'dateTime',
    },
]

function EmployeeList() {
    const list = useAppSelector(selectEmployees)
    const role = useAppSelector(selectUserRole)
    const auth = useAppSelector(isAuthenticated)
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
    const value = useAppSelector((state) =>
        selectionModel?.[0]
            ? selectEmployee(selectionModel?.[0] as string)(state)
            : undefined
    )
    const dispatch = useAppDispatch()

    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        dispatch(employeeRemoved(selectionModel))
        setSelectionModel([])
        setOpen(false)
    }

    if (!auth) {
        return <p>Not authenticated.</p>
    }

    return (
        <>
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    rows={list}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection={role === 'Admin'}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel)
                    }}
                    selectionModel={selectionModel}
                    disableSelectionOnClick
                />
            </div>

            <br />

            {role === 'Admin' ? (
                <>
                    <EmployeeForm buttonText="Create" />
                    {selectionModel?.length === 1 ? (
                        <EmployeeForm value={value} buttonText="Edit" />
                    ) : undefined}
                    {selectionModel?.length > 0 ? (
                        <Button
                            sx={{ marginRight: 2 }}
                            color="error"
                            variant="contained"
                            onClick={() => {
                                setOpen(true)
                            }}
                        >
                            Delete
                        </Button>
                    ) : undefined}
                </>
            ) : undefined}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are you sure you wish to delete?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The employee data you have selected will be deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EmployeeList
