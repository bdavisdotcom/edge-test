import { useEffect, useState } from "react";
import apiService from "../services/api-service";

const UserProfile = ({ currentUser }) => {

    const [userName, setUserName] = useState(currentUser ? currentUser.name : '');
    const [email, setEmail] = useState(currentUser ? currentUser.email : '');
    const [profileImage, setProfileImage] = useState(currentUser ? currentUser.profile_image : '');

    // useEffect(() => {
    //     setUserName(currentUser.name);
    //     setEmail(currentUser.email);
    //     setProfileImage(currentUser.profile_image);
    // }, [currentUser]);

    const updateProfile = () => {

    };

    return (
        <div className="profile">
            <h2>User Profile</h2>
            <div>
                <label>Name</label>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Profile Image</label>
                <input type="text" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
            </div>
            <div>
                <button onClick={updateProfile}>Update</button>
            </div>
        </div>
    );
}
 
export default UserProfile;