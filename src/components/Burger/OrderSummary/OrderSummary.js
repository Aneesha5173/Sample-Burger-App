import React,{Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

    componentWillUpdate(){
        console.log("[OrderSummary.js] WillUpdate");
    }
    render() {
     const ingredientSummary = Object.keys(this.props.ingredient)
        .map(ingredientKey => {
            return (
              <li key={ingredientKey}>
                  <span style={{textTransform: 'capitalize'}}>{ingredientKey} : {this.props.ingredient[ingredientKey]}</span>                 
              </li>
            );
    }); 
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following Ingredients :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : $ {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to CheckOut ?</p>
            {/* <button>Continue</button>
            <button>Cancel</button> */}
            <Button btnType="Danger" clicked={this.props.canceling}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.continuing}>Continue</Button>
        </Aux>
    ); 
  }
};

export default OrderSummary;

// const orderSummary = (props) => {
//     const ingredientSummary = Object.keys(props.ingredient)
//         .map(ingredientKey => {
//             return (
//               <li key={ingredientKey}>
//                   <span style={{textTransform: 'capitalize'}}>{ingredientKey} : {props.ingredient[ingredientKey]}</span>                 
//               </li>
//             );
//     }); 
//     return(
//         <Aux>
//             <h3>Your Order</h3>
//             <p>A delicious Burger with the following Ingredients :</p>
//             <ul>
//                 {ingredientSummary}
//             </ul>
//             <p><strong>Total Price : $ {props.price.toFixed(2)}</strong></p>
//             <p>Continue to CheckOut ?</p>
//             {/* <button>Continue</button>
//             <button>Cancel</button> */}
//             <Button btnType="Danger" clicked={props.canceling}>Cancel</Button>
//             <Button btnType="Success" clicked={props.continuing}>Continue</Button>
//         </Aux>
//     ); 
// };
