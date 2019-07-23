import React from 'react';
import classes from './NaigationItems.css';
import NavigationItem from './NaigationItem/NaigationItem';

const navigationitems = (props) =>  (
   <ul className={classes.NaigationItems}>
       {/* <li>
           <a href="/"></a>
       </li> */}
       <NavigationItem link="/" exact>Burger Builder</NavigationItem> {/* here we are removing the active */}
       {/* <NavigationItem link="/" active>Burger Builder</NavigationItem> */}
       {/* <NavigationItem link="/">Check Out</NavigationItem> */}

       {props.isAuthenticated ?  <NavigationItem link="/ordersPage">Orders Page</NavigationItem> : null}
       {/* <NavigationItem link="/ordersPage">Orders Page</NavigationItem> */}

       {/* <NavigationItem link="/auth">Authentication</NavigationItem> */}
       { 
           !props.isAuthenticated  
           ? <NavigationItem link="/auth">Authenticate</NavigationItem>
           : <NavigationItem link="/logout">Logout</NavigationItem>
       }
   </ul>
);
export default navigationitems;