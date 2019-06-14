import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) =>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}> {props.ingredientlabel} </div>
        <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabling}> Less </button> 
        {/* here disabled --> predefined method and we are passing that btn should be disappear at zero condition*/}
        <button 
            className={classes.More} 
            onClick={props.added}> More </button>
    </div>
);

export default buildControl;