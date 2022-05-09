import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { toast, ToastContainer } from "react-toastify";

import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
    const dispatch = useDispatch()
    const { alert } = useSelector((state) => state);

    console.log("binh---", alert)
    return (
        <div>
            {alert.loading && <Loading />}

            {
                alert.error &&
                <Toast msg={{ title: 'Error', body: alert.error }}
                    handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
                    bgColor="bg-danger" />
                // toast.error(alert.error, {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // })
            }

            {
                alert.success &&
                // toast.success(alert.success, {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // })
                <Toast msg={{ title: 'Success', body: alert.success }}
                    handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
                    bgColor="bg-success" />
            }
        </div>
    )
}

export default Notify
