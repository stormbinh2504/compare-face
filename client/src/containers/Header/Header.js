import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { loginAuthentication } from '../../redux/actions/authAction'

import "./Header.scss"
const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const HandleLogout = () => {
        dispatch(loginAuthentication(false))
        history.push("/login")
    }
    return (
        <div className='header-ekyc'>
            <div className="header-right-ekyc">
                <div className="header-menu-ekyc">
                    <div className="item-menu support">
                        Hỗ trợ
                    </div>
                    <div className="item-menu introduce">
                        Giới thiệu
                    </div>
                    <div className="item-menu guide">
                        Hướng dẫn
                    </div>
                    <div className="item-menu application">
                        Ứng dụng
                    </div>
                </div>
            </div>
            <button onClick={HandleLogout} style={{ marginLeft: "20px" }} type="button" class="btn btn-info">Logout</button>
        </div>
    )
}

export default Header