import React from 'react';
import { createBrowserRouter } from 'react-router';
import Layout from '../Layout/Layout';
import Home from '../pages/Home';
import Loading from '../components/Loading';
import ProductDetails from '../components/ProductDetails';
import Blog from '../pages/Blog';
import Errorpage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from '../Provider/PrivateRoute';
import MyProfile from '../pages/MyProfile';
import UpdateProfile from '../pages/UpdateProfile';
import ForgotPassword from '../pages/ForgotPassword';
import SubscriptionHistory from '../pages/SubscriptionHistory';

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                index: true,
                path: '/',
                Component: Home,
                loader: () => fetch('../products.json'),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/details/:id',
                element: (<PrivateRoute>
                    <ProductDetails></ProductDetails>
                </PrivateRoute>),
                loader: () => fetch('../products.json'),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/blog',
                Component: Blog
            },

            {
                path: "/auth/login",
                element: <Login></Login>,
            },
            {
                path: "/auth/register",
                element: <Register></Register>
            },
            {
                path: '/my-profile',
                element: <PrivateRoute>
                    <MyProfile></MyProfile>
                </PrivateRoute>,
            },
            {
                path: '/auth/update',
                element: <PrivateRoute>
                    <UpdateProfile></UpdateProfile>
                </PrivateRoute>,
            },

            {
                path: '/auth/forgot-password',
                element: <ForgotPassword></ForgotPassword>,
            },
            {
                path: '/history',
                element: <PrivateRoute>
                    <SubscriptionHistory></SubscriptionHistory>
                </PrivateRoute>,
            }
        ]

    },
    {
        path: '/*',
        element: <Errorpage></Errorpage>
    },
])

export default router;