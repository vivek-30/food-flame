import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReduxDispatch } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';

import addRecipe from '../redux/thunks/addRecipe';
import updateRecipe from '../redux/thunks/updateRecipe';
import { getUser } from '../redux/slices/authSlice';
import { getStatus, getError } from '../redux/slices/recipeSlice';

// Components.
import LoadingSpinner from '../components/LoadingSpinner';
import CookingStep from '../components/AddRecipePage/CookingStep';
import RecipeToolBar from '../components/AddRecipePage/RecipeToolBar';
import RecipeInputField from '../components/AddRecipePage/RecipeInputField';

// Icons For Input Field.
import UrlIcon from '../assets/AddRecipePage/url.svg';
import TitleIcon from '../assets/AddRecipePage/title.svg';
import ProcedureIcon from '../assets/AddRecipePage/procedure.svg';
import IngredientIcon from '../assets/AddRecipePage/ingredients.svg';
import DescriptionIcon from '../assets/AddRecipePage/description.svg';

// Utility Stuff.
import customAlert from '../utils/customAlert';
import useFetchRecipe from '../hooks/useFetchRecipe';

import { ICookingStep, IRecipe } from '../types/index.interfaces';
import { 
  RequestMethods,
  RecipeDetailsForDB,
  PartialRecipeDetails,
  CompleteRecipeDetails
} from '../types/index.types';

// Default Recipe Data.
export const emptyRecipe: PartialRecipeDetails = {
  name: '',
  description: '',
  imageSRC: '',
  ingredients: []
};
export const initialCookingStep: ICookingStep[] = [{ index: 0, content: '' }];
const defaultImageURL = 'https://cdn.pixabay.com/photo/2015/08/25/03/50/background-906135_960_720.jpg';

