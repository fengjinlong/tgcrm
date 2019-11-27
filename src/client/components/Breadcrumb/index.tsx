import * as React from 'react'
import { Layout, Menu, Icon, Breadcrumb } from 'antd'
import './index.scss'

const BreadcrumbIndex = () => {
  return (
    <div className="bread-cont">
      <Breadcrumb className="bread-box">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>xxx</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

export default BreadcrumbIndex