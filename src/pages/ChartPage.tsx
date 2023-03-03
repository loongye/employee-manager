import {
    CategoryScale,
    Chart as ChartJS,
    ChartType,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js/auto'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { Chart } from 'react-chartjs-2'
import { selectNumEmployeesJoinedEachYearForPastTenYears } from '../store/employeeSlice'
import { useAppSelector } from '../store/hooks'
import { useState } from 'react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const types: ChartType[] = ['bar', 'line']

function ChartPage() {
    const data = useAppSelector(selectNumEmployeesJoinedEachYearForPastTenYears)
    const [type, setType] = useState<ChartType>('bar')

    return (
        <>
            <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                    label="Type"
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value as ChartType)
                    }}
                >
                    {types.map((i) => (
                        <MenuItem key={i} value={i}>
                            {i}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Chart
                type={type}
                data={{
                    datasets: [
                        {
                            data,
                            label: 'Number of Employees joined',
                            parsing: {
                                xAxisKey: 'year',
                                yAxisKey: 'numberOfEmployeesJoined',
                            },
                        },
                    ],
                }}
            />
        </>
    )
}

export default ChartPage
