import React, { Component } from 'react'
import PropTypes from 'prop-types'
const Search =()=>{
    state={
        text:''
    }
    

    onChange = e =>{
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit=(e)=>{
      e.preventDefault();
      if(this.state.text===''){
        this.props.setAlert('please enter something','light')
      }
      else{
        this.props.searchUsers(this.state.text);
        this.setState({text:''})
      }
      

    }
  render() {
    
    const {showClear,clearUsers}=this.props;
    return (
      <div>
        <form  onSubmit={this.onSubmit}className='form'>
            <input type="text" name="text" placeholder='Search Users..' value={this.state.text} onChange={this.onChange}/>
            <input type="submit" className="btn btn-dark btn-block" value="Search"/>
            
        </form>
        {showClear &&  <button className='btn btn-light btn-block' onClick={
          clearUsers}>Clear</button> }
       
      </div>
    )
  }
}

export default Search