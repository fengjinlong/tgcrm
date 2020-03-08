import * as React from 'react'
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom'

import Login from '@pages/Login'
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import About from '@pages/About'
import Demo1 from '@components/Demo1'
import Demo2 from '@components/Demo2'


interface YDProps extends RouteProps {
    auth?: boolean
}

const routes: YDProps[] = [
    {
        path: '/index',
        // exact: true,
        auth: true,
        component: Home,
        children: [
            {
                key: 'demo1',
                path: '/index',
                component: Demo1,
                exact: true
            },
            {
                key: 'demo2',
                path: '/index/demo2',
                component: Demo2,
                // exact:true
            },
            {
                key: 'demo3',
                path: '/index/demo3',
                component: Demo2,
                // exact:true
            },
        ]
    },
    {
        path: '/about',
        exact: true,
        component: About
    },
    {
        path: '/login',
        exact: true,
        component: Login
    }
]

const generateRoutes1 = (routes: YDProps[]) => store => {
    return (
        <Switch>
            <Route path='/' render={() => <Redirect to="/index" />}></Route>
            {routes.map((r, key) => {
                const { path, exact, component } = r
                const LazyCom = component
                return (
                    <Route
                        key={key}
                        path={path}
                        exact={exact}
                        render={props => {
                            if (!r.auth) return <LazyCom {...props} />
                            // if (!store.token) return (
                            //     <Redirect
                            //         to={{
                            //             pathname: "/login",
                            //             state: { from: props.location }
                            //         }}
                            //     />
                            // )
                            if (!r.children || !r.children.length) {
                                return <LazyCom {...props} store={store} />
                            }
                            return (
                                <Switch>
                                    {
                                        (r.children).map((child) => {
                                            const { path, exact, component } = child
                                            const ChildCMP = component
                                            return <Route
                                                key={path}
                                                path={path}
                                                // exact={exact}
                                                render={props => <ChildCMP {...props} store={store} />}
                                            />
                                        })
                                    }
                                    <Redirect to={r.children[0].path}></Redirect> // 子路由找不到，重定向到第一个子路由
                                </Switch>
                            )
                        }}
                    ></Route>
                )
            })}
            {/* 404 */}
            <Route component={NotFound} />
        </Switch>
    )
}

const generateRoutes = (routes: YDProps[]) => store => (
    <Switch>
        <Route path="/" exact render={() => <Redirect to="/index" />} key="/home" />,
        {routes.map((r, key) => {
            const { path, exact, component } = r
            const LazyCom = component
            return (
                <Route
                    key={key}
                    path={path}
                    exact={exact}
                    render={props => {
                        if (!r.auth) return <LazyCom {...props} />

                        // if (!store.token) return (
                        //   <Redirect
                        //     to={{
                        //       pathname: "/login",
                        //       state: { from: props.location }
                        //     }}
                        //   />
                        // )

                        if (!r.children || !r.children.length) return <LazyCom {...props} store={store} />

                        return (
                            <LazyCom props={props} store={store}>
                                <Switch>
                                    {
                                        r.children.map((child, k) => {
                                            const { path, exact, component } = child
                                            const ChildCMP = component

                                            return <Route
                                                key={k}
                                                path={path}
                                                exact={exact}
                                                render={props => <ChildCMP {...props} store={store} />}
                                            />
                                        })
                                    }
                                    <Redirect to={r.children[0].path}></Redirect> // 子路由找不到，重定向到第一个子路由
                                </Switch>
                            </LazyCom>
                        )
                    }
                    }
                />
            )
        })}
        <Route component={NotFound} />
    </Switch>
)

const Routes = generateRoutes(routes)
export default Routes
