import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useParams, useRouteError } from 'react-router';

const Errorpage = () => {
    const error = useRouteError();

    return (
        <div>
            <div className='max-w-screen-xl d mx-auto py-24 text-center min-h-[calc(100vh-290px)]'>
                <h1 className='mb-8 text-7xl font-thin text-gray-900'>{error?.status || 404}</h1>
                <p className='mb-3 text-xl font-bold text-gray-900 md:text-2xl'>{error?.error?.message || 'Something Went Wrong!'}</p>

                <Link to='/'>
                    <button className='btn text-2xl' >Go To Homepage</button>
                </Link>

            </div>
        </div>
    );
};

export default Errorpage;