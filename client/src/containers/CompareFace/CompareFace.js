import React, { useEffect } from 'react'

// https://res.cloudinary.com/stormbinh2504/image/upload/v1651814101/binhha/qwxtedepjkgh9sptipxe.png

let urlHost = "http://localhost:3000/"
const CompareFace = () => {

  const addLibToDom = () => {
    let pathname = window.location.pathname
    pathname = pathname.split('/')
    const script = document.createElement("script");
    script.id = "sdk-ekyc"
    // script.src = pathname && pathname.length >= 3 ? `/${pathname[1]}/sdk.js` : "/sdk.js";
    script.src = process.env.PUBLIC_URL + "/sdk.js";
    script.async = true;
    document.body.appendChild(script);
  }

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

  useEffect(() => {
    let pathname = window.location.pathname
    const script = document.createElement("script");
    script.id = "libForSdk"
    // script.src = pathname && pathname.length >= 3 ? `/${pathname[1]}/libForSdk.js` : "/libForSdk.js";
    script.src = process.env.PUBLIC_URL + "/libForSdk.js";
    script.async = true;
    document.body.appendChild(script);
    addLibToDom()

    // return () => {
    //   document.body.removeChild(script);
    // }
  }, []);



  return (
    <div className='compare-face'>
      <div id="ekyc_sdk_intergrated"></div>
      <div id="face_image_ekyc">
        <img id='image_result_ekyc' src="" alt="" />
      </div>
      <div id="error-ekyc" className="hidden">
        <p id="content-error-ekyc"></p>
        <button className="btn-reload" onClick={handleReset}>reset</button>
      </div>
    </div>
  )
}

export default CompareFace