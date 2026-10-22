import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router'; // Ensure react-router-dom is imported
import { AuthContext } from '../Provider/AuthProvider'; // Adjust path as needed
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import app from '../firebase/firebase.config'; // Adjust path as needed

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState(''); // This state is not currently used in Login. Consider removing if not needed.
  const [show, setShow] = useState(false);
  const emailRef = useRef(); // Ref to get email input value

  const { signIn, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // --- CRUCIAL CHANGE HERE ---
  // Safely access location.state.from. If location.state is null/undefined, or
  // if 'from' property doesn't exist, it defaults to '/'.
  const from = location.state?.from || "/";
  // --- END CRUCIAL CHANGE ---

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        // Navigate to the 'from' path, replacing the current history entry
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('Google Sign-In Success:', user);
        if (setUser) setUser(user); // update context if method exists
        // Navigate to the 'from' path, replacing the current history entry
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error('Google Sign-In Error:', error);
        setError(error.message);
      });
  };

  const handleForgetPasswordClick = () => {
    const currentEmail = emailRef.current.value; // Get email from the login form's email field
    navigate('/auth/forgot-password', { state: { email: currentEmail } });
  };

  return (
    <div className='flex justify-center min-h-screen items-center'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className='text-2xl font-semibold text-center'>Login Your Account</h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label text-xs font-bold">Email</label>
            <input
              name='email'
              ref={emailRef} // Attach ref to the email input
              type="email"
              className="input"
              required
              placeholder="Email"
            />

            <label className="label text-xs font-bold">Password</label>
            <div className='relative'>
              <input
                name='password'
                required
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                type={show ? 'text' : 'password'}
                className="input"
                placeholder="Password"
              />
              <button
                type='button'
                onClick={() => setShow(!show)}
                className='absolute btn btn-xs top-2 right-6'
              >
                <FaEye />
              </button>
            </div>

            <div onClick={handleForgetPasswordClick}>
              <span className="link link-hover text-xs font-bold">Forgot password?</span>
            </div>

            {error && <p className='text-red-500 font-bold text-sm'>{error}</p>}
            {errorMessage && <p className='text-red-500 text-xs'>{errorMessage}</p>}

            <button type='submit' className="btn btn-neutral mt-4 text-xl">Login</button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn mt-4 text-xl font-bold flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </button>

            <p className='font-semibold text-center text-xs font-bold pt-4'>
              Don't Have An Account?{" "}
              <Link className='text-blue-500 underline text-xl' to={'/auth/register'}>Register</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
