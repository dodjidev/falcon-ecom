const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
      name: {
         type: String,
         required: [true , "Vous devriez specifier le nom du produit"],
         unique: true    
      },
      description: {
        type: String ,
        required: true
      },
      price: {
        type: String,
        required: true
      },

      category: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      }
})

const productModel = mongoose.model("Prodcut", productSchema);

module.exports = productModel;

// let product = new Product({name: "Nike  air" , description: "Nike air 2022"});
// product.save()
