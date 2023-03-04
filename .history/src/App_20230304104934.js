import React,{Component, Fragment} from 'react';
import "./App.css";
import Navbar from './components/layout/Navbar';
// import UserItem from './components/users/UserItem';
import Search from './components/users/Search';
import PropTypes from 'prop-types';
import axios from 'axios'
import Users from './components/users/Users';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import About from './components/Pages/About';
import { useState } from 'react';

const App= ()=>{
  const [users,setUsers]=useState([])
  const [user,setUser]=useState({})
  const [repos,setRepos]=useState([])
  const [loading,setLoading]=useState(false)
  const [alert,setAlert]=useState(null)
  
  // static propTypes={
  //   searchUsers:PropTypes.func.isRequired,
    
  // }
  // // async componentDidMount(){
  // //   console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
  // //   // axios.get('https://api.github.com/users').then(res=>console.log(res.data));
  // //   this.setState({loading:true})
  // //   const res= await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `);
  // //   
  // //   this.setState({users:res.data,loading:false})

  // }
  // static defaultProps={
  //   title:"Github Finder",
  //   icon:'fab fa-github'
  // }
  
//Search Github Users
  const searchUsers= async (text) =>{
    setLoading(true);
    const res= await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `);
    console.log(res.data);
    setUsers  (res.data.items)
    setLoading(false)
  }

  // Get Single Github User
const getUser= async (username) =>{
  setLoading(true);
  

  
    const res= await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `);
    console.log(res.data);
    setUsers(res.data)
    setLoading(false);
  }

  //Get User Repos
 const getUserRepos= async (username) =>{
    setLoading(true);
  
    
      const res= await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET} `);
      console.log(res.data);
      setRepos(res.data)
      setLoading(false);
    }
  

  //Clear Github Users
  const clearUsers= () => {
    setUsers([])
    setLoading(false)}

  // Set Alert
  const showAlert= (msg,type) =>
  {
    setAlert({msg, type})
    setTimeout(()=>setAlert(null),5000)

  };
  


   
    
  return (
    <Router>
   
    <div className="App">
       <Navbar title="Github Finder" icon='fab fa-github'/>

       <div className='container'>
        <Alert alert={alert}/>
        
        <Switch>
          <Route exact path='/' render={props=>(
            <Fragment>
              <Search searchUsers={searchUsers} 
              clearUsers={clearUsers} 
              showClear={users.length > 0 ?true : false} setAlert={setAlert}/>
              <Users loading={loading} users={users} />

            </Fragment>

          )}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/user/:login' render={props => (
            <User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos}/>
          )}/>

        </Switch>
        
       </div>
       
    </div>
    </Router>
  );

}

export default App;
