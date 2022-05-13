import React, { useState } from 'react'
import { ToastSuccess, ToastError } from '../../utils/ToastUtil'
import { loginAuthentication, alertType } from '../../redux/actions/authAction'
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'

const CompareOTP = () => {
    const [numberOTP, setNumberOTP] = useState("")
    
    return (
        <div>CompareOTP</div>
    )
}

export default CompareOTP