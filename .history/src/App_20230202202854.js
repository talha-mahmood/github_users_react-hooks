import React,{Component, Fragment} from 'react';
import "./App.css";
import Navbar from './components/layout/Navbar';
// import UserItem from './components/users/UserItem';
import Search from './components/users/Search';
import PropTypes from 'prop-types';
import axios from 'axios'
import Users from './components/users/Users';
import Alert from './components/layout/Alert';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import About from './components/Pages/About';

class App extends Component{
  state={
    users:[],
    loading:false,
    alert:null
  }
  static propTypes={
    searchUsers:PropTypes.func.isRequired,
    
  }
  // // async componentDidMount(){
  // //   console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
  // //   // axios.get('https://api.github.com/users').then(res=>console.log(res.data));
  // //   this.setState({loading:true})
  // //   const res= await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `);
  // //   
  // //   this.setState({users:res.data,loading:false})

  // }
  static defaultProps={
    title:"Github Finder",
    icon:'fab fa-github'
  }
  
//Search Github Users
  searchUsers= async (text) =>{
    this.setState({loading:true});
    const res= await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `);
    console.log(res.data);
    this.setState({users:res.data.items,loading:false});
  }

  // Get Single Github User
getUser=async(username) =>{
  this.setState({loading:true});
  searchUsers= async (text) =>
  {
    const res= await axios.get(`https://api.github.com/search/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `);
    console.log(res.data);
    this.setState({users:res.data.items,loading:false});
  }

  //Clear Github Users
  clearUsers= () => this.setState({users:[], loading:false})

  // Set Alert
  setAlert= (msg,type) =>
  {
    this.setState({alert:{msg:msg, type:type}});
    setTimeout  (() => this.setState({alert:null}),5000);

  }
  


  render() { 
    const {users, loading}=this.state;
  return (
    <Router>
   
    <div className="App">
       <Navbar title="Github Finder" icon='fab fa-github'/>

       <div className='container'>
        <Alert alert={this.state.alert}/>
        
        <Switch>
          <Route exact path='/' render={props=>(
            <Fragment>
              <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ?true : false} setAlert={this.setAlert}/>
              <Users loading={loading} users={users} />

            </Fragment>

          )}/>
          <Route exact path='/about' component={About}/>
        </Switch>
        
       </div>
       
    </div>
    </Router>
  );
}
}
}
export default App;
