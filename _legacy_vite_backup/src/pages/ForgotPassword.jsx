import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../firebase/firebase.config'; // Ensure this path is correct

const auth = getAuth(app);

// Placeholder for a toast/sweet alert function
const showMessage = (type, message) => {
  console.log(`${type.toUpperCase()}: ${message}`);
  // Using alert for demonstration as per instructions, but typically you'd use a non-blocking UI
  setTimeout(() => {
    alert(`${type.toUpperCase()}: ${message}`);
  }, 0);
};

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // For success/error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  // Removed showGmailButton state as it's no longer needed for automatic redirection

  useEffect(() => {
    // Check if email was passed in the location state from the login page
    if (location.state && location.state.email) {
      setEmail(location.state.email); // Set the email state with the passed email
    }
  }, [location.state]); // Re-run effect if location.state changes

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage('Please enter your email address.');
      setMessageType('error');
      return;
    }

    setMessage(''); // Clear previous messages
    setMessageType('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset email has been sent to your inbox. A new tab will now open to Gmail.');
      setMessageType('success');
      
      // Attempt to open Gmail in a new tab automatically
      // Note: Modern browsers often block window.open calls that are not
      // directly initiated by a user click (i.e., when called inside an async function).
      // Users might need to allow pop-ups for this site.
      setTimeout(() => {
        window.open('https://mail.google.com', '_blank');
      }, 2000); // Delay to allow message to be seen
      
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType('error');
      console.error("Password reset error:", error);
    }
  };

  // Removed handleGoToGmail function as it's no longer needed

  return (
    <div className='flex justify-center min-h-screen items-center bg-gray-100 font-inter'>
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-xl rounded-lg py-8 px-6">
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Reset Your Password</h2>
        <form onSubmit={handleSubmitResetPassword} className="card-body p-0">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {message && (
            <p className={`text-sm mt-2 ${messageType === 'error' ? 'text-red-600' : 'text-green-600'} text-center font-medium`}>
              {message}
            </p>
          )}

          <button
            type='submit'
            className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 mt-6"
          >
            Send Reset Email
          </button>

          {/* Removed the conditional "Go to Gmail" button */}

          <p className='font-semibold text-center text-sm text-gray-600 pt-6'>
            Remembered your password?{" "}
            <Link className='text-indigo-600 hover:underline font-bold' to={'/auth/login'}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
