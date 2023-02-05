const Recipe = ({ recipeObject }) => {
  const { name, description, ingredients, cookingSteps, imageSRC } = recipeObject;
  return (
    <div className="recipe-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{ingredients}</p>
      <strong>{imageSRC}</strong>
      <p>{cookingSteps}</p>
    </div>
  );
}

export default Recipe;
