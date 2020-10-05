import multer from 'multer'

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

const upload = multer({
  storage: manageStorage
})

export default upload