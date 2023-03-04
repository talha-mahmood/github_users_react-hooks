import React, {useState } from 'react'

import PropTypes from 'prop-types'
const Search =({searchUsers,showClear,clearUsers})=>{
    const 
    

   const onChange = e =>{
        this.setState({[e.target.name]: e.target.value});
    }

   const onSubmit=(e)=>{
      e.preventDefault();
      if(this.state.text===''){
        this.props.setAlert('please enter something','light')
      }
      else{
        this.props.searchUsers(this.state.text);
        this.setState({text:''})
      }
      

    }
     return (
      // const {showClear,clearUsers}=this.props;
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
Search.propTypes={
  searchUsers:PropTypes.func.isRequired,
  clearUsers:PropTypes.func.isRequired,
  showClear:PropTypes.bool.isRequired,
  setAlert:PropTypes.func.isRequired

}

export default Search