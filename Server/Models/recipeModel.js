const mongoose = require('mongoose');
require('dotenv').config();

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Recipe Name Is Required.']
  },
  imageSRC: {
    type: String,
    default: process.env.IMAGE_URL,
  },
  description: {
    type: String, 
    required: [true, 'Description Is Required.']
  },
  ingredients: {
    type: Array,
    required: [true, 'Ingredients are Required.']
  },
  cookingSteps: Array
}, {timestamps: true});

module.exports = mongoose.model('Recipe', recipeSchema);
