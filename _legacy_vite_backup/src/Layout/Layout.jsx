import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div>
            <header className='border-b-5 border-white'>
                <Navbar></Navbar>
            </header>
            <main className="bg-base-200 min-h-[calc(100vh-225px)]">
            <Outlet></Outlet>                
            </main>

            <footer>
                <Footer></Footer>
            </footer>

        </div>
    );
};

export default Layout;