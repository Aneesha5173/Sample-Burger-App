import React,{Component} from 'react';
import Model from '../../components/UI/Model/Model';
import Aux from '../Auxiliary/Auxiliary';
// import axios from '../../axios-orders';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        state = {
            error : null
        }

        // here we change the componentDidMount to componentWillMount
        // because DidMount --> will be updated after child render only (according to LifeCycle)
        //it is called before child component is render
        componentWillMount(){
           this.requestInterceptor = axios.interceptors.request.use(req =>{
               this.setState({error : null}); 
               return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res=>res,error => {
                this.setState({error : error})
            });
        }

        componentWillUnmount(){
         
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorHandler= () => {
            this.setState({error:null})
        }
        render() {
            return (
                <Aux>
                    <Model 
                        show={this.state.error}
                        modelClosed={this.errorHandler}>
                        {/* something went wrong...! */}
                        {this.state.error ? this.state.error.message : null}
                    </Model>
                    <WrappedComponent {...this.props}></WrappedComponent>
               </Aux>
            );
        }
    }
}
export default withErrorHandler; 