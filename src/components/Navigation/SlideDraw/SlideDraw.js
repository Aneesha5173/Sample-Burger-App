import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SlideDraw.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const slidedraw = (props) => {
    //hide the slidedraw dynamically through the CSS classes(Open,Close)
    let attachedClass = [classes.SlideDraw, classes.Close];
    if(props.opening) {
        attachedClass = [classes.SlideDraw , classes.Open];
    }
    return(
        <Aux>
          <Backdrop show={props.opening} clicked={props.closed}></Backdrop>
          <div className={attachedClass.join(' ')}>
              {/* <Logo height="11%"></Logo>  */} {/* here we are passing the height as inline styles */}  
              <div className={classes.Logo}> {/* here we are passing same height as above in CSS */}
                  <Logo></Logo>
              </div>
              <nav>
                  <NavigationItems></NavigationItems>
              </nav>
          </div>
        </Aux>
    );
}

export default slidedraw;