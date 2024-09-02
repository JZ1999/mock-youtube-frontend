import React from 'react';
import Header from '../components/Header';
import Login from '../components/Auth/Login';

const LoginPage: React.FC = () => {
    return <main>
        <Header></Header>
        <Login></Login>
    </main>
}

export default LoginPage;