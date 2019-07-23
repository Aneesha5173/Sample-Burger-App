import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';


//synchronous action creators
export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID : id, //ordered id
        orderData : orderData 
    };
};


//synchronous action creators
export const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    };
};


export const purchaseBurgerStart = () => {
    return{
        type : actionTypes.PURCHASE_BURGER_START,
    }
}


//asynchronous action creators which are dispatched from the container comes when we click 'ORDER' button
export const purchaseBurger = (orderData,token) => {
    return dispatch => {  
        //dispatch  function using the middleware thunk 
        purchaseBurgerStart();
        axios.post('/orders.json?auth=' + token, orderData) 
            .then(response => {
                // this.setState({ loading: false });
                // this.props.history.push('/'); //we are redirecting the main-page
              
                dispatch(purchaseBurgerSuccess(response.data,orderData));
            })
            .catch(error => {
                // this.setState({ loading: false });
                dispatch(purchaseBurgerFail());
            })
    };
};

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCEESS,
        orders : orders
    };
};

export const fetchOrderFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDERS_FAIL,
        error : error
    };
};


export const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START,

    };
};

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        //here we are getting the orders based on ID 
        const queryParams = '?auth=' + token + '&orderBy="USERID"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams) //here we are sending the token to see order if they are registered/authorized only
        .then(res => {
            // console.log(res.data);
            const fetchOrders=[];
            for(let key in res.data){
                fetchOrders.push({
                  ...res.data[key], //for getting
                  id:key
                });
            }
            dispatch(fetchOrderSuccess(fetchOrders));
            // this.setState({loading :false,orders:fetchOrders});
        })
        .catch(err => {
            // this.setState({loading :false});
            dispatch(fetchOrderFail(err));
        })
    };
};