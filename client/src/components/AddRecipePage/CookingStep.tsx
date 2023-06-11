import React from 'react';

interface ICookingStepProps {
  index: number,
  content: string,
  handleStepInputChange(e: React.ChangeEvent<HTMLInputElement>): void,
  removeCookingStep(e: React.MouseEvent): void
}

const CookingStep = ({ index, content, handleStepInputChange, removeCookingStep }: ICookingStepProps) => {
  return (
    <div className="input-field">
      <i onClick={removeCookingStep} className="material-icons prefix" data-step-index={index}>clear</i>
      <input 
        type="text" 
        name="cookingSteps"
        data-step-index={index}
        value={content} 
        onChange={handleStepInputChange} 
        spellCheck="false" 
        autoComplete="off" 
      />
    </div>
  );
}

export default CookingStep;
