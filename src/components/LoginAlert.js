import React from 'react';
import { Button } from 'semantic-ui-react';


const LoginAlert = () => {
  return (
    <div>
      <Button className='fluid ui button' >
        <span>Unable to login, please check username or password</span>
      </Button>
    </div>
  )
}

export default LoginAlert;