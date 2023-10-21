const Navbar = ({ navCommandHandler, loggedInUserName, currentPage }) => {
    return (
        <>
            <nav className="navbar">
                <h1>Edge Webware Senior Engineer Test</h1>
                <div className="links">
                    {
                        !loggedInUserName &&
                        <>
                            <button onClick={() => navCommandHandler('login')}>Login</button>
                            <button onClick={() => navCommandHandler('register')}>Register</button>
                        </>
                    }
                    {
                        loggedInUserName &&
                        <div>
                            <label>Hello, {loggedInUserName}</label>
                            <button onClick={() => navCommandHandler('logout')}>Logout</button>
                        </div>
                        
                    }
                </div>
            </nav>
            <nav className="navbar sub-navbar">
                <div className="links">
                    { currentPage !== 'home' && <button onClick={() => navCommandHandler('home')}>Home</button> }
                    {
                        loggedInUserName &&
                            <>
                                <button onClick={() => navCommandHandler('profile')}>User Profile</button>
                                <button onClick={() => navCommandHandler('task')}>Task List</button>
                            </>
                    }
                </div>
            </nav>
        </>
    );
}
 
export default Navbar;