import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label : 'Salad' , type: 'salad'},
    {label : 'Bacon' , type: 'bacon'},
    {label : 'Cheese' , type: 'cheese'},
    {label : 'Meat' , type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
      <p>Current Price :<strong> $ {props.totalPrice.toFixed(2)}</strong></p>  
         {/* for displaying the price and then we are fixing into decimal place to 2-digits only  */}   
        {controls.map(ctrl => (
            <BuildControl 
               key={ctrl.label} 
               ingredientlabel={ctrl.label}
               //    type={ctrl.type}
               added={() => props.ingredientAdded(ctrl.type)}
               removed = {()=> props.ingredientDeleted(ctrl.type)}
               disabling={props.btndisable[ctrl.type]}></BuildControl>
        ))}
        <button 
            className={classes.OrderButton}
            onClick={props.ordered}
            disabled={!props.btnpurchase}>ORDER NOW</button> 
        {/* why we use the '!' symbol because btnpurchase is true and disable meaning is true */}
    </div>
);

export default buildControls;