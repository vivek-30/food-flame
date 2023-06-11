import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import useRecipeContext from '../hooks/useRecipeContext';

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
import { RECIPE_BASE_URI, ADD_RECIPE_URI } from '../constants/URIs';

import { ICookingStep } from '../types/index.interfaces';
import { 
  RequestMethods,
  RecipeResponseData,
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
  const [isUpdating, setIsUpdating] = useState<string>('false');
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  const [cookingSteps, setCookingSteps] = useState<ICookingStep[]>(initialCookingStep);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const { dispatch } = useRecipeContext();
  const { state: authState } = useAuthContext();
  const [searchParams] = useSearchParams();
  
  const { user: userID } = authState;  
  
  // Extract Query String Parameters.
  const updatingParam = searchParams.get('updating');
  const recipeID = updatingParam === 'true' ? searchParams.get('id') : 'invalid';

  const fetchRecipeData = () => {    
    (async () => {
      const response = await fetch(`${RECIPE_BASE_URI}/${recipeID}?id=${userID}`, { credentials: 'include' });
      const data: RecipeResponseData = await response.json();

      setIsLoading(false);

      if(response.ok && !('error' in data)) {
        const { name, description, ingredients, cookingSteps } = data;
        const imageSRC = data.imageSRC || defaultImageURL;

        setRecipeData({ name, description, imageSRC, ingredients });
        setCookingSteps(cookingSteps.map((step, index): ICookingStep => {
          return { index, content: step };
        }));
      } else if('error' in data) {
        const { message, error } = data;
        customAlert(message);
        console.log(`Error Occured While Fetching A Recipe: ${error}`);
      }
    })();
  }
    
  useEffect(() => {
    setIsUpdating(updatingParam ? updatingParam : 'false');
    if(recipeID !== 'invalid') {
      fetchRecipeData();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

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
  const manageRecipeUtil = (
    URL: string,
    method: RequestMethods,
    body: RecipeDetailsForDB
  ): void => {
    (async () => {
      const response = await fetch(URL, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
      });
      
      const data: RecipeResponseData = await response.json();

      if(response.ok && !('error' in data)) {
        // Clearing Input Fields.
        setRecipeData(emptyRecipe);
        setCookingSteps(initialCookingStep);

        // Updating Global Context State.
        if(isUpdating === 'true') {
          dispatch({ type: 'UPDATE_RECIPE', payload: data });
          setIsUpdating('false');
        } else {
          dispatch({ type: 'ADD_RECIPE', payload: data });
        }
        
        customAlert(`Recipe ${method === 'POST' ? 'Saved' : 'Updated'} Successfully.`);
      } else if('error' in data) {
        const { message, error } = data;
        customAlert(message);
        console.log(`Error Occured While ${method === 'POST' ? 'Saving' : 'Updating'} A Recipe: ${error}`);
      }

      // Allow user to make another request.
      setIsRequestPending((state) => !state);
    })();
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
    if(validateRecipeData(combinedRecipeData) === false) return;

    // Extract "content" from cookingSteps: ICookingStep
    const stepsContent: string[] = combinedRecipeData.cookingSteps.map(({ content }) => content);
    // Attach "userID" field along with the recipe data.
    const modifiedRecipeData: RecipeDetailsForDB = {
      ...combinedRecipeData,
      userID, 
      cookingSteps: stepsContent
    };

    if(isUpdating === 'false') {
      manageRecipeUtil(ADD_RECIPE_URI, 'POST', modifiedRecipeData);
    } else {
      manageRecipeUtil(`${RECIPE_BASE_URI}/${recipeID}?id=${userID}`, 'PUT', modifiedRecipeData);
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
      customAlert("Single Cooking Step Can't be Deleted.");
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
