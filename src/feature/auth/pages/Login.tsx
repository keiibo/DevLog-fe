// import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Button } from '../../../components/element/button/Button';
import { useNavigate } from 'react-router-dom';

export const Login = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Button type="primary" onClick={() => navigate(`/dashboard`)}>
      ログインした風
    </Button>
  );
};
