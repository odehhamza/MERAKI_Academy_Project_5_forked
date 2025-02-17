import React from 'react'
import{useState,useEffect} from 'react'
import './Login.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { UseDispatch,useDispatch,useSelector } from 'react-redux'
import { setLogin,setUserId, setActivePrivate,setRole } from '../Redux/Reducers/Auth/index';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../assets/pngwing.com.png'
const Login = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch()

    const [email ,setEmail] = useState("")
     
    const [password,setPassword]=useState("")

    const [message, setMessage] = useState("");

    const [success, setSuccess] = useState(null)



    const login = ()=>{

          if(!email || !password){
            setMessage("Conn't Send Empty Data")
          }else{
            axios.post("http://localhost:5000/users/login", {
              email,
              password,
            }).then((result)=>{
              dispatch(setLogin(result?.data));
              dispatch(setUserId(result.data.userId));
              dispatch(setActivePrivate(result.data.private));
              setMessage("");
              localStorage.setItem("token",result.data.token);
              localStorage.setItem("userId",result.data.userId);
              localStorage.setItem("userInfo", JSON.stringify({
                  nameUser : result.data.userInfo.firstname + " "+ result.data.userInfo.lastname,
                  email : result.data.userInfo.email,
                  gender : result.data.userInfo.gender,
                  private : result.data.userInfo.private,
                  image : result.data.userInfo.image,
                  role : result.data.userInfo.role_id
                }));
              navigate('/home');
            }).catch((error)=>{
              setSuccess(false)
              setMessage(error.response.data.message);
              console.log(error);
            })
          }
        
       
        }
    

  return (
    <div className='login-Page'>
       <div className="Left-Image">
        <img className="image" src={logo} />
      </div>

      <div className="Right-Inputs">
        <div className='continer-form-login'>
        <h1 className="Title">Login</h1>
        <div className="Email">
          <Form.Label>Email:</Form.Label>
          <Form.Control onChange={(e)=>{
            setEmail(e.target.value)
          }}
            type="email"
            style={{ backgroundColor: "#1e1e1e", border: "0", color: "white" }}
          />
        </div>
        <div className="Password">
          <Form.Label>Password:</Form.Label>
          <Form.Control onChange={(e)=>{
            setPassword(e.target.value)
          }}
            type="password"
            style={{ backgroundColor: "#1e1e1e", border: "0", color: "white" }}
          />
        </div>
        <button className="button-login" onClick={()=>{
        login()
      }} >Login</button>

      <span style={{cursor:"default" , textAlign:"start"}}>
        don't have an account?  <span style={{color:"#A1E533" , cursor:"pointer", textAlign:"start34"}} onClick={()=>{
          navigate("/register")
        }}>signup</span>
        </span>
           <div  className={success?message && 'SuccessMessage' : message && "ErrorMessage"} style={{padding: "5px"}}><span style={{visibility:"hidden"}}>:</span>{message}</div>
    
        

        </div>

      </div>
      

      
     

    </div>
    





      



        

      
    
    

  )
}

export default Login
