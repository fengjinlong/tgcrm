import * as React from 'react'
import './index.scss'
import fb from '@assets/images/furley_bg.png'

export default (props) => {
  console.log(props)
  return (
    <div className="componet-demo1">
      <div className="img1"></div>
      <div className="img2"></div>
      <img src={fb} alt="" />
    </div>
  )
}