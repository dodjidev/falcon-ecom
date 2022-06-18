
let Product = require('../models/product.mdl');
let { base64Uploder } = require('../utils/files.utl')

exports.list = (req, res)=>{
    Product.find()
       .then( response => res.status(200).json({ success: true , data: response}))
       .catch( error =>  res.status(500).json({success: false , data: error.message}))
}

exports.store = async (req , res)=>{
    let data = req.body;
    let image = data.image;

    delete data.image;

    let uploadRes = await base64Uploder(image);

    console.log("uploadRes:", uploadRes)

    if(!uploadRes.success){
        res.status(500).json({success: false , data: "Failed to uploded your image"});
        return
    }

    data.image = uploadRes.data;

    let product = new Product(data);

    product.save()
     .then( response => res.status(200).json({success: true , data: response}))
     .catch( error => res.status(500).json({success: false , data: error.message}))
}

exports.show = (req , res)=>{
     let id = req.params.id;

     Product.findById(id)
         .then(response => res.status(200).json({success: true , data: response}))
         .catch( error => res.status(500).json({success: false, data: error.message}))
}

exports.delete = (req , res)=>{
     let id = req.params.id;
     Product.deleteOne({_id: id})
        .then(response => res.status(200).json({success: true , data: response}))
        .catch( error =>  res.status(500).json({success: false , data: error.message}))
}

exports.update = async  (req , res)=>{
    let data = req.body;
    let image = data.image;

    let id = req.params.id;

    delete data.image;

    if(image){
        let uploadRes = await base64Uploder(image);
        console.log("uploadRes:", uploadRes)
    
        if(!uploadRes.success){
            res.status(500).json({success: false , data: "Failed to uploded your image"});
            return
        }
        data.image = uploadRes.data;
    }
   
    Product.updateOne({_id : id}, data)
     .then( response => res.status(200).json({success: true , data: response}))
     .catch( error => res.status(500).json({success: false , data: error.message}))
}
