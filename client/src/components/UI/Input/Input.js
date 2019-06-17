import React from 'react';
import classes from './Input.css';

const input =(props)=>{
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if(props.invalid && props.shouldValid && props.touch){
        inputClasses.push(classes.InValid);
  }

  switch(props.elementType){
      case ( 'input' ):
            inputElement=<input  
                            className={inputClasses.join(' ')} 
                            value={props.value}
                            onChange={props.change}
                            {...props.elementConfig}>
                         </input>;
            break;
      case ( 'textarea' ):
            inputElement=<textarea
                            className={inputClasses.join(' ')}
                            value={props.value}
                            onChange={props.change}
                            {...props.elementConfig}>
                         </textarea>;
            break;
      case ( 'select' ):
            inputElement = (
                  <select className = {inputClasses.join(' ')}  value={props.value}  onChange={props.change}>
                        {props.elementConfig.options.map(opt => (
                              <option key={opt.value} value={opt.value}>
                                    {opt.displayValue}
                              </option>
                        ))}      
                  </select>
            );
            break;
       default:
            inputElement=<input 
                            className={inputClasses.join(' ')}
                            value={props.value}
                            {...props.elementConfig}>
                         </input>;
  }

  return(
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>     
        {inputElement}   
    </div>
)};

export default input;
