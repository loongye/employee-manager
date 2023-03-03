import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { store } from './store/store'

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </LocalizationProvider>
    )
}

export default App
