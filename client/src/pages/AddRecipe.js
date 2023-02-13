import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';

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

    if(data.imageSRC && data.imageSRC.trim() === '') delete data.imageSRC;

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
          <div className="col s12 m6 l6">
            <label htmlFor="name">Recipe Name</label>
            <div className="input-field">
              <img src={TitleIcon} alt="Icon" className="input-field-icon" />
              <input 
                type="text" 
                name="name" 
                value={recipeData.name} 
                onChange={handleInputChange} 
                spellCheck="false" 
                autoComplete="off" 
              />
            </div>
          </div>
          <div className="col s12 m6 l6">
            <label htmlFor="description">Recipe Description</label>
            <div className="input-field">
              <img src={DescriptionIcon} alt="Icon" className="input-field-icon" />
              <input 
                type="text" 
                name="description" 
                value={recipeData.description} 
                onChange={handleInputChange} 
                spellCheck="false" 
                autoComplete="off" 
              />
            </div>
          </div>
          <div className="col s12 m6 l6">
            <label htmlFor="imageSRC">Paste Image URL (Not Required)</label>
            <div className="input-field">
              <img src={UrlIcon} alt="Icon" className="input-field-icon" />
              <input 
                type="text" 
                name="imageSRC" 
                value={recipeData.imageSRC} 
                onChange={handleInputChange} 
                spellCheck="false" 
                autoComplete="off" 
              />
            </div>
          </div>
          <div className="col s12 m6 l6">
            <label htmlFor="ingredients">Ingredients (Seperate By Comma)</label>
            <div className="input-field">
              <img src={IngredientIcon} alt="Icon" className="input-field-icon" />
              <input 
                type="text" 
                name="ingredients" 
                value={recipeData.ingredients} 
                onChange={handleInputChange} 
                spellCheck="false" 
                autoComplete="off" 
              />
            </div>
          </div>
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
