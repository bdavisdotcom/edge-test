import { useState, useEffect } from 'react';
import apiService from '../services/api-service';

const Login = ({ loginHandler }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        console.log(`${email} ${password}`);

        apiService.login(email, password)
            .then(result => {
                console.dir(result.data.user);
                loginHandler(result.data.user);
            })
            .catch(err => {
                console.dir(err);
                loginHandler(null);
            })
    };

    return (
        <div className="login">
            <div>
                <h2>Login</h2>
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
}
 
export default Login;