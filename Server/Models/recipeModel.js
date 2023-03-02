const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a recipe name.']
  },
  imageSRC: {
    type: String,
    default: process.env.IMAGE_URL,
  },
  description: {
    type: String, 
    required: [true, 'Please provide a recipe description.']
  },
  ingredients: {
    type: [String],
    required: [true, 'Provide atleast one ingredient to save this recipe.']
  },
  cookingSteps: {
    type: [String],
    required: [true, 'Provide atleast one cooking step to save this recipe.']
  },
  userID: {
    type: String,
    required: [true, 'Recipe must belong to a user.']
  }
}, {timestamps: true});

module.exports = mongoose.model('Recipe', recipeSchema);
