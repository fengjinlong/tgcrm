import * as React from 'react'
import { decorate, observable } from 'mobx'
const {createContext} = React

interface User {
    username: string,
    password: string
}

// export class Ydstore {
//     token: string = ''
//     userInfo:object = {}
//     // token:string = window.localStorage['token'] || ''

//     async login(user: User) {
//       const { username, password } = user
//       if (username !== 'admin' || password !== 'admin') {
//         throw new Error('用户名或密码错误')
//       }

//       this.token = Math.random().toString()
//       this.userInfo = { name: '小疯子' }

//       return this.token
//     }

//     logout(): void {
//       // window.localStorage['token'] = ''
//     }
//   }

//   decorate(Ydstore, {
//     token: observable,
//     userInfo: observable,
//   })

//   export default createContext(new Ydstore())

const Ydstore = {
    list: [1,2,3],
    token: '',
    userInfo: {},
    async login(user: User) {
        const { username, password } = user
        if (username !== 'admin' || password !== 'admin') {
            throw new Error('用户名或密码错误')
        }

        Ydstore.token = Math.random().toString()
        Ydstore.userInfo = { name: '小疯子' }

        return Ydstore.token
    },
    logout() {
        // window.localStorage['token'] = ''
    }
}

decorate(Ydstore, {
    token: observable,
    userInfo: observable,
})

export default createContext(Ydstore)