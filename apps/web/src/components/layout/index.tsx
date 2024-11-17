import Head from 'next/head';
import { stateIsAuthenticated, useAppSelector } from 'web/utils';

import { Footer } from '../footer';
import { Header } from '../header';
import { Error403 } from '../errors/403';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  const isAuthenticated = useAppSelector(stateIsAuthenticated);

  if (!isAuthenticated) {
    return <Error403 />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <header className="bg-white shadow border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
