import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationitem = (props) => (
    <li className={classes.NavigationItem}>
        {/* <a 
           href={props.link} 
           className={props.active ? classes.active : null}>{props.children}</a> */}
        <NavLink  
            to={props.link}
            exact={props.exact}  //it is add to stop hightlight both menus
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationitem;