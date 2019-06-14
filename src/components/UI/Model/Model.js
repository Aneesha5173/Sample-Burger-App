import React,{Component} from 'react';
import classes from './Model.css';
import BackDrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class Model extends Component{
   shouldComponentUpdate(nextProps,nextState){
      return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
   }
   componentWillUpdate(){
      console.log("[Model.js] WillUpdated")
   }
   render() {
     return(
      <Aux>
        <BackDrop show={this.props.show} clicked={this.props.modelClosed}></BackDrop>
        <div 
           style = {{
                   transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                   opacity : this.props.show ? '1' : '0'
                }}
           className={classes.Model}>
           {this.props.children}
         </div>
      </Aux>
   );
  }
}

export default Model;

// const model = (props) => (
//    <Aux>
//      <BackDrop show={props.show} clicked={props.modelClosed}></BackDrop>
//      <div 
//         style = {{
//                   transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                opacity : props.show ? '1' : '0'
//                }}
//         className={classes.Model}>
//         {props.children}
//      </div>
//    </Aux>
// );
