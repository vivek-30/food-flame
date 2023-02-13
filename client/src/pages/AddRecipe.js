import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';
import RecipeInputField from '../components/RecipeInputField'

// Icons For Input Field
import UrlIcon from '../assets/url.svg';
import TitleIcon from '../assets/title.svg';
import IngredientIcon from '../assets/recipe.svg';
import ProcedureIcon from '../assets/recipe-book.svg';
import DescriptionIcon from '../assets/description.svg';

const AddRecipe = () => {

  const emptyRecipe = {
    name: '',
    description: '',
    imageSRC: '',
    ingredients: [],
    cookingSteps: []
  };

  const [recipeData, setRecipeData] = useState(emptyRecipe);
  const [isUpdating, setIsUpdating] = useState('false');
  // const [cookingSteps, setCookingSteps] = useState([{ index: 0, content: '' }]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  // Extract Query String Parameters.
  const updatingParam = searchParams.get('updating');
  const recipeID = updatingParam === 'true' ? searchParams.get('id') : 'invalid';

  const defaultImageURL = 'https://cdn.pixabay.com/photo/2015/08/25/03/50/background-906135_960_720.jpg';

  const fetchRecipeData = () => {    
    (async () => {
      const response = await fetch(`http://localhost:4000/recipes/${recipeID}`);
      const data = await response.json();

      setIsLoading(false);

      if(response.ok) {
        setRecipeData(data);
      } else {
        const { message, error } = data;
        alert(message);
        console.log(`Error Occured While Fetching A Recipe: ${error}`);
      }
    })();
  }
    
  useEffect(() => {
    setIsUpdating(updatingParam);
    if(recipeID !== 'invalid') {
      fetchRecipeData();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    let {
      name: fieldName,
      value: fieldValue
    } = e.target;

    if(fieldName === 'ingredients') {
      fieldValue = fieldValue.split(',');
    } else if(fieldName === 'cookingSteps') {
      fieldValue = fieldValue.split(',');  
    }

    setRecipeData((recipeData) => ({ ...recipeData, [fieldName]: fieldValue }));
  }

  // Recipe Utility Functions.
  const manageRecipeUtil = (URL, method, body) => {
    (async () => {
      const response = await fetch(URL, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) 
      });
      const data = await response.json();

      if(response.ok) {
        setRecipeData(emptyRecipe);
        alert(`Recipe ${method === 'POST' ? 'Saved' : 'Updated'} Successfully.`);
      } else {
        const { message, error } = data;
        alert(message);
        console.log(`Error Occured While ${method === 'POST' ? 'Saving' : 'Updating'} A Recipe: ${error}`);
      }
    })();
  }

  const validateRecipeData = (data) => {

    data.name = data.name.trim();
    data.description = data.description.trim();
    data.ingredients = data.ingredients.filter((ingredient) => ingredient.trim() !== '');
    data.cookingSteps = data.cookingSteps.filter((step) => step.trim() !== '');

    if(data.imageSRC.trim() === '') {
      data.imageSRC = defaultImageURL;
    }

    if(data.name === '') {
      alert('Recipe Name Is Required');
      return false;
    } else if(data.description=== '') {
      alert('Please Provide A Suitable Recipe Description');
      return false;
    } else { 
      if(data.ingredients.length === 0) {
        alert(`You have to provide some ingredients to ${isUpdating === 'true' ? 'update' : 'save'} this recipe.`);
        return false;
      }

      if(data.cookingSteps.length === 0) {
        alert(`You have to provide atleast one cooking step to ${isUpdating === 'true' ? 'update' : 'save'} this recipe`);
        return false;
      }
    }

    return true;
  }

  // Bottom Button Handlers.
  const manageRecipe = (e) => {
    e.preventDefault();

    let modifiedRecipeData = recipeData;
    if(validateRecipeData(modifiedRecipeData) === false) return;

    if(isUpdating === 'false') {
      manageRecipeUtil('http://localhost:4000/recipes/add-recipe', 'POST', modifiedRecipeData);
    } else {
      manageRecipeUtil(`http://localhost:4000/recipes/${recipeID}`, 'PUT', modifiedRecipeData);
      setIsUpdating('false');
    }
  }

  const navigateBackward = (e) => {
    e.preventDefault();
    navigate('/home');
  }

  const addNewCookingStep = (e) => {
    e.preventDefault();
  }

  return (
    <section className="container" id="add-recipe-container">
      {
        isLoading ? <LoadingSpinner /> :
        <form onSubmit={manageRecipe} className="row">
          <RecipeInputField 
            fieldName="name"
            fieldValue={recipeData.name}
            inputLabel="Recipe Name"
            imageIcon={TitleIcon}
            handleInputChange={handleInputChange}
          />
          <RecipeInputField 
            fieldName="description"
            fieldValue={recipeData.description}
            inputLabel="Recipe Description"
            imageIcon={DescriptionIcon}
            handleInputChange={handleInputChange}
          />
          <RecipeInputField 
            fieldName="imageSRC"
            fieldValue={recipeData.imageSRC}
            inputLabel="Paste Image URL (Not Required)"
            imageIcon={UrlIcon}
            handleInputChange={handleInputChange}
          />
          <RecipeInputField 
            fieldName="ingredients"
            fieldValue={recipeData.ingredients}
            inputLabel="Ingredients (Seperate By Comma)"
            imageIcon={IngredientIcon}
            handleInputChange={handleInputChange}
          />
          <div className="col s12 m12 l12">
            <h3>Cooking Steps</h3>
            <div className="input-field">
              <img src={ProcedureIcon} alt="Icon" className="input-field-icon steps-icon" />
              <input 
                type="text" 
                name="cookingSteps" 
                value={recipeData.cookingSteps} 
                onChange={handleInputChange} 
                spellCheck="false" 
                autoComplete="off" 
              />
            </div>
          </div>
          <div className="col s12 m12 l12" id="btn-group">
            <button onClick={manageRecipe} className="btn-large col s3 m3 l3">
              {isUpdating === 'true' ? 'Update' : 'Add'} Recipe
            </button>
            <button onClick={navigateBackward} className="btn-large col s3 m3 l3">Go Back</button>
            <button onClick={addNewCookingStep} className="btn-large col s3 m3 l3">Add Step</button>
          </div>
        </form>
      }
    </section>
  );
}

export default AddRecipe;
