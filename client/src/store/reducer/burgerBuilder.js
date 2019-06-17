import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients : null,
    // ingredients:{
    //     salad : 0,
    //     bacon : 0,
    //     meat : 0,
    //     cheese : 0
    // },
    totalPrice : 4,
    purchaseable : false,
    purchasing : false,
    error : false
}

const INGREDIENT_PRICES = {
    salad : 0.5,
    meat : 1.3,
    cheese : 0.4,
    bacon : 0.7
}

const reducer = (state = initialState , action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENTS :
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                 },
                 totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS :
            return{
                ...state,
                // ingredients :action.ingredients,//---> if we want the order for ingredients then we can do like these
                ingredients : {
                    salad : action.ingredients.salad,
                    bacon : action.ingredients.bacon,
                    cheese :  action.ingredients.cheese,
                    meat : action.ingredients.meat
                },
                totalPrice : 4,
                error : false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED :
            return{
                ...state,
                error: true
            };
        default:
            return state;
    }
}
export default reducer;