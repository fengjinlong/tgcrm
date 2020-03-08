import {
    ADD_LIST,
    CHANGE_ALL
} from '../action/index'

const initState = {
    list: [1,1,1]
}
const addListFun = (state = initState, action) => {
    const { list } = state
    switch (action.type) {
        case ADD_LIST:
            return {
                list: [...list, action.payload]
            }
        case CHANGE_ALL:
            let n = action.payload
            let arr = []
            for(let i = 0;i<n;i++) {
                arr.push(1)
            }
            return {
                list: [...arr]
            }
        default:
            return state
    }
}
export default addListFun
