import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
// import { message } from 'antd'
import routes from './routes'
import YdStore from '@models/YdStore'
import '@assets/styles/main.scss'
import ErrorBoundary from '@components/Error'

// message.config({ duration: 2 })
// window.message = message

const { useContext } = React

const App = observer(() => {
  const ydStore = useContext(YdStore)
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/">
        {routes(ydStore)}
      </BrowserRouter>
    </ErrorBoundary>
  )
})

export default App
