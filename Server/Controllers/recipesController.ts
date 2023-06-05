import { RequestHandler, Request, Response } from "express";

import Recipes from '../Models/recipeModel';

export const getAllRecipes: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: userID } = req.query;
  try {
    const recipes = await Recipes.find({ userID }).sort({ name: 'asc' });
    res.status(200).json(recipes);
  } catch(error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Internal Server Error.', error: errorMessage });
  }
}

export const getSpecificRecipe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: userID } = req.query;
  const { id: recipeID } = req.params;

  try {
    const recipe = await Recipes.findOne({ _id: recipeID, userID });
    if(recipe === null) {
      res.status(404).json({ message: 'No Recipe Found!!!' });
    } else {
      res.status(200).json(recipe);
    }
  } catch(error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Internal Server Error.', error: errorMessage });
  }
}

export const addNewRecipe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe = await Recipes.create(req.body);
    res.status(200).json(recipe);
  } catch(error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Unable To Add Recipe.', error: errorMessage });
  }
}

export const updateOneRecipe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: userID } = req.query;
  const { id: recipeID } = req.params;

  try {
    const outdatedRecipe = await Recipes.findOneAndUpdate({ _id: recipeID, userID }, req.body);
    const updatedRecipe = await Recipes.findById(recipeID);
    res.status(200).json(updatedRecipe);
  } catch(error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Unable To Update Recipe.', error: errorMessage });
  }
}

export const removeOneRecipe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: userID } = req.query;
  const { id: recipeID } = req.params;

  try {
    const recipe = await Recipes.findOneAndDelete({ _id: recipeID, userID });
    if(recipe === null) {
      res.status(404).json({ message: 'Recipe No Longer Exists!!!' });
    } else {
      res.status(200).json(recipe);
    }
  } catch(error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error Removing Recipe!!!', error: errorMessage });
  } 
}

// This method is useful for pagination purposes.
export const getLimitedRecipes: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  let quantity = Number(req.params.quantity);
  try {
    const recipes = await Recipes.find({}).limit(quantity).sort({ createdAt: 'desc' });
    res.status(200).json(recipes);
  } catch(error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Internal Server Error.', error: errorMessage });
  }
}
