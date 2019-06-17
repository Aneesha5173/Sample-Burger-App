import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import 'bootstrap/dist/css/bootstrap.css';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import OrdersPage from './containers/OrdersPage/OrdersPage';
import Auth from './containers/Auth/Auth';


class App extends Component {
  state = { 
    // show:true
   }
  //  componentDidMount(){
  //    setTimeout(()=>{
  //      this.setState({show:false});
  //    },5000);
  //  }
  render() { 
    return (
      <div>
        <Layout> 
          {/* {this.state.show ? <BurgerBuilder/> :null} 
          <BurgerBuilder></BurgerBuilder>
           <Checkout></Checkout>  */}
           <Switch>
                 <Route path="/checkout" component={Checkout}></Route>
                 <Route path="/ordersPage" component={OrdersPage}></Route>
                 <Route path="/auth" component={Auth}></Route>
                  {/* use these order only  */}
                  <Route path="/" component={BurgerBuilder}></Route>
           </Switch>
        </Layout>                 
      </div>
    );
  }
}
 
export default App;



