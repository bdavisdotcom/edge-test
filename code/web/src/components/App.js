import { useEffect, useState } from 'react';

import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';
import Task from './Task';
import Cookies from 'universal-cookie';
import { COOKIE_NAME } from '../config/app-configs';
import apiService from '../services/api-service';

const cookies = new Cookies(null, { path: '/' });

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const jwt = cookies.get(COOKIE_NAME);
    if (!jwt) {
      return;
    }
    apiService.getUser(jwt)
      .then(results => {
        results.data.user && setCurrentUser({ ...results.data.user, jwt });
      })
      .catch(err => {
        console.dir(err);
      });
  }, []);

  const onNavCommand = (page) => {
    switch(page) {
      case 'logout':
        setCurrentUser(null);
        setCurrentPage('home');
        cookies.remove(COOKIE_NAME);
        break;
      default:
        setCurrentPage(page);    
    }
  };

  const onLogin = (user) => {
    console.log("parent onLogin handler");
    console.dir(user);
    if (user && user.jwt) {
      cookies.set(COOKIE_NAME, user.jwt);
      setCurrentUser(user);
      setCurrentPage('home');
    }
  }

  const onProfileUpdateOrRegister = ({ jwt }) => {
    // jwt won't be present for profile updates...
    if (jwt) {
      cookies.set(COOKIE_NAME, jwt);
    }

    const useJwt = cookies.get(COOKIE_NAME);

    apiService.getUser(useJwt)
      .then(results => {
        results.data.user && setCurrentUser({ ...results.data.user, jwt: useJwt });
        setCurrentPage('home');
      })
      .catch(err => {
        console.dir(err);
      });
  }

  return (
    <div className="App">
      <Navbar currentPage={currentPage} loggedInUserName={currentUser !== null ? currentUser.name : null} navCommandHandler={onNavCommand} />
      <div className="content">
        {currentPage==='home' && <Home />}
        {currentPage==='login' && <Login loginHandler={onLogin} />}
        {currentPage==='register' && <Register registerHandler={onProfileUpdateOrRegister} />}
        {currentPage==='task' && <Task currentUser={currentUser} />}
        {currentPage==='profile' && <UserProfile profileHandler={onProfileUpdateOrRegister} currentUser={currentUser} />}
      </div>
    </div>
  );
}

export default App;
