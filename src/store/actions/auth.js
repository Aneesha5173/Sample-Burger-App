import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const authStart = () => {
    return {
        type : actionTypes.AUTH_START,       
    };
};

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    };
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type : actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000);
    };
};

export const authSuccess = (token,userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        // authData : authData
        idToken : token,
        userId : userId
    };
};


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload : path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token =localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expirationDate =new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }
            else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000)) //dispatching based on current time sec with expiration time sec
            }
        }
    };
};

export const auth = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        };
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBoKXpmhes19wr8vREf9Ds0qRCxkuA6pUA';
        if(!isSignUp) {
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBoKXpmhes19wr8vREf9Ds0qRCxkuA6pUA';
        }
        axios.post(url,authData)
        .then(response=> {
            //here 'expriesIn' in the responseData
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error)) //authFail(err)
        });
    }
}