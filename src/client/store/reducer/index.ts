import {combineReducers} from 'redux'
import changeLoginFun from './login'
import addListFun from './todo'

const reducers = combineReducers({
    changeLoginFun,
    addListFun
})
export default reducers