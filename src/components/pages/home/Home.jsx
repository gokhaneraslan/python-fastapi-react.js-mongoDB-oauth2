import React, {useState} from 'react'
import AuthUser from "../../auth/AuthUser"
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import "../styles.css"

const Home = () => {
  const { user, logout, setUser } = AuthUser()
  const [postData, setPostData] = useState({ username: '', email: '', password:''});
  const [err, setErr] = useState("")
  const navigate = useNavigate();

  const delete_user = async () => {

    if (!user.username){
      setErr("Authentication failed. Sign in again.")
      setTimeout(() => {
        setErr('')
        navigate("/login")
      },2000)
      return 
    }

    await axios.delete(`http://127.0.0.1:8000/users/delete/${user.username}`)
    .then((res)=>{
      if (res.data.status_code === 404){
        if (res.data.detail){
          setErr(res.data.detail)
          setTimeout(() => {
            setErr('')
          },1000)
        }
        else {
          setErr("Something went wrong!")
          setTimeout(() => {
            setErr('')
          },1000)
        }
      }

      if (res.data.status_code === 200){
        if (res.data.detail){
          setErr(res.data.detail)
          logout()
          setTimeout(() => {
            navigate("/login")
          },1000)
        }
        else {
          setErr("Successfully Deleted!")
          logout()
          setTimeout(() => {
            navigate("/login")
          },1000)
        }
      }
    })
    .catch((err) => {
      if (!err?.response) {
        setErr('No Server Response');
    }})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postData.email && !postData.username && !postData.password){
      setErr("Invalid Entry")
      setTimeout(() => {
        setErr('')
      },1000)

      return 
    }

    if (!postData.email){
      postData.email = user.email
    }
    if (!postData.username){
      postData.username = user.username
    }
    if (!postData.password){
      postData.password = user.password
    }

    await axios.put(`http://127.0.0.1:8000/users/update/${user.username}`, 
      {"username": postData.username, "email": postData.email, "password": postData.password})
      .then((res)=>{
        if (res.data.status_code === 404){
          if (res.data.detail){
            setErr(res.data.detail)
            setTimeout(() => {
              setErr('')
            },4000)
            window.location.reload();
          }
          else {
            setErr("Something went wrong!")
            setTimeout(() => {
              setErr('')
            },1000)
          }
        }
        if (res.data.status_code === 200){
          if (res.data.detail){
            setUser(res.data.detail)
            setErr("Successfully updated!")
            setTimeout(() => {
              setErr('')
            },1000)
            window.location.reload();
          }
          else {
            setErr("Successfully updated!")
            setTimeout(() => {
              setErr('')
            },1000)
            window.location.reload();
          }
        }
      })
      .catch((err) => {
        if (!err?.response) {
          setErr('No Server Response');
          setTimeout(() => {
            setErr('')
          },1000)
      }})
  };


  return (
    <div>
      <h2 className='welcome'>{ err }</h2>
      <form onSubmit={handleSubmit} className="formClass">
          <h2 className='text-white'>Update {user && user.username} Details </h2>
          <input placeholder={user && user.username} name="username" type="text" step="0.0001" className="inputCard white-glassmorphism" value={postData.username} onChange={(e) => setPostData({ ...postData, username: e.target.value })}/>
          <input placeholder={user && user.email}  name="email" type="email" step="0.0001" className="inputCard white-glassmorphism" value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
          <input placeholder={user && user.password}  name="password" type="password" step="0.0001" className="inputCard white-glassmorphism" value={postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })} />
          <div className='btn_group'>
            <button type="button" onClick={handleSubmit} className="buttonSend">Update</button>
            <button type="button" onClick={delete_user} className="buttonClear">Delete</button>
          </div>
      </form>
    </div>
  )
}

export default Home