import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../ultils/imageUpload'
import "./Register.scss"
import { sdkVNPTService, authService, ekycServer } from '../../services';
import { compressImage } from "../../ultils/imageUpload"
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios';

const Register = () => {

    const [imagePreURL, setImagPreURL] = useState("")

    const imageHandler = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagPreURL(reader.result)
            }
        }
        reader.readAsDataURL(file)
    };

    const imageUploadTest = async (images) => {
        const formData = new FormData()
        formData.append("file", images)
        formData.append("upload_preset", "binhhuun")
        formData.append("cloud_name", "stormbinh2504")
        const res = await fetch("https://api.cloudinary.com/v1_1/stormbinh2504/upload", {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        return data
    }

    const [userData, setUserData] = useState({
        "username": "binhhuun",
        "password": "123456",
        "avatar": ""
    })

    const [avatar, setAvatar] = useState(null)

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (e.target.files.length > 0) {
            setAvatar(file)
            imageHandler(file)
        }
    }


    const addFileServerEkyc = async () => {

        const resObj = {
            error: '',
            data: '',
            message: ''
        }

        let imageOptimize = await compressImage(avatar)

        let body = {
            file: imageOptimize,
            title: 'Test title',
            description: 'Test description'

        }

        await sdkVNPTService.addFileServerEkyc(body)
            .then((responses) => {
                responses = responses.data
                if (responses) {
                    resObj.error = false
                    resObj.data = responses.object && responses.object.hash
                    resObj.message = ''
                }
            })
            .catch((error) => {
                resObj.error = true
                resObj.data = ''
                resObj.message = error

            });

        return resObj
    }

    const Submit = async () => {
        let imageOptimize = await compressImage(avatar)
        let imageURL = await imageUploadTest(imageOptimize)
        let body = {
            ...userData,
            avatar: imageURL.secure_url
        }

        let resObj = await addFileServerEkyc()
        console.log("binh---resObj", resObj)

        const config = { headers: { "Content-Type": "application/json" } };

        await axios.post(
            `http://localhost:5000/api/register`,
            body,
            config
        );
    }

    let disableSubmit = imagePreURL !== "" && userData.password !== "" && userData.username !== ""

    return (
        <div div className='regiter' >
            <div div className='form-regiter' >
                <h3 className="text-uppercase text-center mb-4">Register</h3>
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
                    imagePreURL !== "" && <div className="block-image">
                        <img src={imagePreURL} alt="" id="img" className="pre-image" />
                    </div>
                }

                <div className="form-group">
                    <label htmlFor="image">Select Image</label>
                    <input
                        id="image"
                        className=""
                        style={{ width: '100%', display: 'none' }}
                        type="file"
                        accept=".jpeg,.jpg,.png"
                        onChange={handleImageChange}
                        name="files[]"
                        multiple={false}
                    />
                </div>

                <button className="btn btn-dark w-100" onClick={Submit} disabled={!disableSubmit} >Register</button>

                <p className="my-2">
                    Already have an account? <Link to="/login" style={{ color: "crimson" }}>Login Now</Link>
                </p>
            </div>
        </div >
    )
}

export default Register