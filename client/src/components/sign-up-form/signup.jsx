import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../form-input/form-input-component';
import Button from '../button/button-component';
import { UserContext } from '../../contexts/userContext';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase';
import './signup.scss'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const navigate = useNavigate()
  const { displayName, email, password, confirmPassword } = formFields;
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["nbk"]);
    //const [isLoggedIn, setisLoggedIn] = useState(false);
    useEffect(()=> {
        if(cookies["nbk"]) navigate("/dashboard")
        else navigate("/signup")
    }, [cookies])
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
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      setCookie("nbk", user.uid ,{path: "/" });
     // navigate('/dashboard')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
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
          <input type='text' label='Display Name' required name='displayName' value={displayName} onChange={handleChange} placeholder='Display Name'/>
        </div>
        <div className='input-box'>
          <input type='email' label='Email' required name='email' value={email} onChange={handleChange} placeholder='Email'/>
        </div>
        <div className='input-box'>
          <input type='password' label='Password' required name='password' value={password} onChange={handleChange} placeholder='Password'/>
        </div>
        <div className='input-box'>
          <input type='password' label='Confirm Password' required name='confirmPassword' value={confirmPassword} onChange={handleChange} placeholder='Confirm Password'/>
        </div>

  

      

        <div class="input-box button">
          <button type='submit'>SignUp</button>
      </div>
      <div class="text">
        <h3>Already have an account? 
        <Link to = '/signin'>
                   <div> Login-now </div> 
                </Link>
        </h3>
      </div>
      </form>
    </div>
  );
};

export default SignUpForm;