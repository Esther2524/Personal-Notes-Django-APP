import React from 'react';
import Form from '../components/Form';

function Login() {
  return (
    <div className='flex flex-col mt-[10%]'>
        <Form route="/api/token/" method="login"/>
    </div>
  )
}

export default Login