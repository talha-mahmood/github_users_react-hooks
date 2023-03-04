import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
const UserItem=({user:{login,avatar_url,html_url}})=> {
    return (
      <div className='card text-center'>
        <div>
        <img src={avatar_url} alt="" className='round-img' style={{width:'60px'}} />
        <h3>{login}</h3>
        </div>
       

        <div>
        <Link to={/user/} className='btn btn-dark btn-sm my-1'> More </Link>
        </div>
      </div>

     
      
    );
  
}
UserItem.propTypes ={
  user:PropTypes.object.isRequired

}
export default UserItem