import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, error,onChange }) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          aria-labelledby={`${name}`}
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={(event) => onChange(event.target.value)}
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = ( 
      <textarea 
      name={name} 
      aria-labelledby={`${name}`}
      data-testid="field-testid" 
      onChange={(event) => onChange(event.target.value)}  
      />);
      break;
    default:
      component = (
        <input
          type="text"
          aria-labelledby={`${name}`}
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={(event) => onChange(event.target.value)} 

        />
      );
  }
  return (
    <div className="inputField">
      {/* <span>{label}</span> */}
      <label id={`${name}`} htmlFor={name}>{label}</label>
      {error && <span className="error">{error}</span>}
      {component}
      
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string, // Déclarez la prop error ici
  onChange: PropTypes.func,

};
 Field.defaultProps = {
   label: "",
   placeholder: "",
   type: FIELD_TYPES.INPUT_TEXT,
   name: "field-name",   
   error: "",
   onChange: () => {},

 }

export default Field;
