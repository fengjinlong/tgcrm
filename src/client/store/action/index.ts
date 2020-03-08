export const ADD_LIST = 'ADD_LIST'
export const CHANGE_LOGIN = 'CHANGE_LOGIN'
export const CHANGE_ALL = 'CHANGE_ALL'
// actionCreator
export function setAddList(num: number) {
    return {
        type: ADD_LIST,
        payload: num
    }
}
export function setChangeLogin() {
    return {
        type: CHANGE_LOGIN,
        payload: null
    }
}
// 异步