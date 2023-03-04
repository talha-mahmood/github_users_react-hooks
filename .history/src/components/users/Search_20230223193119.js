import React, {useState } from 'react'

import PropTypes from 'prop-types'
const Search =({searchUsers,showClear,clearUsers, setAlert})=>{
    const [text, setText]=useState("")
    

   const onChange = e =>{
        setText(e.target.value);
    }

   const onSubmit=(e)=>{
      e.preventDefault();
      if(text===''){
        setAlert('please enter something','light')
      }
      else{
        this.props.searchUsers(this.state.text);
        this.setState({text:''})
      }
      

    }
     return (
      // const {showClear,clearUsers}=this.props;
      <div>
        <form  onSubmit={onSubmit}className='form'>
            <input type="text" name="text" placeholder='Search Users..' value={text} onChange={onChange}/>
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