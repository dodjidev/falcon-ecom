const express = require('express');
const productsRoute = require('./src/routes/product.rt')
const path = require('path');

let { APP_PORT , MONGOOSE_URI} = require('./src/configs');
let { base64Uploder } = require('./src/utils/files.utl');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))

const mongoose = require('mongoose');

mongoose.connect(MONGOOSE_URI)
    .then(response => {
        console.log('Connected successfully to mongo')
        app.listen(APP_PORT , function(){
            console.log('Server started successfully !!!')
        })
    })
    .catch(error => console.log('ouuups failed to connect to mongo', error.message))

app.get('/', function(req , res){
    res.status(200).json({message: "Your are awesome"});
})
app.use('/products' , productsRoute)
app.post('/upload' , async (req, res)=>{
       let base64 = req.body.image;
       let uploadRes = await base64Uploder(base64);
       console.log("uploadRes:", uploadRes)
       res.status(200).json({message: "Uploaded"});
})
app.use('/files', express.static(path.join(process.cwd() , 'src/storage')))

