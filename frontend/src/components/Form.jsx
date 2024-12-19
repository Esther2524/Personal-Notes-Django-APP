import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import api from '../api';

function Form({ route, method }) {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post(route, { username, email, password })

      // console.log(res)

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        navigate('/')
      } else {
        navigate('/login')
      }

    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className='flex'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center p-8 bg-white shadow-md rounded-lg mx-auto'>
        <h1 className='text-xl font-bold mb-6'>{name}</h1>
        <input
          className='p-2 border rounded-lg mb-4'
          type='text'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='Username'
        />
        <input
          className='p-2 border rounded-lg mb-4'
          type='email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          className='p-2 border rounded-lg mb-4'
          type='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />

        <button className='bg-blue-500 text-white font-bold p-3 rounded-lg hover:bg-blue-700 transition duration-300' type='submit'>
          {name}
        </button>
      </form>
    </div>
  );
}

export default Form;
