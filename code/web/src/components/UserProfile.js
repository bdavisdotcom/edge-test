import { useEffect, useState } from "react";
import apiService from "../services/api-service";

const UserProfile = ({ currentUser, profileHandler }) => {

    const [userName, setUserName] = useState(currentUser ? currentUser.name : '');
    const [email, setEmail] = useState(currentUser ? currentUser.email : '');
    const [profileImage, setProfileImage] = useState(currentUser ? currentUser.profile_image : '');
    const [errorMessage, setErrorMessage] = useState('');

    const updateProfile = () => {
        apiService.updateUser(currentUser.jwt, { name: userName, email, profile_image: profileImage })
            .then(results => {
                const { user } = results.data;
                if (user) {
                    profileHandler({ jwt: null });
                }                
            })
            .catch(err => {
                console.dir(err);
                setErrorMessage('Error updating user profile. See console for details.');
            });
    };

    return (
        <div className="profile">
            <h2>User Profile</h2>
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
                    <label>Profile Image</label>
                </div>
                <input type="text" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
            </div>
            {
                currentUser &&
                <div>
                    <div className='form-col'>
                        <label>Last Updated</label>
                    </div>
                    <label>{(new Date(currentUser.updated_at)).toISOString().split('T')[0]}</label>
                </div>
            }
            <div className="inline-container">
                <button onClick={updateProfile}>Update</button>
                <label className='error'>{errorMessage}</label>
            </div>
        </div>
    );
}
 
export default UserProfile;