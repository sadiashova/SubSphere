import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router';

const UpdateProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || '');
    const [photo, setPhoto] = useState(user?.photoURL || '');
    const navigate = useNavigate();
     if(!user){
        navigate('/auth/login');
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateUser({ displayName: name, photoURL: photo }).then(() => {
            navigate('/my-profile');
        });
    };

    return (
        <div className="flex justify-center min-h-screen items-center">
            <form onSubmit={handleUpdate} className="card bg-base-100 w-full max-w-sm shadow-2xl p-8">
                <h2 className="text-2xl font-semibold text-center mb-4">Update Profile</h2>
                <label className="label">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input mb-4"
                    required
                />

                <label className="label">Photo URL</label>
                <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="input mb-4"
                    required
                />
                <button type="submit" className="btn btn-primary w-full">Update Information</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
