const express = require('express');
const app = express();
const multer = require('multer');
var extract = require('pdf-text-extract');
const path= require("path");

const port = 3000;

//setting up the file storage
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"uploads")
  },
  filename:function(req,file,cb){
    cb(null,file.originalname);
  },
});

const upload = multer({storage:storage});

app.post('/profile', upload.single('file'), (req, res, next) =>{
  try{

    var filePath = path.join(__dirname, 'test/data/multipage.pdf')
var extract = require('pdf-text-extract')
extract(filePath, function (err, pages) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir(pages)
})

  }catch(error){
    console.log(error)
  }
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});



app.get('/',(req,res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post('/pdftohtml',upload.single('pdf'),(req,res) => {
  if(!req.file) {
    res.status(400).send("No file uploaded")
    return
  }
  const pyshell = new PythonShell("convert_pdf2html.py",{
    mode:'text',
    pythonPath:'python',
    scriptPath:__dirname,
    args:[req.file.path]
  })
  pyshell.on('message',(message) =>{
    console.log(message)

  })
  pyshell.on('error',(message)=>{
    console.log(message)
    res.status(500).send("An error occured")
  })

  pyshell.end((err)=>{
    if(err){
      res.send(err)
      return
    }
    const htmlFilePath = req.file.path.replace('.pdf',".html")
    res.download (htmlFilePath,"converted.html",(err)=> {
  })

})
  console.log(req.file.path)

})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})