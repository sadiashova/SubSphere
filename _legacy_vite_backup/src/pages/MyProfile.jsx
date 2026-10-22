import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router';

const MyProfile = () => {
        const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    if(!user){
        navigate('/auth/login');
    }


    const handleUpdate = () => {
        navigate('/auth/update');
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-center text-primary">My Profile</h2>
            <div className="flex flex-col items-center space-y-3">
                <img
                    src={user?.photoURL || 'https://via.placeholder.com/100'}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border-2 border-primary"
                />
                <h3 className="text-xl font-semibold">{user?.displayName || 'Anonymous'}</h3>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-400">User ID: {user?.uid}</p>
                <p className="text-sm text-gray-400">Account Verified: {user?.emailVerified ? 'Yes' : 'No'}</p>
                <button 
                    onClick={handleUpdate} 
                    className="btn btn-primary mt-4"
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
};

export default MyProfile;
