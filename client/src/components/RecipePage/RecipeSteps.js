import { useEffect, useRef } from 'react';
import M from 'materialize-css';

const RecipeSteps = ({ steps }) => {
  const collapsibleListRef = useRef();
  
  useEffect(() => {
    setTimeout(() => {
      M.Collapsible.init(collapsibleListRef.current);
    }, 1000);
  }, []);
  
  return (
    <div className="col s12 m12 l12 z-depth" id="procedure-box">
      <h4 className="blue-grey-text text-darken-3">Procedure :</h4>
      <ul ref={collapsibleListRef} className="collapsible popout">
        {
          steps.map((step, index) => (
            <li key={index} className={(index&1) ? 'white' : ''}>
              <div className={`collapsible-header ${(index&1) ? 'blue-grey lighten-5' : ''}`}>
                <i className="material-icons">chevron_right</i>
                <span>Step - {index + 1}</span>
              </div>
              <div className="collapsible-body">
                <p className="flow-text">{step}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default RecipeSteps;
