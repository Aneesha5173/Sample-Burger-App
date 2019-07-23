import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
  
    let transformIngredient = Object.keys(props.ingredient) //notes down
    .map(ingredientKey => {
        return [...Array(props.ingredient[ingredientKey])].map((_,index) => {
           return <BurgerIngredient key={ingredientKey + index}  type={ingredientKey}> </BurgerIngredient>
        }); //Array() provided by JS
    })
    .reduce((arr,ele) => {
        return arr.concat(ele);
    },[]);

    if(transformIngredient.length === 0) { //checking condition
        transformIngredient = <p>Please start adding ingredients! </p>
    }

 
     
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {/* <BurgerIngredient type="salad"></BurgerIngredient>
            <BurgerIngredient type="meat"></BurgerIngredient> */}
            {transformIngredient}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
}

export default burger;



// here 'Object' is a JavaScript object but n't a react one.
//it has a 'key' method which extracts the keys of a gien oject and turns that into an array,
//it takes only 'key' data butn't value data
//example : ingredients :[
    // salad(key) : 1(value),
    // .....
// ]
// so it takes only key's butn't values.




// reduce()
// ---------------------------
//  reduce() method allows us to transform an array into something else
//  reduce() takes a function as an input and it receies two arguments passed in automatically by JS
// the prev.value and the current value.
// these method doesn't only accept these callback here,which 
// is executed on every element in this array we return here,it also accepts an initial value,
// for example : let's say an empty array,so the initial value of the reduced value
// now of course you want to adjust this reduced value by returning something and it will
// then loop through all the elements and simply add them to the initial value step by step
