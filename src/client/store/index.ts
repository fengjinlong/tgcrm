import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducer/index'

export function storeClient() {
    return createStore(reducers,{},applyMiddleware(thunk))
}
export function storeServer() {
    return createStore(reducers)
}