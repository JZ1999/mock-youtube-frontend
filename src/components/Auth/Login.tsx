import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../Loading';

const Login: React.FC = () => {
  const { authenticated, login, loading} = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError] = useState<string>('');
  const [passwordError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if(authenticated) {
        navigate("/");
    }
  }, [authenticated, navigate]);

  const onButtonClick = () => {
    login(username, password);
  };

  const handleUsernameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setUsername(ev.target.value);
  };

  const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.target.value);
  };

  return (
    <form className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {loading ? <Loading />: null}
        
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</div>

            <div className="mb-4">
            <input
                value={username}
                placeholder="Enter your username here"
                onChange={handleUsernameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="text-red-600 text-sm mt-1 block">{usernameError}</label>
            </div>

            <div className="mb-4">
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
            />
            <label className="text-red-600 text-sm mt-1 block">{passwordError}</label>
            </div>

            <div className="mt-6">
            <input
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer transition duration-300"
                type="button"
                onClick={onButtonClick}
                value="Log in"
            />
            </div>
        </div>
    </form>

  );
};

export default Login;
