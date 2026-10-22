import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);

const Register = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        console.log(result.user);
        // setUser(result.user) if needed
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (name.length < 5) {
      setNameError('Name should be more than 5 characters');
      return;
    } else {
      setNameError('');
    }

    createUser(email, password)
      .then(result => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate('/');
          })
          .catch(error => {
            console.log(error);
            setUser(user);
          });
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div className='flex justify-center min-h-screen items-center'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className='text-2xl font-semibold text-center'>Register Your Account</h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">

            <label className="label text-xs font-bold">Name</label>
            <input
              name='name'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Name"
              required
            />
            {nameError && <p className='text-red-500 font-bold'>{nameError}</p>}

            <label className="label text-xs font-bold">Photo URL</label>
            <input name='photo' type="text" className="input" placeholder="Photo URL" required />

            <label className="label text-xs font-bold">Email</label>
            <input name='email' type="email" className="input" placeholder="Email" required />

            <label className="label text-xs font-bold">Password</label>
            <div className='relative'>
              <input
                name='password'
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
                type={showPassword ? 'text' : 'password'}
                className="input"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute btn btn-xs top-2 right-6'
              >
                <FaEye />
              </button>
            </div>

            <button type='submit' className="btn btn-neutral mt-4 text-xl font-bold">Register</button>
            <button type='button' onClick={handleGoogleSignIn} className="btn mt-4 text-xl font-bold">
              <FcGoogle /> Sign in With Google
            </button>

            <p className='font-semibold text-center pt-4 text-xs'>
              Already Have An Account?{" "}
              <Link className='text-blue-500 underline text-xl font-bold' to={'/auth/login'}>Login</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
