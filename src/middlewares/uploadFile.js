import multer from 'multer'
import path from 'path'
import { nanoid } from 'nanoid'


let imageRoute = ''
if (process.env.NODE_ENV === 'production') {
  imageRoute = 'https://blog-mern-stack-matiasgdev.herokuapp.com/'
}

const manageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageRoute + 'files/images')
  },
  filename: function(req, file, cb) {
    let fileName = nanoid(5) + path.extname(file.originalname)
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
    cb(new Error('Solo se permiten imagenes'))
  }

}

const upload = multer({
  storage: manageStorage,
  fileFilter: function (_, file, cb) {
    onlyImagesFilter(file, cb)
  }
})

export default upload