import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { compressImage } from "../../utils/imageUpload"
import { sdkVNPTService, authService } from '../../services';
import "./CompareFace.scss"

const CompareFace = () => {
  const { auth } = useSelector((state) => state);

  const addLibToDom = () => {
    let pathname = window.location.pathname
    pathname = pathname.split('/')
    const script1 = document.createElement("script");
    script1.id = "sdk-ekyc"
    // script1.src = pathname && pathname.length >= 3 ? `/${pathname[1]}/sdk.js` : "/sdk.js";
    script1.src = process.env.PUBLIC_URL + "/sdk.js";
    script1.async = true;
    document.body.appendChild(script1);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "libForSdk"
    script.src = process.env.PUBLIC_URL + "/libForSdk.js";
    script.async = true;
    document.body.appendChild(script);


    let pathname = window.location.pathname
    pathname = pathname.split('/')
    const script1 = document.createElement("script");
    script1.id = "sdk-ekyc"
    // script1.src = pathname && pathname.length >= 3 ? `/${pathname[1]}/sdk.js` : "/sdk.js";
    script1.src = process.env.PUBLIC_URL + "/sdk.js";
    script1.async = true;
    document.body.appendChild(script1);

  }, []);



  const removeLibFromDom = () => {
    let sdk = document.getElementById("sdk-ekyc");
    let ekyc_sdk_intergrated = document.getElementById("ekyc_sdk_intergrated")
    ekyc_sdk_intergrated.classList.remove('hidden')

    let image = document.getElementById("image_result_ekyc")
    image.src = ''

    if (sdk) {
      document.body.removeChild(sdk)
    }
  }

  const handleReset = async () => {
    let load_ekyc = document.getElementById("load-ekyc")
    if (load_ekyc) {
      load_ekyc.classList.remove('hidden')
    }
    this.removeLibFromDom();
    this.addLibToDom();
  }



  const uploadImage2Server = async (body) => {
    alert(1)
    const resObj = {
      error: '',
      data: '',
      message: ''
    }

    await sdkVNPTService.addFileServerEkyc(body)
      .then((responses) => {
        if (responses) {
          console.log("binh----responses", responses)
          resObj.error = false
          resObj.data = responses.data.object.hash
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


  const handleCompare2Faces = async (data) => {

    const body = {
      // image_hash_front: "idg20220508-d0d3238d-6720-3187-e053-62199f0ac777/IDG01_a2900e27-cea8-11ec-bad5-99fd408e3de2",
      image_hash_front: auth.user.hashAvatar,
      image_hash_face: data,
    }
    
    await sdkVNPTService.compare2Faces(body)
      .then((res) => {
        console.log("binh---", res)
      })
      .catch(error => {
        alert("catch" + error)
      })
  }

  const handleSubmit = async () => {
    let imageBase64
    let fileImage
    let fileName = `dsc_face_${Math.random() * 100000000}` // session client
    const image = document.getElementById("image_result_ekyc")
    imageBase64 = await image.src && image.src.indexOf('data:image') !== -1 ? image.src : ''
    if (image && imageBase64) {
      await fetch(imageBase64)
        .then(res => res.blob())
        .then(blob => {
          fileImage = new File([blob], fileName, { type: "image/png" })
        }).catch(error => {
          alert('error while convert', error)
          return
        })
      if (fileImage && fileImage.size !== 0) {
        let imageOptimize

        try {
          imageOptimize = await compressImage(fileImage)
        } catch (error) {
          imageOptimize = null
          return
        }
        const body = {
          file: imageOptimize,
          title: 'Upload image face',
          description: 'Test upload image face'
        }
        let res = await uploadImage2Server(body)
        if (res) {
          await handleCompare2Faces(res.data)
        } else {
          alert('error when while upload', res && res.message)
        }
      }
    } else {
      alert('Không tìm thấy ảnh, vui lòng thử lại')
    }
  }

  return (
    <div className='compare-face'>
      <div className='block-compare-face container'>
        <div id="ekyc_sdk_intergrated"></div>
        <div id="face_image_ekyc">
          <img id='image_result_ekyc' src="" alt="" />
        </div>
        <div id="error-ekyc" className="hidden">
          <p id="content-error-ekyc"></p>
          {/* <button className="btn-reload" onClick={handleReset}>reset</button> */}
          <button className="btn btn-info" onClick={handleSubmit}>Xác thực</button>
        </div>
      </div>
    </div>
  )
}

export default CompareFace