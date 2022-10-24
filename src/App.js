import logo from './logo.svg';
import './App.css';
import {Routes , Route, Navigate ,useNavigate} from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Home from './components/Home';
import Movies from './components/Movies';
import TV from './components/TV';
import People from './components/People';
import Login from './components/Login';
import Register from './components/Register';
import Notfound from './components/Notfound';
import About from './components/About';
import Contacts from './components/Contacts';
import { useState ,useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import Logout from './components/Logout';
import MovieDetails from './components/MovieDetails';


function App() {

  let navigate = useNavigate()
  const [userData, setUserData] = useState(null);

  function saveUserData(){

    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
  }

  function ProtectedRoute(props){
    if(localStorage.getItem('userToken') === null){
      //navigate to login 
      return <Navigate to='/login'/>
    }else{
      //navigate to component destination
      return props.children
    }
  }
  useEffect(() => {
    if(localStorage.getItem('userToken')){
      saveUserData()
    }
    
  }, []);


  function logOut(){
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate('/login')
  }

  return (
    <div className='app'>
      <Navbar  logOut={logOut} userData={userData}/>
      { <Banner/>}
      <div className='container'>
      <Routes>
        <Route path='' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>} />
        <Route path='movieDetails' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>} >
          <Route path=':id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>} />
        </Route>
        <Route path='tv' element={<ProtectedRoute><TV/></ProtectedRoute>} />
        <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>} />
        <Route path='about'  element={<ProtectedRoute><About/></ProtectedRoute>} />
        <Route path='contacts' element={<ProtectedRoute><Contacts/></ProtectedRoute>} />
        <Route path='login' element={<Login saveUserData={saveUserData}/>} />
        
        <Route path='register' element={<Register/>} />
        <Route path='*' element={<Notfound/>} />
        
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
