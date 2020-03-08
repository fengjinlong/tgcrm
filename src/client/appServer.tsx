import * as React from 'react'
import routes from './routes/indexServer'
import {StaticRouter} from 'react-router-dom'
import {storeServer} from './store/index'
import { Provider } from 'react-redux'
// import { message } from 'antd'
import '@assets/styles/main.scss'
// message.config({ duration: 2 })
// window.message = message

// 通过url 获取组件
const App = (url: string) => {
    return (
        <StaticRouter location={url}>
            <Provider store={storeServer()}>
                {routes(storeServer())} 
            </Provider>
        </StaticRouter>
    )
}

export default App