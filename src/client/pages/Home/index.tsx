import * as React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'
import Breadcrumb from '@components/Breadcrumb'
import homeRouts from '../../routes/homeRoutes'
import './index.scss'

const { Header, Sider, Content } = Layout

const { useState, useEffect, useContext } = React

const Home = props => {
  const { store, history } = props

  const { 0: state, 1: setState } = useState({
    collapsed: false,
  })

  const toggle = () => setState({ ...state, collapsed: !state.collapsed })

  const logout = () => {
    store.logout()
    history.push('/login') 
  }

  useEffect(() => {
    console.log(123213)
    document.title = '京程一灯CRM'
  }, [])

  return (
  <section className="page-home">
    <Layout>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo">京程一灯CRM</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>功能一</span>
            <NavLink to="/index/demo1" />
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>功能二</span>
            <NavLink to="/index/demo2/123" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header-layout" style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
          <div className="header-right">
            <span onClick={logout}>[退出]</span>
          </div>
        </Header>
        <Breadcrumb />
        <Content className='layout-content'>{props.children}</Content>  
      </Layout>
    </Layout>
  </section>
  )
}

export default withRouter(Home)