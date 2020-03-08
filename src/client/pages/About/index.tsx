import * as React from 'react'
import style from './index.css'
import { connect } from 'react-redux'
import { setAddList } from '../../store/action/index'
const { useState } = React

const About = (props) => {
    const { list, add } = props
    const [num, setNum] = useState(list.length)
    function click() {
        add(1)
        setNum(n => n + 1)
    }
    return (
        <div className={style.div}>
            {
                list.map((item, i) => {
                    return (
                        <img key={i} className={style.img} src={require("./index.jpg")} alt="" />
                    )
                })
            }

            <button onClick={click}>btn</button>
            关于{num}张图片
    </div>
    );
}

function mapStateToProps(state) {
    return {
        list: state.addListFun.list
    }
}
function mapDispatchToProps(dispatch) {
    return {
        add: (n) => dispatch(setAddList(n))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
