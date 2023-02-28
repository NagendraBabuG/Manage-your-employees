import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../form-input/form-input-component';
import Button from '../button/button-component';
import { UserContext } from '../../contexts/userContext';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase';
import './signup.scss'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { cos } from 'mathjs';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//toast.configure()


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const navigate = useNavigate()
  // const [user, setCurrentUser] = useState()
  const { displayName, email, password, confirmPassword } = formFields;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["nbk"]);
  //const [isLoggedIn, setisLoggedIn] = useState(false);
  const notify = () =>{
    toast.success("Signup done Successfully.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });}
  const notifyFailed = ()=> {
    toast.error("Signup Failed", {
      position:toast.POSITION.TOP_RIGHT,
      autoClose:3000
    })
  }
  // useEffect(() => {
  //   if(currentUser) navigate("/signin")
  //   else navigate("/signup")
  // }, [currentUser])
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      let user = undefined;
      const data = {
        "name": displayName,
        "email": email,
        "password": password
      };
      axios.post('http://localhost:5000/createAdmin', data).then((res) => {
        console.log(res)
        if(res.status != 400) {
          user = res.data.data
          console.log(user, ' user')
          setCurrentUser(res.data.data)
          
        //  navigate("/signin")
          // setCookie("nbk", currentUser.uid, { path: "/" });
          notify()
          
        }
      } ).catch((error) => {
        console.log(error)
        notifyFailed()
      })
      
      
      // const config = {
        //   method: 'post',
        //   maxBodyLength: Infinity,
        //   url: 'http://localhost:5000/createAdmin',
        //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   data: data
          // };
          
          
          // axios(config)
          //   .then(function (response) {
            //     console.log(response.data);
            //     user = response.data
            //     setCurrentUser(response.data)
            //     setCookie("nbk", currentUser.uid, { path: "/" });
            //   })
            //   .catch(function (error) {
              //     console.log(error);
              //   });
              
              // await user.updateProfile({ displayName: displayName });
              
              
              
              
              resetFormFields();
      
      // navigate('/dashboard')
    } catch (error) {
      notifyFailed()
      if (error.code === 'auth/email-already-in-use') {
        console.log('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='wrapper'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>

        <div className='input-box'>
          <input type='text' label='Display Name' required name='displayName' value={displayName} onChange={handleChange} placeholder='Display Name' />
        </div>
        <div className='input-box'>
          <input type='email' label='Email' required name='email' value={email} onChange={handleChange} placeholder='Email' />
        </div>
        <div className='input-box'>
          <input type='password' label='Password' required name='password' value={password} onChange={handleChange} placeholder='Password' />
        </div>
        <div className='input-box'>
          <input type='password' label='Confirm Password' required name='confirmPassword' value={confirmPassword} onChange={handleChange} placeholder='Confirm Password' />
        </div>





        <div class="input-box button">
          <button type='submit'>SignUp</button>
        </div>
        <div class="text">
          <h3>Already have an account?
            <Link to='/signin'>
              <div> Login-now </div>
            </Link>
          </h3>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default SignUpForm;