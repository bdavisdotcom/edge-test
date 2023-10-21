const Navbar = ({ navChangeHandler, loggedInUserName, currentPage }) => {
    return (
        <>
            <nav className="navbar">
                <h1>Edge Webware Senior Engineer Test</h1>
                <div className="links">
                    {
                        !loggedInUserName &&
                        <>
                            <button onClick={() => navChangeHandler('login')}>Login</button>
                            <button onClick={() => navChangeHandler('register')}>Register</button>
                        </>
                    }
                    {
                        loggedInUserName &&
                        <div>
                            <label>Hello, {loggedInUserName}</label>
                            <button onClick={() => navChangeHandler('logout')}>Logout</button>
                        </div>
                        
                    }
                </div>
            </nav>
            <nav className="navbar sub-navbar">
                <div className="links">
                    { currentPage !== 'home' && <button onClick={() => navChangeHandler('home')}>Home</button> }
                    {
                        loggedInUserName &&
                            <>
                                <button onClick={() => navChangeHandler('profile')}>User Profile</button>
                                <button onClick={() => navChangeHandler('task-list')}>Task List</button>
                            </>
                    }
                </div>
            </nav>
        </>
    );
}
 
export default Navbar;