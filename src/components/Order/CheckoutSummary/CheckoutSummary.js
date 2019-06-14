import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSumarry.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it Taste Well</h1>
            <div style={{
                    width:'100%',
                    // height:'300px',
                    margin:'auto' }}>
                <Burger ingredient={props.ingredient}></Burger>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutSuccess} >Continue</Button>
        </div>
    );
}

export default checkoutSummary;