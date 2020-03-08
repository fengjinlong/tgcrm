import * as React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import s from './index.css'

const Header = (props) => {
    const {num} = props
    return (
        <div>
            <ul className={s.ul}>
                <li><Link to="/">index</Link></li>
                <li className={s.li}><Link to="/home/demo1">demo1</Link></li>
                <li><Link to="/about">about{num}张图片</Link></li>
            </ul>
        </div>
    )
}
Header.propTypes = {
    num: PropTypes.number.isRequired
}
function mapStateToProps(state) {
    return {
        num: state.addListFun.list.length
    }
}
export default connect(mapStateToProps)(Header)