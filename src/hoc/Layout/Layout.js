import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SlideDraw from '../../components/Navigation/SlideDraw/SlideDraw';

class Layout extends Component {
   state={
         showSlideDraw : false
        //  here we change that true to false
   }
   
  //  closing the slidedraw in small screen
   slidedrawClosedHandler = () => {
      this.setState({showSlideDraw : false});
   }

  //  to show the slidedraw in small screen
   slideDrawToggleHandler = () => {
     this.setState((prevState) => {
         return {showSlideDraw : !prevState.showSlideDraw}; 
     });
   }
   render(){
      return(
        <Aux>
          {/* <div>ToolBar,SlideDrawer,BackDrop</div> */}
          <ToolBar 
              drawerToggleHandler={this.slideDrawToggleHandler}>
          </ToolBar>
          <SlideDraw 
              opening={this.state.showSlideDraw} 
              closed={this.slidedrawClosedHandler}>
          </SlideDraw>
          <main className={classes.Content}>{this.props.children} </main>  
        </Aux>
      ); 
   }
}

export default Layout;

// const layout = (props) => (
//    <Aux>
//       {/* <div>ToolBar,SlideDrawer,BackDrop</div> */}
//       <ToolBar></ToolBar>
//       <SlideDraw></SlideDraw>
//       <main className={classes.Content}>
//          {props.children}
//       </main>
//    </Aux>
// );