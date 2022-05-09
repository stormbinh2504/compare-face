import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../utils/imageUpload'
import { sdkVNPTService, authService } from '../../services';
import { compressImage } from "../../utils/imageUpload"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { login } from '../../redux/actions/authAction'

import "./Login.scss"

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state);

    const [userData, setUserData] = useState({
        "username": "",
        "password": "",
    })


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }


    const Submit = async () => {
        let body = {
            ...userData,
        }
        dispatch(login(body))
    }


    return (
        <div div className='login' >
            <div div className='form-login' >
                <h3 className="text-uppercase text-center mb-4">Login</h3>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username"
                        name="username"
                        onChange={handleChangeInput} value={userData.username}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Password</label>
                    <input type="text" className="form-control" id="password"
                        name="password"
                        onChange={handleChangeInput} value={userData.password}
                    />
                </div>

                {
                    auth !== "" && auth.avatar && <div className="block-image">
                        <img src={auth.avatar} alt="" id="img" className="pre-image" />
                    </div>
                }

                < button
                    type="submit"
                    className="btn btn-dark w-100"
                    // disabled={email && password ? false : true}
                    onClick={Submit}
                >
                    Login
                </button>

                <p className="my-2">
                    You don't have an account?{" "}
                    <Link to="/register" style={{ color: "crimson" }}>
                        Register Now
                    </Link>
                </p>
            </div >
        </div >
    )
}

export default Login