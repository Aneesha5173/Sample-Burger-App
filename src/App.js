import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import 'bootstrap/dist/css/bootstrap.css';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import OrdersPage from './containers/OrdersPage/OrdersPage';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actionTypes from './store/actions/index';

class App extends Component {
  state = { 
    // show:true
   }
  //  componentDidMount(){
  //    setTimeout(()=>{
  //      this.setState({show:false});
  //    },5000);
  //  }

 componentDidMount(){
   this.props.onTryAuth();
 }

  render() { 
    let routes = (
      //in case unauthorized users
      <Switch>
         <Route path="/auth" component={Auth}></Route>
         <Route path="/" component={BurgerBuilder}></Route>  
         <Redirect to="/"></Redirect>
      </Switch>
    )
    
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          {/* for authenticated users */}
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/ordersPage" component={OrdersPage}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" component={BurgerBuilder} exact></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      )
    }
    return (
      <div>
        <Layout> 
          {/* {this.state.show ? <BurgerBuilder/> :null} 
          <BurgerBuilder></BurgerBuilder>
           <Checkout></Checkout>  */}
           {/* <Switch>
                 <Route path="/checkout" component={Checkout}></Route>
                 <Route path="/ordersPage" component={OrdersPage}></Route>
                 <Route path="/auth" component={Auth}></Route>
                 <Route path="/logout" component={Logout}></Route>
                  use these order only 
                  <Route path="/" component={BurgerBuilder}></Route>
           </Switch> */}
           {routes}
        </Layout>                 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.authReducer.token !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAuth : ()=> dispatch(actionTypes.authCheckState())
  }
}
 
// export default App;
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));



