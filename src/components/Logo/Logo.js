import React from 'react';
import BurgerLogo from '../../assests/images/logo.jpg'; 
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height : props.height}}>
        <img src={BurgerLogo} alt="logoimage"></img>
    </div>
);
export default logo;