import React from 'react';
import classes from './Order.css';

// import { returnStatement } from '@babel/types';

const order = (props) =>{
    // here we are converting functional to class component
    const ingredient = [];
    // we can use another method like in Burger(transformedIngredients)
    for(let ingredientName in props.ingredients){
        ingredient.push({
            name : ingredientName,
            amount : props.ingredients[ingredientName]
        });
    }

    const ingredientOutput =ingredient.map(ig => {
        return <span 
                key={ig.name} 
                style={{
                        textTransform:'capitalize',
                        display:'inline-block',
                        margin: '0 8px',
                        border:'1px solid #ccc',
                        padding : '5px'
                       }}> 
            {/* for printing the ingredients names and amount */}
                    {ig.name}
                    ({ig.amount})
               </span>
    })

    return(
    <div className={classes.Order}>
        {/* <p>Ingredients : Cheese(1)</p>
        <p>Price : <strong>$ 5.00</strong></p> */}
        <p>Ingredients :  {ingredientOutput}</p>
        <p>Price : <strong>$ {Number.parseFloat(props.totalPrice.toFixed(2))}</strong></p>
    </div>
    // Number.parseFloat(props.totalPrice.toFixed(2)) --> usage is for converting the string to number
    //  props.totalPrice.toFixed(2) --> for getting two decimal places with plus sign in previous page
)};

export default order;