const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState<PartialRecipeDetails>(emptyRecipe);
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<string>('false');
  const [cookingSteps, setCookingSteps] = useState<ICookingStep[]>(initialCookingStep);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<ReduxDispatch>();
  const requestStatus = useSelector(getStatus);
  const error = useSelector(getError);
  const userID = useSelector(getUser)!;
  
  const { fetchRecipe, isLoading, recipe: fetchedRecipe } = useFetchRecipe();

  // Extract Query String Parameters.
  const updatingParam = searchParams.get('updating');
  const recipeID = updatingParam === 'true' ? searchParams.get('id') as string : 'invalid';
    
  useEffect(() => {
    setIsUpdating(updatingParam ? updatingParam : 'false');
    (async () => {
      if(updatingParam === 'true') {
        await fetchRecipe(userID, recipeID);
      }
    })();

  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(fetchedRecipe) {
      const { name, description, ingredients, cookingSteps } = fetchedRecipe;
      const imageSRC = fetchedRecipe.imageSRC || defaultImageURL;
      
      setRecipeData({ name, description, imageSRC, ingredients });
      setCookingSteps(cookingSteps.map((step, index): ICookingStep => {
        return { index, content: step };
      }));
    }
  }, [fetchedRecipe]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { name: fieldName, value } = e.target;

    setRecipeData((recipeData) => {
      if(fieldName === 'ingredients') {
        return { ...recipeData, [fieldName]: value.split(',') };
      }
      return { ...recipeData, [fieldName]: value };
    });
  }

  // Recipe Utility Functions.
  const manageRecipeUtil = (method: RequestMethods, body: RecipeDetailsForDB): void => {
    if(method === 'POST') {
      dispatch(addRecipe(body));
    }
    else {
      if(fetchedRecipe) {
        const recipeDataForUpdation: IRecipe = {
          ...fetchedRecipe,
          ...body,
          userID
        }
        dispatch(updateRecipe(recipeDataForUpdation));
      }
    }

    if(requestStatus === 'success') {
      // Clearing Input Fields.
      setRecipeData(emptyRecipe);
      setCookingSteps(initialCookingStep);

      if(isUpdating === 'true') {
        setIsUpdating('false');
      }
      
      customAlert(`Recipe ${method === 'POST' ? 'Saved' : 'Updated'} Successfully.`);
    }
    
    if(requestStatus === 'failure' && error) {
      customAlert(error);
      console.log(`Error cccured while ${method === 'POST' ? 'saving' : 'updating'} a recipe.`);
    }

    setIsRequestPending(state => !state);
  }

  const validateRecipeData = (data: CompleteRecipeDetails): boolean => {
    data.name = data.name.trim();
    data.description = data.description.trim();
    data.ingredients = data.ingredients.filter((ingredient) => ingredient.trim() !== '');
    
    // Cooking Steps Modification
    data.cookingSteps = data.cookingSteps.filter(({ content }) => content.trim() !== '');

    if(!data.imageSRC || data.imageSRC.trim() === '') {
      data.imageSRC = defaultImageURL;
    }

    if(data.name === '') {
      customAlert('Recipe Name Is Required');
      return false;
    } 
    else if(data.description === '') {
      customAlert('Please Provide A Suitable Recipe Description');
      return false;
    }
    else { 
      if(data.ingredients.length === 0) {
        customAlert(`You have to provide some ingredients to ${isUpdating === 'true' ? 'update' : 'save'} this recipe.`);
        return false;
      }

      if(data.cookingSteps.length === 0) {
        customAlert(`You have to provide atleast one cooking step to ${isUpdating === 'true' ? 'update' : 'save'} this recipe`);
        return false;
      }
    }

    return true;
  }

  const manageRecipe = (e: React.FormEvent): void => {
    e.preventDefault();

    // Check whether a POST/PUT request is already made or not.
    if(isRequestPending) return;
    else setIsRequestPending(true);
    
    const combinedRecipeData: CompleteRecipeDetails = { ...recipeData, cookingSteps };
    if(validateRecipeData(combinedRecipeData) === false) {
      setIsRequestPending(false);
      return;
    }

    // Extract "content" from cookingSteps: ICookingStep
    const stepsContent: string[] = combinedRecipeData.cookingSteps.map(({ content }) => content);
    // Attach "userID" field along with the recipe data.
    const modifiedRecipeData: RecipeDetailsForDB = {
      ...combinedRecipeData,
      userID, 
      cookingSteps: stepsContent
    };

    if(isUpdating === 'true') {
      manageRecipeUtil('PUT', modifiedRecipeData);
    }
    else {
      manageRecipeUtil('POST', modifiedRecipeData);
    }
  }

  // Cooking steps handlers.
  const handleStepInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let stepIndex = parseInt(e.target.dataset.stepIndex!);
    const { value } = e.target;

    setCookingSteps((currentCookingSteps) => (
      currentCookingSteps.map(({ index, content }) => {
        if(index === stepIndex) {
          return { index, content: value };
        }
        return { index, content };
      })
    ));
  }

  const removeCookingStep = (e: React.MouseEvent): void => {
    const target = e.target as HTMLElement;
    let stepIndex = parseInt(target.dataset.stepIndex!);
    if(cookingSteps.length === 1) {
      customAlert('Single cooking step can not be deleted.');
      return;
    }

    setCookingSteps((currentCookingSteps) => {
      let newIndex = 0;
      let updatedCookingSteps: ICookingStep[] = [];
      currentCookingSteps.forEach(({ index, content }) => {
        if(index !== stepIndex) {
          updatedCookingSteps.push({ index: newIndex++, content });
        }
      });
      return updatedCookingSteps;
    });
  }

  return (
    <>
    {
      isLoading ? <LoadingSpinner /> : (
          <section className="container" id="add-recipe-container">
          {
            <form onSubmit={manageRecipe} className="row">
              <RecipeInputField 
                fieldName="name"
                fieldValue={recipeData.name}
                inputLabel="Recipe Name"
                alignRight={false}
                imageIcon={TitleIcon}
                handleInputChange={handleInputChange}
              />
              <RecipeInputField 
                fieldName="description"
                fieldValue={recipeData.description}
                inputLabel="Recipe Description"
                alignRight={true}
                imageIcon={DescriptionIcon}
                handleInputChange={handleInputChange}
              />
              <RecipeInputField 
                fieldName="imageSRC"
                fieldValue={recipeData.imageSRC!}
                inputLabel="Paste Image URL (Not Required)"
                alignRight={false}
                imageIcon={UrlIcon}
                handleInputChange={handleInputChange}
              />
              <RecipeInputField 
                fieldName="ingredients"
                fieldValue={recipeData.ingredients}
                inputLabel="Ingredients (Seperate By Comma)"
                alignRight={true}
                imageIcon={IngredientIcon}
                handleInputChange={handleInputChange}
              />
              <div className="col s12 m11 l11 recipe-input-field procedure-input-field">
                <div className="icon-label-conatiner pos-relative">
                  <img src={ProcedureIcon} alt="Icon" className="input-field-icon" />
                  <label htmlFor="cookingSteps" className="input-field-label pos-absolute">Cooking Steps :</label>
                </div>
                { 
                  cookingSteps.map(({ index, content }) => (
                    <CookingStep 
                      key={index}
                      index={index}
                      content={content}
                      removeCookingStep={removeCookingStep}
                      handleStepInputChange={handleStepInputChange}
                    />
                  ))
                }
              </div>
              <RecipeToolBar
                manageRecipe={manageRecipe}
                setRecipeData={setRecipeData} 
                setCookingSteps={setCookingSteps}
              />
            </form>
          }
        </section>
      )
    }
    </>
  );
}

export default AddRecipe;
