import React from 'react';
import Form from '../components/Form';

function Register() {
  return (
    <div className='flex flex-col mt-[10%]'>
      <Form route="/api/users/register/" method="register" />
    </div>

  )
}

export default Register