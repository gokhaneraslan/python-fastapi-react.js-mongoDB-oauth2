import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../styles.css"

const Register = () => {
  const [postData, setPostData] = useState({ username: '', email: '', password:''});
  const [err, setErr] = useState("")
  const navigate = useNavigate()

  const clear = () => {
    setPostData({ username: '', email: '', password:'' });
    setErr('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postData.email || !postData.username || !postData.password){
      setErr("Invalid Entry")
      setTimeout(() => {
        setErr('')
      },1000)
      return 
    }
    await axios.post("http://127.0.0.1:8000/users", 
      {"username": postData.username, "email": postData.email, "password": postData.password})
      .then((res)=>{
        navigate("/login")
      })
      .catch((err) => {
        if (!err?.response) {
          setErr('No Server Response');
          setTimeout(() => {
            setErr('')
          },1000)
      } else {
          setErr('Something went wrong')
          setTimeout(() => {
            setErr('')
          },1000)
      }})
  };



  return (
    <div>
      <h2 className='welcome'>{ err }</h2>
      <form onSubmit={handleSubmit} className="formClass">
          <h1 className='text-white'>Register</h1>
          <input placeholder="Username" name="username" type="text" step="0.0001" className="inputCard white-glassmorphism" value={postData.username} onChange={(e) => setPostData({ ...postData, username: e.target.value })}/>
          <input placeholder="Email" name="email" type="email" step="0.0001" className="inputCard white-glassmorphism" value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
          <input placeholder="Password" name="password" type="password" step="0.0001" className="inputCard white-glassmorphism" value={postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })} />
          <div className='btn_group'>
            <button type="button" onClick={handleSubmit} className="buttonSend">Send</button>
            <button type="button" onClick={clear} className="buttonClear">Clear</button>
          </div>
          <p className='p_btn'> Already have a account? <Link className='link_btn' to={"/login"}>Sign In</Link></p>
      </form>
    </div>
  )
}

export default Register