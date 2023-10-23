import { useState } from 'react';
import apiService from "../services/api-service";

const Register = ({ registerHandler }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const initValidation = (isValid = true, message = '') => {
        return { isValid, message };
    };

    const [formState, setFormState] = useState({
        validUserName: initValidation(),
        validEmail: initValidation(),
        validPassword: initValidation(),
        validConfirmPassword: initValidation()
    });

    const isFormValid = () => {
        const validUserName = userName.length === 0 ? initValidation(false, 'Usename is required.') : initValidation();
        const validEmail = email.length === 0 ? initValidation(false, 'Email is required.') : initValidation();
        const validPassword = password.length === 0? initValidation(false, 'Password is required.') : initValidation();
        const validConfirmPassword = confirmPassword.length === 0 || confirmPassword !== password ? initValidation(false, 'Confirm Password is required and must match Password.') : initValidation();

        const isValid = validUserName.isValid && validEmail.isValid && validPassword.isValid && validConfirmPassword.isValid;

        setFormState({ validUserName, validEmail, validPassword, validConfirmPassword });
        
        return isValid;
    };

    const register = () => {
        if (!isFormValid()) {
            return;            
        }

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
                <label className='error'>{formState.validUserName.message}</label>
            </div>
            <div>
                <div className='form-col'>
                    <label>Email</label>
                </div>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className='error'>{formState.validEmail.message}</label>
            </div>
            <div>
                <div className='form-col'>
                    <label>Password</label>
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className='error'>{formState.validPassword.message}</label>
            </div>
            <div>
                <div className='form-col'>
                    <label>Confirm Password</label>
                </div>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <label className='error'>{formState.validConfirmPassword.message}</label>
            </div>
            <div className='inline-container'>
                <button onClick={register}>Update</button>
                <label className='error'>{errorMessage}</label>
            </div>     
        </div>
    );
}
 
export default Register;