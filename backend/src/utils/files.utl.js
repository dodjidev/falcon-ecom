const fs = require('fs');

exports.base64Uploder = (base64)=>{
     return new Promise((resolve , reject)=>{
           try{
                    if(!base64) resolve({success: false , data: "Veuillez specifier une image valide"}) ;

                    let imageParts = base64.split(';base64,');
            
                    let image = imageParts[1];
            
                    let extension = imageParts[0].split('/')[1];
            
                    let buffer = Buffer.from(image , 'base64');
            
                    let path = "src/storage/productsImages/";
            
                    let filename = (new Date()).getTime() + "." + extension;
                    let fullname = path + filename
            
                    fs.mkdirSync(path , {recursive: true});
            
                    fs.writeFile(fullname , buffer , function(err){
                        if( err ) console.log('err:', err.message)
                        console.log('file uploded successfully' , "/files/productsImages/"+filename);
                        resolve({ success: true , data: "http://localhost:3400/files/productsImages/"+filename})
                    });     
           }catch(e){
                  resolve({ success: false , data: e.message})
           }
     })

}