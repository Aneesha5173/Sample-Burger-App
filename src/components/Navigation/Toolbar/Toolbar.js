import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToogle from '../SlideDraw/DrawToggle/DrawToggle';


const toolbar =(props)=>(
    <header className={classes.Toolbar}>
        {/* <div>LOGO</div> */}
        {/* <Logo height="80%"></Logo> */} {/* here we are passing the height as inline-style */}
        {/* <div>Menu</div> */}
        <DrawToogle clicked={props.drawerToggleHandler}></DrawToogle>
        <div className={classes.Logo}> {/* here we are passing same height as above in CSS */}
            <Logo></Logo>
        </div>
        {/* <div>Naigation Items</div> */}
        <nav className={classes.DesktopOnly}>
           <NavigationItems isAuthenticated= {props.isAuth}></NavigationItems>           
        </nav>
    </header>
);

export default toolbar;