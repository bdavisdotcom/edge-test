import { useState, useEffect } from 'react';
import apiService from '../services/api-service';

const Login = ({ loginHandler }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = () => {
        console.log(`${email} ${password}`);

        apiService.login(email, password)
            .then(result => {
                console.dir(result.data.user);
                loginHandler(result.data.user);
            })
            .catch(err => {
                console.dir(err);
                setErrorMessage('Invalid login');
                loginHandler(null);                
            })
    };

    return (
        <div className="login">
            <div>
                <h2>Login</h2>
            </div>
            <div>
                <div className="form-col">
                    <label>Email</label>
                </div>
                <div>
                    <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div>
                <div className="form-col">
                    <label>Password</label>
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='inline-container'>
                <button onClick={onSubmit}>Submit</button>
                <label className='error'>{errorMessage}</label>
            </div>
        </div>
    );
}
 
export default Login;