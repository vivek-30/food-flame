const CookingStep = ({ index, content, handleStepInputChange, removeCookingStep }) => {
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
