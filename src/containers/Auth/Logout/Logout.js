import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionTypes from '../../../store/actions/index';

class Logout extends Component {
    state = {  }
    //when ever component will mount
    componentDidMount(){
        this.props.onLogout();
    }
    render() { 
        return ( 
            <div>
                <Redirect to="/"></Redirect>
            </div>
         );
    }
}
 
const  mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actionTypes.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);
//export default Logout;