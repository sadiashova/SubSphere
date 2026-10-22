import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext)
    // console.log(user)

    const handleLogOut = () => {
        logOut()
        .then(()=> alert('You successfully Logged Out'))
        .catch((error)=> console.log(error));
    }


      const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-amber-500 font-bold" : "font-semibold"}>Home</NavLink></li>
      <li><NavLink to="/my-profile" className={({ isActive }) => isActive ? "text-amber-500 font-bold" : "font-semibold"}>MyProfile</NavLink></li>
      <li><NavLink to="/blog" className={({ isActive }) => isActive ? "text-amber-500 font-bold" : "font-semibold"}>Blog</NavLink></li>
      <li><NavLink to="/history" className={({ isActive }) => isActive ? "text-amber-500 font-bold" : "font-semibold"}>Subscription History</NavLink></li>
    </>
  );
    return (
          <div className="bg-gray-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 py-2 text-purple-900">
        
        {/* Logo & Mobile Toggle */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-3xl font-bold">
            Sub<span className="text-amber-500">Sphere</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-3">
            {navLinks}
          </ul>
        </div>

        {/* Profile + Login/Logout */}
        <div className="navbar-end gap-3 items-center">
          <div className="relative group">
            { user ? 
              <img
              className="w-10 h-10 rounded-full border-2 border-amber-400"
              src={user?.photoURL || 'icon'}
              alt="User"
            /> : <Link to="/auth/register" className="btn btn-sm bg-purple-700 hover:bg-purple-800 text-white">Register</Link>
            }
           
            {user && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap z-50">
                {user.displayName}
              </div>
            )}
          </div>

          {
            user
              ? <button onClick={handleLogOut} className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white">Logout</button>
              : <Link to="/auth/login" className="btn btn-sm bg-purple-700 hover:bg-purple-800 text-white">Login</Link>
          }
        </div>
      </div>
    </div>
    );
};

export default Navbar;