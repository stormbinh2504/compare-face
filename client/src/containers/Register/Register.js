import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../ultils/imageUpload'

import { sdkVNPTService, authService } from '../../services';

const Register = () => {

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
        }
    }

    const Submit = async () => {
        let imageURL = await imageUploadTest(avatar)
        // setUserData({ ...userData, avatar: imageURL })
        let body = {
            ...userData,
            avatar: imageURL.secure_url
        }
        await authService.RegisterClient(body)
    }
    return (
        <div div className='regiter-login' >
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username"
                    onChange={handleChangeInput} value={userData.username}
                />
            </div>

            <div className="form-group">
                <label htmlFor="username">password</label>
                <input type="text" className="form-control" id="password"
                    onChange={handleChangeInput} value={userData.password}
                />
            </div>

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

            <button onClick={Submit}>Submit</button>
        </div >
    )
}

export default Register