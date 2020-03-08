import * as React from 'react'
import routes from './routes'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import {storeClient} from './store/index'
import { message } from 'antd'
import '@assets/styles/main.scss'

message.config({ duration: 2 })
window.message = message

const App = () => {
    return (
        <BrowserRouter basename='/'>
            {routes(storeClient())}
        </BrowserRouter>
    )
}
export default App