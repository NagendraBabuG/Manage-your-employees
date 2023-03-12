import {Routes, Route} from 'react-router-dom'
import { redirect } from 'react-router-dom'
import Home from './components/home'
import Navigation from './components/navBar/navi'
import About from './components/about'

import { useCookies } from 'react-cookie'
import Dashboard from './components/aDashboard/adash.jsx'
//import Dashboard from './components/dashboard/dashboard'
import Signin from './components/sign-in-form/signIn'

import Signup from './components/sign-up-form/signup'
import './components/styleSheets/App.css'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["nbk"]);
  return (
    <div className='App'>

      <Routes>
        <Route path='/' element = {<Navigation/>}>
              <Route index element = {<Home />} />
              <Route path='about' element = {<About/>} />
              <Route path='signin' element = {<Signin/>} />
                           <Route path='signup' element = {<Signup/>} />
              <Route path='dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div>
     
  );
}
// <protectedRoute path='/dashboard' auth= {cookies.nbk} component={Dashboard}/>

const protectedRoute = ({auth, component: Component, ...rest})=> {
      return (<Route {...rest} render = {()=>auth? (<Component/>):
    (<redirect to='/signin'/>)
    }
    />)

}
export default App;
