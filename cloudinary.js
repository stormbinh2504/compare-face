const { Promise } = require("mongoose")

const cloudinary = require("cloudinary").v2

doten.config()

cloudinary.config({
    cloud_name: "stormbinh2504",
    api_key: "462497677624674",
    api_secret: "JEMq_32JvfMbAh6EzmCw-4ZQNOk",
    secure: true
})

uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id,
            })
        }, {
            resource_type: "auto",
            folder,
        })
    })
}

export default uploads