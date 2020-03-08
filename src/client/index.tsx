import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'
import { Provider } from 'react-redux'
import {storeClient} from './store/index'

const store = storeClient()
if (window.location.pathname === '/index') {
    store.dispatch({
        type: 'CHANGE_ALL',
        payload: window.REDUX_DATA_LIST * 1
    })
}
ReactDOM.hydrate(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)

if (module.hot) {
    module.hot.dispose(function () {
        // 模块即将被替换时
        console.log('module will be replaced')
    })

    module.hot.accept(function () {
        // 模块或其依赖项之一刚刚更新时
        console.log('module update')
    })
}