import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Sipnner';
import * as actionTypes from '../../store/actions/index';
import {Redirect} from 'react-router-dom'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp : true
    }
    // componentDidMount (){
    //     if(!this.props.buildingReducer && this.props.authRedirectPath !== '/'){
    //         this.props.onSetRedirectAuthPath();
    //     }
    // }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    switchAuthModeHandler = ()=>{
        this.setState(prevState => {
            return {
                isSignUp : !prevState.isSignUp,
            };
        })
    }
    render() {
        const formElementsArray = [];
        //here key are getting data as name:,zipCode: etc
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key] //it will get data off name: right-hand side value as with {} braces data
            });
        }
        let form = formElementsArray.map(formEle => (
            <Input
                key={formEle.id}
                elementType={formEle.config.elementType}
                elementConfig={formEle.config.elementConfig}
                invalid={!formEle.config.valid} //checking for input tag is valiadtion starting red (i.e., warning)
                shouldValid={formEle.config.validation} //checking for each element which have validation:true(i.e., for dropdown)
                change={(event) => this.inputChangeHandler(event, formEle.id)}
                touch={formEle.config.touched}
                value={formEle.config.value}>
            </Input>
        ));
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMsg=null;
        if(this.props.error){
            errorMsg = (
                <p style={{color :'red',fontWeight:'bold',fontStyle:'oblique'}}>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticate){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    <h4>{this.state.isSignUp ? 'Registration':'Login'}</h4>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to { this.state.isSignUp ? 'Already a Member' : 'Create a New Account'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loading : state.authReducer.loading,
        error : state.authReducer.error,
        isAuthenticate : state.authReducer.token !== null,
        buildingReducer : state.burgerReducer.building,
        authRedirectPath : state.authReducer.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(actionTypes.auth(email,password,isSignUp)),
        // onSetRedirectAuthPath : () => dispatch(actionTypes.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
// export default Auth;