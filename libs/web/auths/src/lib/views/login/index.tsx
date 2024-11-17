
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

import { loginWithGoogle, stateIsAuthenticated } from 'web/utils';
import { useAppDispatch, useAppSelector } from 'web/utils';

import { FormAuthLogin } from '../../components/form-auth-login';

export function AuthsLogin() {
  const isAuthenticated = useAppSelector(stateIsAuthenticated);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    dispatch(loginWithGoogle(credentialResponse) as any);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/users/list');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col flex-1 justify-center">
      <div className="my-10 px-6 py-10 border rounded-lg shadow-sm sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 className="mb-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <FormAuthLogin />
        <hr className="my-6" />
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Login Failed')}
          />
        </div>
      </div>
    </div>
  );
}

export default AuthsLogin;
