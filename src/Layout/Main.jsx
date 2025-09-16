import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import NavBar from '../pages/Shared/NavBar/NavBar';

const Main = () => {
    const loction = useLocation();
   
    const noHeadernoFooter = loction.pathname.includes('login') || loction.pathname.includes('signup')
    return (
        <div>
            {noHeadernoFooter || <NavBar></NavBar>}
            <Outlet></Outlet>
            {noHeadernoFooter || <Footer></Footer>}

        </div>
    );
};

export default Main;