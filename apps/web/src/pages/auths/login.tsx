import dynamic from 'next/dynamic';
import Head from 'next/head';

const LoginView = dynamic(() => import('web/auths').then((m) => m.AuthsLogin));

export const AuthsLogin = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginView />
    </>
  );
};

export default AuthsLogin;
