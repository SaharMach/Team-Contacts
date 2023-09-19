const { NavLink, useNavigate } = ReactRouterDOM
const { useSelector } = ReactRedux
const { useState, useEffect } = React

export function AppHeader() {

return (
    <header className="app-header">
        <nav>
            <h1>TODO App</h1>
            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                {/* {user && <NavLink to="/user/profile">Profile</NavLink>} */}
                {/* <NavLink to="/about">About</NavLink> */}
            </div>
        </nav>
        </header>
)

}