import React from 'react';
import Slider from '../components/Slider';
import Products from '../components/Products';
import { useLoaderData } from 'react-router';
import Marquee from '../components/Marquee';
import PrivateRoute from '../Provider/PrivateRoute';

const Home = () => {
    const productData = useLoaderData();
    return (
        <div className='max-w-11/12 mx-auto'>
            <Slider></Slider>
            <Products productData={productData}></Products>
            <Marquee></Marquee>
        </div>
    );
};

export default Home;