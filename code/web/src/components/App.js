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

const getUser = (jwt, callback) => {
  return apiService.getUser(jwt)
  .then(results => {
    if (results.data.user) {
      callback({ ...results.data.user, jwt }, null);
    } else {
      callback(null, 'No user found.');
    }
  })
  .catch(err => {
    console.dir(err);
    callback(null, err);
  });
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const jwt = cookies.get(COOKIE_NAME);
    if (!jwt) {
      return;
    }
    getUser(jwt, (user, err) => {
      if (err) {
        setErrorMessage('Error loading logged in user. Please see console for details.');
        return;
      }
      if (user) {
        setCurrentUser(user);
      }
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

    getUser(useJwt, (user, err) => {
      if (err) {
        setErrorMessage('Unable to load logged in user. Please see console for details.');
        return;
      }
      if (user) {
        setCurrentUser(user);
        setCurrentPage('home');
      }
    })
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
      <div className="inline-container">
        <label className='error'>{errorMessage}</label>
      </div>
    </div>
  );
}

export default App;
