const Recipe = ({ recipeObject }) => {
  const { name, description, imageSRC } = recipeObject;
  return (
    <div className="card recipe-card col s12 m5 l3">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src={imageSRC} alt={name} />
      </div>
      <div class="card-content">
        <strong class="card-title activator grey-text text-darken-4 left">
          {name}
          <i class="material-icons">more_vert</i>
        </strong>
        {/* <p><a href="#">This is a link</a></p> */}
      </div>
      <div class="card-reveal grey lighten-4">
        <span class="card-title grey-text text-darken-4">
          {name}
          <i class="material-icons right">close</i>
        </span>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Recipe;
