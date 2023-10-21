import { useEffect, useState } from 'react';

import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';
import TaskList from './TaskList';
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
      })
  }, []);

  const onNavChange = (page) => {
    switch(page) {
      case 'logout':
        logout();
        break;
      default:
        setCurrentPage(page);    
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    cookies.remove(COOKIE_NAME);
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

  return (
    <div className="App">
      <Navbar currentPage={currentPage} loggedInUserName={currentUser !== null ? currentUser.name : null} navChangeHandler={onNavChange} />
      <div className="content">
        {currentPage==='home' && <Home />}
        {currentPage==='login' && <Login loginHandler={onLogin} />}
        {currentPage==='register' && <Register />}
        {currentPage==='task-list' && <TaskList currentUser={currentUser} />}
        {currentPage==='profile' && <UserProfile currentUser={currentUser} />}
      </div>
    </div>
  );
}

export default App;
