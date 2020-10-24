import multer from 'multer'
import path from 'path'

const manageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images')
  },  
  filename: function(req, file, cb) {
    const date = new Date()
    let fileName = date.getTime() + file.originalname
    cb(null, fileName)
  }
}) 


const onlyImagesFilter = (file, cb) => {
  const fileType = /jpg|png|jpeg/
  const mimetype = fileType.test(path.extname(file.originalname).toLowerCase())
  const extname = fileType.test(file.mimetype)
  
  if (mimetype && extname) {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten imagenes JPG/PNG/JPEG'))
  }

}

const upload = multer({
  storage: manageStorage,
  fileFilter: function (_, file, cb) {
    onlyImagesFilter(file, cb)
  }
})

export default upload