import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return{
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName : name
    };
};

export const removeIngredient = (name)=>{
    return{
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName : name
    };
};


//setting the ingredients --> synchrounous code

export const setIngredient = (ingredient)  => {
   return{
       type:actionTypes.SET_INGREDIENTS,
       ingredients : ingredient //payload
   };
};

export const fetchIngredientFailed = () => {
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};



//here we are fetching the ingredients and these async code that set the ingredients with 'setIngredinets ' method call
export const initIngredients = () => {
    return dispatch =>{
        axios.get("https://burger-app-7bd4e.firebaseio.com/ingredients.json") //it sends the request to firebase
        .then(response => {
            console.log(response)
            // this.setState({ ingredients: response.data}) 
            dispatch(setIngredient(response.data)); //axios getfunction contains 'response'as JS object so we are using 'data' property
        })
        .catch(error => { 
            // this.setState({error:true})
            dispatch(fetchIngredientFailed());
        });
    };
};

// export const initIngreadients = () => {
//     return (dispatch) => {
//         axios.get('https://burger-app-7bd4e.firebaseio.com/ingredients.json')
//             .then((result) => {
//                 dispatch(setIngredient(result.data))
//             })
//             .catch((err )=> {
//                dispatch(fetchIngredientFailed())
//             })
//     }
// }