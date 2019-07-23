import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'; 
import * as actionTypes from '../../store/actions/index'; 
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Sipnner';

class OrdersPage extends Component {
    // state = { 
    //     orders : [],
    //     loading : true
    //  }
    componentDidMount(){
        // axios.get('/orders.json')
        //     .then(res => {
        //         // console.log(res.data);
        //         const fetchOrders=[];
        //         for(let key in res.data){
        //             fetchOrders.push({
        //               ...res.data[key], //for getting
        //               id:key
        //             });
        //         }
        //         this.setState({
        //             loading :false,
        //             orders:fetchOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading :false});
        //     })
        this.props.onLoadOrders(this.props.token,this.props.userId);

    }
    render() { 
        let orders=<Spinner/> ;
        if(!this.props.loading){ //if(this.props.loading  === false)
            //because initially loading --> false so we need to 
            orders =  this.props.orders.map(o => (
                        <Order 
                            key={o.id}
                            ingredients={o.ingredientsOrder}
                            totalPrice={+o.totalPriceOrder}> 
                             {/* if we use '+' for two decimal places only */}
                        </Order>
            ))
        }
        return ( 
            <div>
                {/* <Order></Order>
                <Order></Order> */}
                {/* {this.props.orders.map(o => (
                    <Order 
                        key={o.id}
                        ingredients={o.ingredientsOrder}
                        totalPrice={+o.totalPriceOrder}></Order>
                        // if we use '+' for two decimal places only
                ))} */}
                {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders : state.orderReducer.orders,
        loading : state.orderReducer.loading,
        token : state.authReducer.token,
        userId : state.authReducer.userId
    }
}
 
const mapDispatchToProps = dispatch => {
    return {
        onLoadOrders : (token,userId) => dispatch(actionTypes.fetchOrders(token,userId))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(OrdersPage,axios));