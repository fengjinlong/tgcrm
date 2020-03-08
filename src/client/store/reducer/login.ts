import {
    CHANGE_LOGIN
} from '../action/index'
const initState = {
    isLogin: false
}
const changeLoginFun = (state=initState, action) => {
    const {isLogin} = state
    const {type} = action
    switch(type) {
        case CHANGE_LOGIN:
            return {
                isLogin: !isLogin
            }
        default:
            return state
    }
}
export default changeLoginFun