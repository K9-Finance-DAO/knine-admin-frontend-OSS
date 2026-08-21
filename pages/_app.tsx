import { memo } from 'react';
import { AppProps } from 'next/app';
import 'nprogress/nprogress.css';
import Head from 'next/head';

import { Providers } from 'providers';
import { nprogress } from 'utils';
import { withCsp } from 'utilsApi/withCSP';
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Visualize route changes
nprogress();

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

const MemoApp = memo(App);

const AppWrapper = (props: AppProps): JSX.Element => {
  return (
    <AppCacheProvider {...props}>
      <Providers>
        {/* see https://nextjs.org/docs/messages/no-document-viewport-meta */}
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <MemoApp {...props} />
        <ToastContainer
          autoClose={6000}
          position="bottom-right"
          hideProgressBar
          pauseOnHover
          closeButton
        />
      </Providers>
    </AppCacheProvider>
  );
};

export default process.env.NODE_ENV === 'development'
  ? AppWrapper
  : withCsp(AppWrapper);
