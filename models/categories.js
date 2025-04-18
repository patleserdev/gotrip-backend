const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  title: String,
 });


const Categorie = mongoose.model('categories', categoriesSchema);

module.exports = Categorie;
