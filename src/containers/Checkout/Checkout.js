import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// import { URLSearchParams } from 'url';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
// import * as actionTypes from '../../store/actions/order';
import ContactData from '../Checkout/ContactData/ContactData';
class Checkout extends Component {
    // state = { 
    //     ingredients :null,
    //     totalPrice:0       
    //  }
    //  componentWillMount()  {
    //      const query=new URLSearchParams(this.props.location.search);
    //      const ingredient={};
    //      let totalPriceOrder=0;
    //      for(let param of query.entries()){
    //          //['salad','1']-->entry format
    //         if(param[0]==='totalPriceOrder'){
    //             totalPriceOrder = param[1];
    //         }
    //         else{
    //             ingredient[param[0]] = +param[1];
    //         }
    //         // ingredient[param[0]] = +param[1];
    //      }
    //      this.setState({
    //          ingredients:ingredient,
    //          totalPrice:totalPriceOrder});
    //  }

    //  componentWillMount(){
    //     this.props.onInitPurchase(); //if we write here after first submittion it will not got to contact page
    //  }

    //for going back in checkout page
     checkoutCancelHandler = () => {
        this.props.history.goBack();
     }
    //  continue checkout
     checkoutContinueHandler =()=>{
        this.props.history.replace('/checkout/contact-data');
     }
    render() { 
        let summary = <Redirect to="/"></Redirect>
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"></Redirect>  :null
            summary= (
                <div>
                    {purchasedRedirect }
                 <CheckoutSummary 
                    ingredient={this.props.ings} //this.state.ingredients
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutSuccess={this.checkoutContinueHandler}>
                 </CheckoutSummary>
                 <Route 
                     path={this.props.match.path + '/contact-data'} 
                    component={ContactData}>
                     {/* render={(props) => (<ContactData ingredient={this.state.ingredients} price={this.state.totalPrice}{...props}/>)} */}
                     {/* we use 'props(2-times) then only in 'history' works in ContactData (one-way) */}
                </Route>
             </div>
            );
        }
        return summary;
        //  return ( 
        //      <div>
                
        //          <CheckoutSummary 
        //             ingredient={this.props.ings} //this.state.ingredients
        //             checkoutCancel={this.checkoutCancelHandler}
        //             checkoutSuccess={this.checkoutContinueHandler}>
        //         </CheckoutSummary> 
        //           <Route 
        //             path={this.props.match.path + '/contact-data'} 
        //             component={ContactData} 
        //              render={(props) => (<ContactData ingredient={this.state.ingredients} price={this.state.totalPrice}{...props}/>)} */}
        //               > 
        //              we use 'props(2-times) then only in 'history' works in ContactData (one-way) */
        //         </Route> 
        //     </div> 
        //  );
    }
}

const mapStateToProps = state => {
    return{
        ings : state.burgerReducer.ingredients,
        purchased : state.orderReducer.purchased
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase : () => dispatch(actionTypes.purchaseInit())
//     }
// }

// export default Checkout;
export default connect(mapStateToProps)(Checkout)