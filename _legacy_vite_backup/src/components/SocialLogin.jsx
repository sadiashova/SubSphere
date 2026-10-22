import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

const SocialLogin = () => {
  return (
    <div>
      <h2 className='font-bold mb-3'>Login With</h2>
      <div className='space-y-5 w-full'>
        <button className='btn g btn-outline w-full'><FcGoogle size={20} /> Login With Google</button>
        <button className='btn btn-outline w-full'><BsFacebook size={20} /> Login With Facebook</button>
      </div>
    </div>
  );
};

export default SocialLogin;