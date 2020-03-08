import * as React from 'react'
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom'
const { Suspense, lazy } = React

const Login = lazy(() =>
    import(/* webpackChunkName:"login" */ '@pages/Login/index')
)
const Home = lazy(() =>
    import(/* webpackChunkName:"home" */ '@pages/Home/index.tsx')
)
const NotFound = lazy(() =>
    import(/* webpackChunkName:"nf" */ '@pages/NotFound')
)
const About = lazy(() =>
    import(/* webpackChunkName:"about" */ '@pages/About')
)
const Demo1 = lazy(() =>
    import(/* webpackChunkName:"demo1" */ "@components/Demo1")
);
const Demo2 = lazy(() =>
    import(/* webpackChunkName:"demo2" */ "@components/Demo2")
);


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


const generateRoutes = (routes: YDProps[]) => store => (
    <Suspense fallback={<p>loading...</p>}>
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
    </Suspense>
)
const Routes = generateRoutes(routes)
export default Routes
