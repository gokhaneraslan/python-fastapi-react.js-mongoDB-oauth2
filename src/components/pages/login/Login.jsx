import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthUser from '../../auth/AuthUser'
import axios from 'axios'
import "../styles.css"

const Login = () => {
  const { setUser } = AuthUser()
  const navigate = useNavigate()
  const [postData, setPostData] = useState({ email: '', password:''});
  const [err, setErr] = useState("")

  const clear = () => {
    setPostData({ email: '', password:'' });
    setErr('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postData.email || !postData.password){
      setErr("Invalid Entry!")
      setTimeout(() => {
        setErr('')
      },1000)
      return 
    }

    const formData = new FormData()
    formData.append("username", postData.email)
    formData.append("password", postData.password)

    axios.post('http://127.0.0.1:8000/users/login',formData)
      .then((res)=>{
        if (res.data.status_code === 400){
          if (res.data.detail){
            setErr(res.data.detail)
            setTimeout(() => {
              setErr('')
            },1000)
          }
          else {
            setErr("User Not Found!")
            setTimeout(() => {
              setErr('')
            },1000)
          }
        }
        if (res.data.status_code === 404){
          setErr("Invalid Entry!")
          setTimeout(() => {
            setErr('')
          },1000)
        }
        if (res.data.status_code === 200){
          setUser(res.data.detail)
          navigate("/home", { replace: true })
        }
      })
      .catch((err) => {
        if (!err?.response) {
          setErr('No Server Response');
          setTimeout(() => {
            setErr('')
          },1000)
        } 
      })
  };



  return (
    <div>
      <h2 className='welcome'>{ err }</h2>
      <form onSubmit={handleSubmit} className="formClass">
          <h1 className='text-white'>Login</h1>
          <input placeholder="Email" name="email" type="email" step="0.0001" className="inputCard white-glassmorphism" value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
          <input placeholder="Password" name="password" type="password" step="0.0001" className="inputCard white-glassmorphism" value={postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })} />
          <div className='btn_group'>
            <button type="button" onClick={handleSubmit} className="buttonSend">Send</button>
            <button type="button" onClick={clear} className="buttonClear">Clear</button>
          </div>
          <p className='p_btn'> You don't have a account? <Link className='link_btn' to={"/register"}>Sign Up</Link></p>
      </form>
    </div>
  )
}

export default Login