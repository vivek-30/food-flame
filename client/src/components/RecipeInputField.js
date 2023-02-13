const RecipeInputField = ({ fieldName, fieldValue, inputLabel, imageIcon, handleInputChange }) => {
  return (
    <div className="col s12 m6 l6">
      <label htmlFor={fieldName}>{inputLabel}</label>
      <div className="input-field">
        <img src={imageIcon} alt="Icon" className="input-field-icon" />
        <input
          type="text"
          name={fieldName}
          value={fieldValue}
          onChange={handleInputChange}
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default RecipeInputField;
