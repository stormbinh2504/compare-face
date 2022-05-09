import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../ultils/imageUpload'
import { compressImage } from "../../ultils/imageUpload"
import { sdkVNPTService, authService } from '../../services';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import "./Login.scss"

const Login = () => {
    const history = useHistory()
    const [userData, setUserData] = useState({
        "username": "binhhuun",
        "password": "123456",
    })

    const [dataLogin, setDataLogin] = useState("")


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }


    const Submit = async () => {


        let body = {
            ...userData,
        }
        // await authService.LoginClient(body)
        //     .then(data => {
        //         console.log("binh---data", data)
        //     }).catch((e) => {
        //         console.log(e)
        //     })


        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `http://localhost:5000/api/login`,
            body,
            config
        );

        if (data) {
            setDataLogin(data.user)
            setTimeout(() => {
                history.push("/compare-face")
            }, 200);
        }
    }


    return (
        <div div className='login' >
            <div div className='form-login' >
                <h3 className="text-uppercase text-center mb-4">Login</h3>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username"
                        onChange={handleChangeInput} value={userData.username}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Password</label>
                    <input type="text" className="form-control" id="password"
                        onChange={handleChangeInput} value={userData.password}
                    />
                </div>

                {
                    dataLogin !== "" && dataLogin.avatar && <div className="block-image">
                        <img src={dataLogin.avatar} alt="" id="img" className="pre-image" />
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