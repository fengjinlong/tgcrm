import * as React from 'react'
import { Layout, Menu, Button } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'
import Breadcrumb from '@components/Breadcrumb'
import './index.scss'
import {
    UserAddOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DotChartOutlined
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

const { useState, useEffect } = React

const Home = props => {
    const { store, history } = props

    const { 0: state, 1: setState } = useState({
        collapsed: false,
    })

    const toggle = () => setState({ ...state, collapsed: !state.collapsed })

    const logout = () => {
        console.log(store.getState())
        // store.logout()
        history.push('/login')
    }

    useEffect(() => {
        document.title = '管理系统CRM'
    }, [])

    return (
        <section className="page-home">
            <Layout>
                <Sider trigger={null} collapsible collapsed={state.collapsed}>
                    <div className="logo">{state.collapsed ? 'CRM' : '后台管理CRM'}</div>
                    {/* <div className="logo">CRM</div> */}
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <UserAddOutlined />
                            <span>功能一</span>
                            <NavLink to="/index" />
                        </Menu.Item>
                        <Menu.Item key="2">
                            <VideoCameraOutlined />
                            <span>功能二</span>
                            <NavLink to="/index/demo2" />
                        </Menu.Item>
                        <Menu.Item key="3">
                            <DotChartOutlined />
                            <span>功能三</span>
                            <NavLink to="/index/demo3" />
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header-layout" style={{ background: '#fff', padding: 0 }}>
                        <Button className="trigger" type="primary" onClick={toggle} style={{ marginBottom: 16 }}>
                        {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
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