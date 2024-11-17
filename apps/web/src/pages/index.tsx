import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/auths/login', undefined, { shallow: true });
  }, [router]);

  return (
    <>
      <div>Redirecting...</div>
    </>
  );
};

export default Index;
