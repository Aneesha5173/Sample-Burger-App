import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary  from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Sipnner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as burgerActions from '../../store/actions/index';

// const INGREDIENT_PRICES = {
//     salad : 0.5,
//     meat : 1.3,
//     cheese : 0.4,
//     bacon : 0.7
// }

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    // }
    state = { 
        // ingredients : {
        //     salad : 0,
        //     bacon : 0,
        //     cheese : 0,
        //     meat : 0,
        // },
        // ingredients : null,
        // totalPrice : 4,
        // purchaseable : false,
        purchasing : false,
        // loading: false,
        // error : false
    }

      //fetch the data
      componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients();
        // here we are getting the ingredients dynamically from backend by sending the request
        // axios.get("https://burger-app-7bd4e.firebaseio.com/ingredients.json") //it sends the request
        // .then(response => {
        //         this.setState({ ingredients: response.data}) 
        // })
        // .catch(error => { 
        //     this.setState({error:true})
        // })
         //here we are passing the ingredients when ever the component did mount
    }

    //these for adding the purchase items for Order Button
    updatePurchase(ingredients){
        // const Ingredient ={
        //     ...this.state.ingedients
        // };
        const sumUp = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum,ele) => {
                return sum+ele;
            },0);
            // this.setState({purchaseable : sumUp > 0})
            return sumUp >0 
    }

  
    
 
    //adding Ingredients
    // addIngredientHandler =(type)=>{
    //     const oldCount= this.state.ingredients[type];
    //     const updateCount=oldCount+1;
    //     const updateIngredients ={
    //         ...this.state.ingredients
    //     };
    //     updateIngredients[type] = updateCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice : newPrice , ingredients: updateIngredients});
    //     this.updatePurchase(updateIngredients);
    // }

    //remoing ingredients
    // removeIngredientHandler = (type) => {
    //     const oldCount= this.state.ingredients[type];
    //     if(oldCount <= 0 ){ //for stoping the clicking
    //         return ;
    //     }
    //     const updateCount=oldCount-1;
    //     const updateIngredients ={
    //         ...this.state.ingredients
    //     };
    //     updateIngredients[type] = updateCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice : newPrice , ingredients: updateIngredients});
    //     this.updatePurchase(updateIngredients);
    // }
    
    //for hiding the model
    purchaseHandler = () =>{ 
        this.setState({purchasing: true});
    }

    //removing the purchase(i.e., if you click backgroung then purchase is disappear)
    removePurchaseHandler = () => {
        this.setState({purchasing : false});
    }
    
    //canceling purchase 
    cancelHandler =() =>{
        this.setState({purchasing: false});
    }

    //continue purchase
    continueHandler = () => {
        // alert("You can Continue");
        // here we are using db to store temp.order details 
        // this.setState({loading:true});
        // const order= {
        //     ingredientsOrder : this.state.ingredients,
        //     totalPriceOrder : this.state.totalPrice,
        //     customer : {
        //         name : 'Sai',
        //         address : {
        //             city : 'Vetapalem',
        //             zipCode : '523187',
        //             State : 'A.P',
        //             country : 'India'
        //         },
        //         email : 'sample@gmail.com'
        //     },
        //     deliveryMethod : 'fastest'
        // }
        // here we are using POST method to post our data to DB which was created in Google Firebase
        // with the help of axios.
        // axios.post('/orders.json',order)
        //   .then(response => console.log(response))
        //   .catch(error => console.log(error));
    //           .then(response => 
    //                   this.setState({loading: false, purchasing:false}))
    //           .catch(error => {
    //                   this.setState({loading : false, purchasing:false});
    //     })
        // const queryParams=[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        //     // encodeURIComponent encodes my elements such thatthey can be used in the URL,this is relevant for whitespace also            
        // }
        // queryParams.push('totalPriceOrder=' + this.props.price); // for passing the price to contactData
        // const queryString =queryParams.join('&'); //for joing the query_parameters
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search : '?' + queryString
        // });
        this.props.onInitPurchase(); //if we place it here it will redirect when were we want go the process in flow
        this.props.history.push('/checkout');
    }

    render() { 
        //for each ingredient is disabling for at zero condition because after these 'Less' btn is enable only
        const disableInfo = { 
            // ...this.state.ingredients
            ...this.props.ings
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0; //{salad : true/false ,meat:false/true,...}
            //above condition checks that the each ingedient is true/false.
        }
        
        // let orderSummary =  <OrderSummary 
        //                           ingredient={this.state.ingredients}
        //                           price={this.state.totalPrice}
        //                           canceling={this.cancelHandler}
        //                           continuing={this.continueHandler}></OrderSummary> 
        // here we adding the spinner for these we add a state as loading : false
        // if it true then we need to show the Spinner
       
        // if(this.state.loading){
        //     orderSummary = <Spinner></Spinner>;
        // }

        let orderSummary = null;
        let burger=this.props.error  ? <p>Ingredients can't be loaded</p> :<Spinner />; //this.state.error
        if(this.props.ings){ //this.state.ingredients
            burger = (
                     <Aux>
                         <Burger ingredient={this.props.ings}></Burger> {/* this.state.ingredients */}
                         <BuildControls 
                              ingredientAdded = {this.props.onIngredientAdded} //this.addIngredientHandler
                              ingredientDeleted = {this.props.onIngredientRemoved} //this.removeIngredientHandler
                              btndisable={disableInfo}
                              btnpurchase={this.updatePurchase(this.props.ings)} //this.state.purchaseable
                              ordered={this.purchaseHandler}
                              totalPrice={this.props.price}>
                         </BuildControls>
                     </Aux>     
            );
           orderSummary= <OrderSummary 
                               ingredient={this.props.ings} //this.state.ingredients
                               price={this.props.price}
                               canceling={this.cancelHandler}
                               continuing={this.continueHandler}>      
                         </OrderSummary>   
        //    if(this.state.loading){
        //          orderSummary = <Spinner />;
        //    }   
        }
        return ( 
          <Aux>
              {/* <div>Build Controls</div> */}
              {/* <Burger ingredient={this.state.ingredients}></Burger>
              <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientDeleted = {this.removeIngredientHandler}
                btndisable={disableInfo}
                btnpurchase={this.state.purchaseable}
                ordered={this.purchaseHandler}
                totalPrice={this.state.totalPrice}>
              </BuildControls> */}
              
              <Model show={this.state.purchasing} modelClosed={this.removePurchaseHandler}>
                  {/* <OrderSummary 
                     ingredient={this.state.ingredients}
                     price={this.state.totalPrice}
                     canceling={this.cancelHandler}
                     continuing={this.continueHandler}></OrderSummary> */}
                {orderSummary}
              </Model>
              {burger}
          </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings :state.burgerReducer.ingredients, //state.burgerReducer.ingredients,//state.ingredients,
        price : state.burgerReducer.totalPrice,//state.burgerReducer.totalPrice,
        error : state.burgerReducer.error//state.burgerReducer.error//state.error
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded : (ingName) => dispatch(burgerActions.addIngredient(ingName)), //{type : actionTypes.ADD_INGREDIENTS,ingredientName:ingName}
        onIngredientRemoved : (ingName) => dispatch(burgerActions.removeIngredient(ingName)), //{type : actionTypes.REMOVE_INGREDIENTS,ingredientName:ingName}
        onInitIngredients : () => dispatch(burgerActions.initIngredients()),
        onInitPurchase : () => dispatch(burgerActions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
// export default withErrorHandler(BurgerBuilder,axios);
// export default BurgerBuilder;
