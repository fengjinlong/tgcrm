import * as React from 'react'
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom'
import NotFound from '@pages/NotFound'

const { Suspense, lazy } = React

const Login = lazy(() =>
  import(/* webpackChunkName:"login" */ '@pages/Login')
)

const Home = lazy(() =>
  import(/* webpackChunkName:"home" */ '@pages/Home')
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
  auth?: boolean;
}

const routes: YDProps[] = [
  {
    key: 'index',
    path: ['/index'],
    // exact: true,
    auth: true,
    component: Home,
    children: [
      {
        key: 'demo1',
        path:'/index/demo1',
        component:Demo1,
        exact:true
      },
      {
        key: 'demo2',
        path:'/index/demo2/:id',
        component:Demo2,
        // exact:true
      },
    ]
  },
  {
    key: 'about',
    path: '/about',
    exact: true,
    component: About
  },
  {
    key: 'login',
    path: '/login',
    exact: true,
    component: Login
  },
]

const generateRoutes = (routes: YDProps[]) => store => (
  // <Suspense fallback={<p>loading...</p>}>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/index" />} key="/home" />,
      {routes.map(r => {
        const { path, exact, component, key } = r
        const LazyCom = component
        return (
          <Route
            key={key}
            path={path}
            exact={exact}
            render={props => {
              if (!r.auth) return <LazyCom {...props} />

              if (!store.token) return (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.location }
                  }}
                />
              )

              if (!r.children || !r.children.length) return <LazyCom {...props} store={store} />

               return (
                    <LazyCom props={props} store={store}>
                      <Switch>
                        {
                          r.children.map(child => {
                            const { key, path, exact, component } = child
                            const ChildCMP = component
                            
                            return <Route
                              key={key}
                              path={path}
                              exact={exact}
                              render={props => <ChildCMP {...props} store={store}  /> }
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
  // </Suspense>
)

const Routes = generateRoutes(routes)

export default Routes

