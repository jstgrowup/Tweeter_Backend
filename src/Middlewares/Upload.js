const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
require("dotenv").config();
const storage = new GridFsStorage({
  URL: process.env.MONGO_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match=["image/png","image/jpeg"]
    if(match.indexOf(file.mimetype)===-1){
        const filename=`${Date.now()}-any-name-${file.original}`
    }
  },
});
