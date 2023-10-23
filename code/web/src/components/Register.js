import { useState } from 'react';
import apiService from "../services/api-service";

const Register = ({ registerHandler }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassowrd, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const register = () => {
        const newUser = { name: userName, email, password };
        apiService.register(newUser)
            .then(results => {
                registerHandler({ jwt: results.data.user.jwt })
            })
            .catch(err => {
                console.dir(err);
                setErrorMessage('Error completing registration. Please see console for details.');
            })
    };

    return (
        <div className="register">
            <h2>Register</h2>       
            <div>
                <div className='form-col'>
                    <label>Name</label>
                </div>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
                <div className='form-col'>
                    <label>Email</label>
                </div>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <div className='form-col'>
                    <label>Password</label>
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <div className='form-col'>
                    <label>Confirm Password</label>
                </div>
                <input type="password" value={confirmPassowrd} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className='inline-container'>
                <button onClick={register}>Update</button>
                <label className='error'>{errorMessage}</label>
            </div>     
        </div>
    );
}
 
export default Register;