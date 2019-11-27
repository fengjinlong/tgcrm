import * as React from 'react'
import { StaticRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
// import { message } from 'antd'
import routes from './routes/indexser'
import YdStore from '@models/YdStore'
import '@assets/styles/main.scss'
// import ErrorBoundary from '@components/Error'

// message.config({ duration: 2 })
// window.message = message

// const { useContext } = React

const AppSer = (url:string) => {
  // const ydStore = useContext(YdStore)
  console.log(url)
  return (
    // <ErrorBoundary>
      <StaticRouter location={url}>
        {/* {routes(ydStore)} */}
        {routes()}
      </StaticRouter>
    // </ErrorBoundary>
  )
}

export default AppSer
