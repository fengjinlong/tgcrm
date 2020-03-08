import * as React from 'react'
import { Breadcrumb } from 'antd'
import './index.scss'

const BreadcrumbIndex = () => {
  return (
    <div className="bread-cont">
      <Breadcrumb className="bread-box">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>功能</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

export default BreadcrumbIndex