import React from 'react';

interface IRecipeInputFieldProps {
  fieldName: string,
  fieldValue: string | string[],
  inputLabel: string,
  alignRight: boolean,
  imageIcon: string,
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const RecipeInputField = ({
  fieldName,
  fieldValue,
  inputLabel,
  alignRight,
  imageIcon,
  handleInputChange
}: IRecipeInputFieldProps) => {
  return (
    <div className={`col s12 m5 l5 recipe-input-field ${alignRight ? 'push-m1 push-l1' : ''}`}>
      <div className="icon-label-container pos-relative">
        <img src={imageIcon} alt="Icon" className="input-field-icon" />
        <label htmlFor={fieldName} className="input-field-label pos-absolute">{inputLabel}</label>
      </div>
      <div className="input-field">
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
