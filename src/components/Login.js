import React, { useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login(props) {
  const emailRef=useRef("");
  const passRef=useRef("");
  const navigate=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    let email=emailRef.current.value;
    let password=passRef.current.value;
    const response=await fetch("http://localhost:5000/api/auth/login",
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({email,password})
      });
      const json=await response.json();
      if(json.success)
      {
        localStorage.setItem('token',json.authToken);
        localStorage.setItem('name',json.name);
        navigate('/');
        props.showAlert("Logged In Successfully !","success")
      }
      else
      {
        props.showAlert(json.error,"danger")
      }
  }
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100 pt-5 ">
        < div className="col-md-3 border-0 shadow p-4 card">          
            <h2 className="text-center m-0 mb-3">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className='mt-3'>Username</label>
                <input type="email" className="form-control" id="username" placeholder="Type your username" ref={emailRef}/>
              </div>
              <div className="form-group">
                <label htmlFor="password" className='mt-3'>Password</label>
                <input type="password" className="form-control mb-3" id="password" placeholder="Type your password" ref={passRef}/>
              </div>
              <input type="submit" className="btn btn-primary my-3 w-100" value="Login"/>
              <div className='text-center'>
                Don't have an account ? <Link to="/SignUp">Create</Link>
              </div>
            </form>
        </div>
  </div>
    </>
  )
}
