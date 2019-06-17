import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import {connect} from 'react-redux';
// import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Sipnner';
import Input from '../../../components/UI/Input/Input';
import * as action from '../../../store/actions/index';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';

class ContactData extends Component {
    state = {
        // name: '',
        // email: '',
        // phone: '',
        // address: {
        //     street: '',
        //     pincode: '',
        //     city: ''
        // },
        orderForm: {
            // customer: {
            name: {
                elementType: 'input',  //according to HTML tag
                elementConfig: {       //according to HTML input tag properties
                    type: 'text',     //input tag properties
                    placeholder: 'Enter Name'
                },
                value: '',     //for storing data of input tag
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            }, //'Sai'
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Phone'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },// '2456789564',
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Email'
                },
                value: '',
                validation:{
                    required:true,
                    isEmail : true                  
                },
                valid:false,
                touched:false
            },//'sample@gmail.com',
            // },
            // address: {
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter ZIP CODE'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5,
                    isNumeric: true
                },
                valid:false,
                touched:false
            },// '523187',
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Street Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },// 'mainBazar',
            // State: 'A.P',
            // country: 'India',
            // },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter City Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },//'Vetapalem',
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value : 'select',displayValue: 'Select'},
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',
                validation:{},
                valid:true
            }//'fastest'
        },
        formValid:false,
        // loading: false
    }
    orderHandler = (event) => {
        event.preventDefault(); //for getting the events and stop reloading
        // console.log(this.props.ingredient);
        // here we are using db to store temp.order details 
        // this.setState({ loading: true });
        // console.log('jjjj' + this.props)
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredientsOrder: this.props.ings ,//this.props.ingredient
            totalPriceOrder: this.props.price,
            orderData : formData
            // customer: {
            //     name: 'Sai',
            //     address: {
            //         city: 'Vetapalem',
            //         zipCode: '523187',
            //         State: 'A.P',
            //         country: 'India'
            //     },
            //     email: 'sample@gmail.com'
            // },
            // deliveryMethod: 'fastest'
        }
        this.props.onBurgerStart(order);
        console.log(order);
        // // here we are using POST method to post our data to DB which was created in Google Firebase
        // // with the help of axios.
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false });
        //         this.props.history.push('/'); //we are redirecting the main-page
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false });
        //     })
    }
    //Input change Handler
    inputChangeHandler=(event,inputIdentifier)=>{
        // console.log(event.target.value);//to see what we typed into input
        const updatedOrderForm={
            ...this.state.orderForm
        };
        const updatedFormElement={
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedFormElement;

        let formIsValid=true; //false
        for(let inputIdentity in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentity].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formValid:formIsValid});
    }
    checkValidity(value,rules){
        let isValid=true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length <= rules.maxLength && isValid;
        }
        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid =pattern.test(value) && isValid
        }
        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }    
        return isValid;
    }
    render() {
        const formElementsArray = [];
        //here key are getting data as name:,zipCode: etc
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key] //it will get data off name: right-hand side value as with {} braces data
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <label>Name : </label> <br />
                <input type="text" name="userName" placeholder="Enter Name"></input><br />
                <label>Phone Number : </label><br />
                <input type="text" name="userPhone" placeholder="Enter Phone Number"></input><br />
                <label>Email ID : </label><br />
                <input type="text" name="userEmail" placeholder="Enter Email"></input><br />
                <label>PIN CODE : </label><br />
                <input type="text" name="userPinCode" placeholder="Enter Pin Code"></input><br />
                <label>Street Name : </label><br />
                <input type="text" name="userStreet" placeholder="Enter Street Name"></input><br />
                <label>City Name : </label> <br />
                <input type="text" name="userCity" placeholder="Enter City"></input><br /> */}
                {/* <Input inputtype="input" type="text" name="Name" placeholder="Enter Name"></Input>
                <Input inputtype="input" type="text" name="Email" placeholder="Enter Email"></Input>
                <Input inputtype="input" type="text" name="Phone" placeholder="Enter Phone"></Input>
                <Input inputtype="input" type="text" name="PINCODE" placeholder="Enter PIN CODE"></Input>
                <Input inputtype="input" type="text" name="Street Name" placeholder="Enter  Street Name"></Input>
                <Input inputtype="input" type="text" name="City Name" placeholder="Enter City Name"></Input> */}
                {/* <Input elementType="..." elementConfig="..." value="..."></Input> */}
                {formElementsArray.map(ele => (
                    <Input
                        key={ele.id}
                        elementType={ele.config.elementType}
                        elementConfig={ele.config.elementConfig}
                        invalid={!ele.config.valid} //checking for input tag is valiadtion starting red (i.e., warning)
                        shouldValid={ele.config.validation} //checking for each element which have validation:true(i.e., for dropdown)
                        change={(event)=>this.inputChangeHandler(event,ele.id)}
                        touch={ele.config.touched}
                        value={ele.config.value}>
                    </Input>
                ))}
                <Button
                    btnType="Success" disable={!this.state.formValid}
                    
                    // clicked={this.orderHandler}
                    >Order</Button>
            </form>
        );
        // if loading is TRUE then 'form' will be spinner
        if (this.props.loading) { //this.state.loading
            form = <Spinner></Spinner>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Conatct Details</h4>
                {/* <form>
                      <label>Name : </label> <br/>
                      <input type="text" name="userName" placeholder="Enter Name"></input><br/>
                      <label>Phone Number : </label><br/>
                      <input type="text" name="userPhone" placeholder="Enter Phone Number"></input><br/>
                      <label>Email ID : </label><br/>
                      <input type="text" name="userEmail" placeholder="Enter Email"></input><br/>
                      <label>PIN CODE : </label><br/>
                      <input type="text" name="userPinCode" placeholder="Enter Pin Code"></input><br/>
                      <label>Street Name : </label><br/>
                      <input type="text" name="userStreet" placeholder="Enter Street Name"></input><br/>
                      <label>City Name : </label> <br/>
                      <input type="text" name="userCity" placeholder="Enter City"></input><br/>
                      <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form> */}
                {form}
            </div>
        );
    }
} 

const mapStateToProps = state => {
    return {
        ings : state.burgerReducer.ingredients, //state.burgerReducer.ingredients,
        price : state.burgerReducer.totalPrice, //state.burgerReducer.totalPrice,
        loading :state.orderReducer.loading //state.orderReducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {      
        onBurgerStart : (orderData) => dispatch(action.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
// export default connect(mapStateToProps)(ContactData);
// export default ContactData;