import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <div className='text-center py-4 text-3xl font-bold text-purple-700'>My Email Password Authentication</div>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;